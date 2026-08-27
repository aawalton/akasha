import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanTmpfsScratch, spellsTmpfsRoot } from "./ts-tmpfs-scratch.ts"

const sfOf = (src: string, filePath = "x.ts") =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const sitesOf = (src: string) => scanTmpfsScratch(sfOf(src))
const callsOf = (src: string): readonly string[] => sitesOf(src).map((s) => s.call)

const SYNC = "Sync"

describe("spellsTmpfsRoot — the cheap pre-filter", () => {
  test("admits every root spelling the corpus actually uses", () => {
    expect(spellsTmpfsRoot(`tmpdir()`)).toBe(true)
    expect(spellsTmpfsRoot(`"/tmp/x"`)).toBe(true)
    expect(spellsTmpfsRoot(`BUN_TMPDIR`)).toBe(true)
    expect(spellsTmpfsRoot(`TMPDIR`)).toBe(true)
    expect(spellsTmpfsRoot(`"$(mktemp -d)"`)).toBe(true)
  })

  test("rejects a file naming neither", () => {
    expect(spellsTmpfsRoot(`const a = join(root, "x")`)).toBe(false)
  })

  test("admits `/var/tmp`, leaving the compliant/violating call to the scan", () => {
    expect(spellsTmpfsRoot(`"/var/tmp/x"`)).toBe(true)
  })
})

describe("scanTmpfsScratch — the root reaches a creating call", () => {
  test("mkdtempSync over join(tmpdir(), …) is a site", () => {
    expect(callsOf(`mkdtempSync(join(tmpdir(), "p-"))`)).toEqual(["mkdtempSync"])
  })

  test("mkdtempSync over a bare /tmp literal is a site", () => {
    expect(callsOf(`mkdtempSync("/tmp/p-")`)).toEqual(["mkdtempSync"])
  })

  test("mkdtempSync over tmpdir() directly is a site", () => {
    expect(callsOf(`mkdtempSync(tmpdir())`)).toEqual(["mkdtempSync"])
  })

  test("a template-literal root is a site", () => {
    expect(callsOf("mkdirSync(`${tmpdir()}/p`)")).toEqual(["mkdirSync"])
  })

  test("string concatenation onto a root is a site", () => {
    expect(callsOf(`mkdirSync("/tmp/" + name)`)).toEqual(["mkdirSync"])
  })

  test("async mkdtemp is a site", () => {
    expect(callsOf(`await mkdtemp(join(tmpdir(), "p-"))`)).toEqual(["mkdtemp"])
  })

  test("Bun.write to a tmpfs path is a site", () => {
    expect(callsOf(`await Bun.write("/tmp/f", body)`)).toEqual(["Bun.write"])
  })

  test("openSync with a write flag is a site", () => {
    expect(callsOf(`openSync("/tmp/f", "w")`)).toEqual(["openSync"])
  })

  test("a subprocess handed a tmpfs path is a site — it is the shell escape hatch", () => {
    expect(callsOf(`exec${SYNC}("mkdir -p /tmp/x")`)).toEqual([`exec${SYNC}`])
  })

  test("a bare mktemp in a command string is a tmpfs root", () => {
    expect(callsOf(`exec${SYNC}('d="$(mktemp -d)"')`)).toEqual([`exec${SYNC}`])
  })

  test("mktemp pointed at /var/tmp is compliant", () => {
    expect(sitesOf(`exec${SYNC}('d="$(mktemp -d -p /var/tmp)"')`)).toEqual([])
    expect(sitesOf(`exec${SYNC}('d="$(mktemp -d --tmpdir=/var/tmp)"')`)).toEqual([])
  })
})

describe("scanTmpfsScratch — taint flows through bindings and wrappers", () => {
  test("a const bound to the root taints a later creating call", () => {
    const src = `const base = tmpdir()\nmkdtempSync(join(base, "p-"))\n`
    expect(callsOf(src)).toEqual(["mkdtempSync"])
  })

  test("taint propagates transitively across two hops", () => {
    const src = `const a = tmpdir()\nconst b = join(a, "x")\nmkdirSync(join(b, "y"))\n`
    expect(callsOf(src)).toEqual(["mkdirSync"])
  })

  test("an unknown path-preserving wrapper does not launder the root", () => {
    expect(callsOf(`mkdtempSync(join(realpathSync(tmpdir()), "p-"))`)).toEqual(["mkdtempSync"])
  })
})

describe("scanTmpfsScratch — what is NOT a site", () => {
  test("/var/tmp is the compliant path and is never a site", () => {
    expect(sitesOf(`mkdtempSync("/var/tmp/p-")`)).toEqual([])
    expect(sitesOf(`mkdtempSync(join("/var/tmp", "p-"))`)).toEqual([])
  })

  test("a const bound to /var/tmp does not taint", () => {
    expect(sitesOf(`const TMP_ROOT = "/var/tmp"\nmkdtempSync(join(TMP_ROOT, "p-"))\n`)).toEqual([])
  })

  test("a tmpfs path in a comment is not a site", () => {
    expect(sitesOf(`// never mkdtempSync(join(tmpdir(), "p-"))\nmkdirSync(realDir)\n`)).toEqual([])
  })

  test("process.stderr.write is not a creating call", () => {
    expect(sitesOf(`process.stderr.write(\`wrote \${tmpFile}\`)\n`)).toEqual([])
    expect(sitesOf(`process.stderr.write("see /tmp/log")`)).toEqual([])
  })

  test("a tmpfs path in CLI help text creates nothing", () => {
    expect(sitesOf(`const usage = "mytool --out /tmp/1.md"`)).toEqual([])
  })

  test("reading a tmpfs path is not creating one", () => {
    expect(sitesOf(`readFileSync(join(tmpdir(), "f"))`)).toEqual([])
    expect(sitesOf(`openSync("/tmp/f", "r")`)).toEqual([])
  })

  test("asserting about a tmpfs path is not creating one", () => {
    expect(sitesOf(`expect(tree.startsWith("/tmp/")).toBe(false)`)).toEqual([])
  })

  test("a path that merely ends in a segment called tmp is not tmpfs", () => {
    expect(sitesOf(`mkdtempSync("/home/x/tmp/p-")`)).toEqual([])
  })
})

describe("scanTmpfsScratch — reporting", () => {
  test("a site carries the line it is on", () => {
    const src = `const x = 1\n\nmkdtempSync(tmpdir())\n`
    expect(sitesOf(src).map((s) => s.line)).toEqual([3])
  })

  test("every site in a file is reported", () => {
    const src = `mkdtempSync(tmpdir())\nmkdirSync("/tmp/a")\n`
    expect(callsOf(src)).toEqual(["mkdtempSync", "mkdirSync"])
  })
})
