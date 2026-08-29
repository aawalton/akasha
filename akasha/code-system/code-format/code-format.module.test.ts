import { afterAll, test as check, expect } from "bun:test"
import { symlinkSync, writeFileSync } from "node:fs"
import { join } from "node:path"
import { scratchWorld } from "../../command-system/scratching.module.code.ts"
import { rootAbove } from "../../testing-system/rooting/rooting.module.code.ts"
import { formattedBody } from "./code-format.module.code.ts"

const REPO_AT = rootAbove(import.meta.dir) ?? ""

const MODULES = "node_modules"

const CONFIG = "biome.json"

const HELD = JSON.stringify({
  formatter: { indentStyle: "space", indentWidth: 2, lineWidth: 100 },
  assist: { actions: { source: { organizeImports: "on" } } },
  javascript: { formatter: { quoteStyle: "double", semicolons: "asNeeded" } },
})

const LOOSE =
  'import {b} from "./b.ts"\nimport {a} from "./a.ts"\nconst   x   =   1\nexport {a,b,x}\n'

const TIDY =
  'import { a } from "./a.ts"\nimport { b } from "./b.ts"\n\nconst x = 1\n\nexport { a, b, x }\n'

const BROKEN = 'import {a} from "./a.ts"\nexport const held = (\n'

const UNPARSEABLE: readonly string[] = [
  "export const held = (\n",
  "function held( {\n",
  'const held = "unclosed\n',
  "}\n",
  "class {\n",
]

const NOTES = "held\n\n  loose   text\n"

const TEXT = new TextEncoder()

const SAID = new TextDecoder()

const scratch = scratchWorld()

afterAll(scratch.sweep)

function rootWithTheFormatter(): string {
  const root = scratch.rootFor("code-format-")
  symlinkSync(join(REPO_AT, MODULES), join(root, MODULES))
  writeFileSync(join(root, CONFIG), HELD)
  return root
}

check("a loose body comes back spaced, and its imports come back sorted", () => {
  const said = formattedBody(rootWithTheFormatter(), "akasha/held.ts", TEXT.encode(LOOSE))
  expect(SAID.decode(said.body)).toBe(TIDY)
  expect(said.changed).toBe(true)
})

check("a body already formatted comes back as it went in, and is not called changed", () => {
  const said = formattedBody(rootWithTheFormatter(), "akasha/held.ts", TEXT.encode(TIDY))
  expect(SAID.decode(said.body)).toBe(TIDY)
  expect(said.changed).toBe(false)
})

check("a body that will not parse comes back byte for byte, and never comes back empty", () => {
  const was = TEXT.encode(BROKEN)
  const said = formattedBody(rootWithTheFormatter(), "akasha/held.ts", was)
  expect(said.body.byteLength).toBeGreaterThan(0)
  expect(said.body.byteLength).toBe(was.byteLength)
  expect([...said.body]).toEqual([...was])
  expect(SAID.decode(said.body)).toBe(BROKEN)
  expect(said.changed).toBe(false)
})

check("no body the formatter refuses to parse is answered as an empty one", () => {
  const root = rootWithTheFormatter()
  for (const one of UNPARSEABLE) {
    const was = TEXT.encode(one)
    const said = formattedBody(root, "akasha/held.ts", was)
    expect([...said.body]).toEqual([...was])
    expect(said.changed).toBe(false)
  }
})

check("a path the formatter does not handle comes back untouched", () => {
  const said = formattedBody(rootWithTheFormatter(), "akasha/held.md", TEXT.encode(NOTES))
  expect(SAID.decode(said.body)).toBe(NOTES)
  expect(said.changed).toBe(false)
})

check("a root holding no formatter answers the body handed in rather than nothing", () => {
  const said = formattedBody(
    scratch.rootFor("code-format-bare-"),
    "akasha/held.ts",
    TEXT.encode(LOOSE)
  )
  expect(SAID.decode(said.body)).toBe(LOOSE)
  expect(said.changed).toBe(false)
})

check("the formatter is reached inside the root it is run for, not wherever this stands", () => {
  const root = rootWithTheFormatter()
  const said = formattedBody(root, "akasha/held.ts", TEXT.encode(LOOSE))
  expect(said.changed).toBe(true)
  expect(root.startsWith("/var/tmp/")).toBe(true)
})
