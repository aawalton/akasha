import { afterAll, test as check, expect } from "bun:test"
import { mkdirSync, readFileSync, realpathSync, symlinkSync, writeFileSync } from "node:fs"
import { dirname, join } from "node:path"
import { scratchWorld } from "../../command-system/scratching/scratching.module.code.ts"
import { BINARY, endOf, foundIn, lintedOver } from "./code-lint.module.code.ts"

const UNUSED = "export function held(a: number, b: number): number {\n  return a\n}\n"

const CLEAN = "export function held(a: number): number {\n  return a\n}\n"

const RAGGED = "const x=1\n"

const LINTING =
  '{"formatter":{"enabled":false},"assist":{"enabled":false},"linter":{"rules":' +
  '{"recommended":true,"correctness":{"noUnusedFunctionParameters":"error"}}}}\n'

const FORMATTING = '{"assist":{"enabled":false},"linter":{"enabled":false}}\n'

const CONFIG = "biome.json"

const MODULES = "node_modules"

const RULE = "lint/correctness/noUnusedFunctionParameters"

const SAID =
  "The --json option is unstable/experimental and its output might change between patches.\n" +
  `{"summary":{"errors":2},"diagnostics":[{"severity":"error","category":"${RULE}",` +
  '"message":"This parameter is unused.","location":{"path":"akasha/one.ts",' +
  '"start":{"line":28,"column":3}},"advices":[]}],"command":"check"}\n' +
  "check\n  x Some errors were emitted while running checks.\n"

const scratch = scratchWorld()

afterAll(scratch.sweep)

function repo(files: Record<string, string>, settings: string, linter: boolean): string {
  const root = realpathSync(scratch.rootFor("code-lint-"))
  mkdirSync(join(root, "akasha"), { recursive: true })
  writeFileSync(join(root, CONFIG), settings)
  if (linter) symlinkSync(join(process.cwd(), MODULES), join(root, MODULES))
  for (const [name, body] of Object.entries(files)) {
    const at = join(root, "akasha", name)
    mkdirSync(dirname(at), { recursive: true })
    writeFileSync(at, body)
  }
  return root
}

check("the findings are read out of the one line among what was printed that carries them", () => {
  const said = foundIn(SAID)
  expect(said?.errors).toBe(2)
  expect(said?.found).toEqual([
    {
      path: "akasha/one.ts",
      line: 28,
      column: 3,
      rule: RULE,
      said: "This parameter is unused.",
    },
  ])
})

check("output holding no run that can be read answers nothing, never an empty run", () => {
  expect(foundIn("")).toBeNull()
  expect(foundIn("bash: biome: command not found")).toBeNull()
  expect(foundIn('{"summary":{"errors":0},"command":"check"}')).toBeNull()
  expect(foundIn("[1,2,3]")).toBeNull()
  expect(foundIn("null")).toBeNull()
})

check("a diagnostic standing nowhere is left out rather than placed by guess", () => {
  const said = foundIn('{"diagnostics":[{"category":"format"},{"location":{}}]}')
  expect(said?.found).toEqual([])
})

check("the end of what was printed is what a failure is said by", () => {
  expect(endOf("one\n\nbash: biome: not found\n\n")).toBe("bash: biome: not found")
  expect(endOf("")).toBe("")
  expect(endOf(`held\n${"x".repeat(400)}`).length).toBe(243)
})

check("a run answers where each finding stands, the rule that named it and what it said", () => {
  const root = repo({ "one.ts": UNUSED }, LINTING, true)
  const said = lintedOver(root, ["akasha"])
  expect(said.failed).toBeNull()
  expect(said.errors).toBe(1)
  expect(said.code).toBe(1)
  expect(said.found).toEqual([
    {
      path: "akasha/one.ts",
      line: 1,
      column: 33,
      rule: RULE,
      said: "This parameter is unused.",
    },
  ])
})

check("a run the linter finds nothing in answers no finding and no failure", () => {
  const root = repo({ "one.ts": CLEAN }, LINTING, true)
  const said = lintedOver(root, ["akasha"])
  expect(said.found).toEqual([])
  expect(said.errors).toBe(0)
  expect(said.failed).toBeNull()
  expect(said.code).toBe(0)
})

check("one named path is read alone, and its neighbour is not", () => {
  const root = repo({ "one.ts": UNUSED, "two.ts": UNUSED }, LINTING, true)
  expect(lintedOver(root, ["akasha/one.ts"]).found.length).toBe(1)
  expect(lintedOver(root, ["akasha"]).found.length).toBe(2)
})

check("a root where no linter stands answers why it could not look, not that nothing stood", () => {
  const root = repo({ "one.ts": UNUSED }, LINTING, false)
  const said = lintedOver(root, ["akasha"])
  expect(said.found).toEqual([])
  expect(said.errors).toBe(0)
  expect(said.failed).toContain(BINARY)
  expect(said.failed).toContain("nothing was looked at")
})

check("a run writes nothing, so a file the formatter would have rewritten stands as it was", () => {
  const root = repo({ "one.ts": RAGGED }, FORMATTING, true)
  const said = lintedOver(root, ["akasha"])
  expect(said.found.length).toBe(1)
  expect(said.found[0]?.rule).toBe("format")
  expect(readFileSync(join(root, "akasha/one.ts"), "utf8")).toBe(RAGGED)
})
