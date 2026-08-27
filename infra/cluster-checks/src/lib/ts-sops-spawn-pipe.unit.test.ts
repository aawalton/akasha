import { describe, expect, test } from "bun:test"
import ts from "typescript"
import { scanSopsSpawnPipe } from "./ts-sops-spawn-pipe.ts"

const sfOf = (src: string, filePath = "x.ts"): ts.SourceFile =>
  ts.createSourceFile(filePath, src, ts.ScriptTarget.Latest, true, ts.ScriptKind.TS)

const findingsOf = (src: string, filePath = "x.ts") => scanSopsSpawnPipe(sfOf(src, filePath))

describe("scanSopsSpawnPipe — direct spawn shape (literal 'sops')", () => {
  test("node:child_process style: spawn('sops', [...,'/dev/stdin'])", () => {
    const src = `
import { spawn } from "node:child_process"
spawn("sops", ["encrypt", "--input-type", "yaml", "/dev/stdin"], { stdio: ["pipe", "pipe", "inherit"] })
`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.callee).toBe("spawn")
  })

  test("Bun.spawn style: Bun.spawn(['sops', ..., '/dev/stdin'])", () => {
    const src = `
Bun.spawn(["sops", "encrypt", "/dev/stdin"], { stdin: "pipe", stdout: "pipe" })
`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.callee).toBe("Bun.spawn")
  })

  test("spawnSync flavor is also flagged", () => {
    const src = `
import { spawnSync } from "node:child_process"
spawnSync("sops", ["encrypt", "/dev/stdin"])
`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.callee).toBe("spawnSync")
  })

  test("file path passes through with 1-indexed line/column at the call site", () => {
    const src = `
const x = 1
Bun.spawn(["sops", "/dev/stdin"])
`
    const findings = findingsOf(src, "packages/foo/bar.ts")
    expect(findings[0]?.file).toBe("packages/foo/bar.ts")
    expect(findings[0]?.line).toBe(3)
    expect(findings[0]?.column).toBe(1)
  })
})

describe("scanSopsSpawnPipe — wrapper shape (pre-#11479 bug)", () => {
  test("local wrapper hiding 'sops': flagged via the sops-specific flag '--filename-override'", () => {
    const src = `
async function encryptToFile(yaml, destSopsPath) {
  const stdout = await runSops(
    [
      "encrypt",
      "--input-type",
      "yaml",
      "--output-type",
      "yaml",
      "--filename-override",
      destSopsPath,
      "/dev/stdin",
    ],
    yaml
  )
}
`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.callee).toBe("runSops")
  })

  test("any wrapper name with the literal-pair triggers the flag", () => {
    const src = `
sopsEncryptViaStdin(["--filename-override", "x.yaml", "/dev/stdin"], plaintext)
`
    const findings = findingsOf(src)
    expect(findings).toHaveLength(1)
    expect(findings[0]?.callee).toBe("sopsEncryptViaStdin")
  })
})

describe("scanSopsSpawnPipe — negative cases", () => {
  test("spawn('sops', [...]) with a real file path arg is allowed", () => {
    const src = `
spawn("sops", ["encrypt", "--filename-override", "dest.yaml", "src.yaml"])
`
    expect(findingsOf(src)).toEqual([])
  })

  test("spawn with /dev/stdin but no sops marker is allowed", () => {
    const src = `
spawn("cat", ["/dev/stdin"])
Bun.spawn(["sed", "s/x/y/", "/dev/stdin"])
readFileSync("/dev/stdin", "utf-8")
`
    expect(findingsOf(src)).toEqual([])
  })

  test("spawn with sops markers but no /dev/stdin is allowed", () => {
    const src = `
Bun.spawn(["sops", "-d", absPath])
spawn("sops", ["encrypt", "--filename-override", "dest", srcPath])
`
    expect(findingsOf(src)).toEqual([])
  })

  test("object literals are not descended into (literals not in array contexts don't count)", () => {
    const src = `
log({ tool: "sops", input: "/dev/stdin" })
`
    expect(findingsOf(src)).toEqual([])
  })

  test("string content inside unrelated code is not flagged", () => {
    const src = `
const note = "use sops with /dev/stdin? no — use a tmpfile"
console.log(note)
`
    expect(findingsOf(src)).toEqual([])
  })

  test("comment text is not parsed as a call", () => {
    const src = `
// spawn("sops", ["/dev/stdin"]) — this is documentation, not a call
const x = 1
`
    expect(findingsOf(src)).toEqual([])
  })
})

describe("scanSopsSpawnPipe — coverage", () => {
  test("multiple offending calls in one file each emit a finding", () => {
    const src = `
spawn("sops", ["/dev/stdin"])
Bun.spawn(["sops", "encrypt", "/dev/stdin"])
runSops(["--filename-override", "dest", "/dev/stdin"], yaml)
`
    expect(findingsOf(src)).toHaveLength(3)
  })

  test("file with no calls emits no findings", () => {
    const src = `export const X = 1\n`
    expect(findingsOf(src)).toEqual([])
  })
})
