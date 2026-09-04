import { expect, test } from "bun:test"
import { mkdirSync, mkdtempSync, rmSync, writeFileSync } from "node:fs"
import { tmpdir } from "node:os"
import { join } from "node:path"
import {
  firstLines,
  namedByManifest,
  quotedAt,
  type Reach,
  reachesIn,
  refusedIn,
  saidAs,
  sectionsIn,
  unreachedIn,
} from "./node-cleanliness.module.code.ts"

function reachOf(over: Partial<Reach> = {}): Reach {
  return { global: "Bun.file", file: "a.ts", atImport: false, guarded: false, ...over }
}

test("a name outside every quote is not quoted", () => {
  const line = "const held = Bun.file(at)"
  expect(quotedAt(line, line.indexOf("Bun."))).toBe(false)
})

test("a name inside a quote is quoted", () => {
  const line = 'throw new Error("Bun.Transpiler is not here")'
  expect(quotedAt(line, line.indexOf("Bun."))).toBe(true)
})

test("a quote that closed before the name leaves the name unquoted", () => {
  const line = 'const said = "done"; Bun.file(at)'
  expect(quotedAt(line, line.indexOf("Bun."))).toBe(false)
})

test("a quote inside another quote does not close it", () => {
  const line = `const said = "he said 'Bun.file' here"`
  expect(quotedAt(line, line.indexOf("Bun."))).toBe(true)
})

test("an escaped quote does not open one", () => {
  const line = 'const said = "\\"" + Bun.file(at)'
  expect(quotedAt(line, line.indexOf("Bun."))).toBe(false)
})

test("a manifest names its main with no leading dot slash", () => {
  expect(namedByManifest('{ "main": "./out/entry.js" }')).toBe("out/entry.js")
  expect(namedByManifest('{ "main": "out/entry.js" }')).toBe("out/entry.js")
})

test("a manifest naming no main names nothing", () => {
  expect(namedByManifest("{}")).toBeNull()
  expect(namedByManifest('{ "main": "" }')).toBeNull()
  expect(namedByManifest('{ "main": 7 }')).toBeNull()
})

test("text that is no json names nothing rather than throwing", () => {
  expect(namedByManifest("not json at all")).toBeNull()
  expect(namedByManifest("null")).toBeNull()
  expect(namedByManifest('"a string"')).toBeNull()
})

test("a bundle's section comments name the files it reached", () => {
  const bundle = ["// a/one.ts", "const x = 1", "// b/two.tsx", "const y = 2"].join("\n")
  expect([...sectionsIn(bundle)].sort()).toEqual(["a/one.ts", "b/two.tsx"])
})

test("a comment naming no typescript file is no section", () => {
  expect([...sectionsIn("// a/one.js\n// not a path\n")].sort()).toEqual([])
})

test("a reach at import is refused whatever its file spells", () => {
  expect(refusedIn(reachOf({ atImport: true, guarded: true }))).toBe(true)
})

test("a reach that is no bun global is refused even where the file guards", () => {
  expect(refusedIn(reachOf({ global: "import.meta.dir", guarded: true }))).toBe(true)
})

test("a guarded bun reach below the top level is carried", () => {
  expect(refusedIn(reachOf({ guarded: true }))).toBe(false)
  expect(refusedIn(reachOf({ guarded: false }))).toBe(true)
})

test("a reach is said with its global, its file and whether it stands at import", () => {
  expect(saidAs(reachOf())).toBe("Bun.file in a.ts")
  expect(saidAs(reachOf({ atImport: true }))).toBe("Bun.file in a.ts, at import")
})

test("a reach is found under the section it stands in", () => {
  const bundle = ["// a/one.ts", "  const x = Bun.file(at)"].join("\n")
  expect(reachesIn(bundle)).toEqual([
    { global: "Bun.file", file: "a/one.ts", atImport: false, guarded: false },
  ])
})

test("a file spelling typeof Bun anywhere guards every reach in that file", () => {
  const bundle = ["// a/one.ts", "  if (typeof Bun === 'undefined') return", "  Bun.file(at)"].join(
    "\n"
  )
  expect(reachesIn(bundle)[0]?.guarded).toBe(true)
})

test("a guard in one file does not guard the file beside it", () => {
  const bundle = ["// a/one.ts", "  const held = typeof Bun", "// b/two.ts", "  Bun.file(at)"].join(
    "\n"
  )
  const found = reachesIn(bundle)
  expect(found.map((one) => one.file)).toEqual(["b/two.ts"])
  expect(found[0]?.guarded).toBe(false)
})

test("a reach standing at the bundle's top level is at import", () => {
  const bundle = ["// a/one.ts", "Bun.file(at)"].join("\n")
  expect(reachesIn(bundle)[0]?.atImport).toBe(true)
})

test("a quoted global is no reach", () => {
  const bundle = ["// a/one.ts", '  throw new Error("Bun.Transpiler is not here")'].join("\n")
  expect(reachesIn(bundle)).toEqual([])
})

test("the same reach twice in one file is one reach", () => {
  const bundle = ["// a/one.ts", "  Bun.file(at)", "  Bun.file(other)"].join("\n")
  expect(reachesIn(bundle).length).toBe(1)
})

test("import.meta.main is carried where the three others are refused", () => {
  const bundle = [
    "// a/one.ts",
    "  const held = import.meta.main",
    "  const there = import.meta.dir",
  ].join("\n")
  expect(reachesIn(bundle).map((one) => one.global)).toEqual(["import.meta.dir"])
})

test("a module no bundle reached is unreached, and one that was reached is not", () => {
  const root = mkdtempSync(join(tmpdir(), "node-clean-test-"))
  try {
    mkdirSync(join(root, "pkg", "one"), { recursive: true })
    mkdirSync(join(root, "pkg", "two"), { recursive: true })
    writeFileSync(join(root, "pkg", "one", "one.module.code.ts"), "")
    writeFileSync(join(root, "pkg", "two", "two.module.code.ts"), "")
    expect(unreachedIn(root, "pkg", new Set(["pkg/one/one.module.code.ts"]))).toEqual([
      "pkg/two/two.module.code.ts",
    ])
    expect(unreachedIn(root, "pkg", new Set()).length).toBe(2)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a package holding no module leaves nothing unreached", () => {
  const root = mkdtempSync(join(tmpdir(), "node-clean-test-"))
  try {
    mkdirSync(join(root, "pkg"), { recursive: true })
    expect(unreachedIn(root, "pkg", new Set())).toEqual([])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a throw is shown as its first few lines, blank lines dropped", () => {
  expect(firstLines("one\n\ntwo\nthree\nfour", 3)).toBe("one / two / three")
  expect(firstLines("only", 3)).toBe("only")
  expect(firstLines("", 3)).toBe("")
})
