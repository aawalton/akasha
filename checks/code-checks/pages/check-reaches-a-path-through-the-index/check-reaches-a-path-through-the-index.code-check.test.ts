import { expect, test } from "bun:test"
import {
  askingOver,
  basedOn,
  foldersOf,
  reasonsIn,
} from "./check-reaches-a-path-through-the-index.code-check.code.ts"

const HELD = [
  "design/colors/pages/yellow.color.ts",
  "utils-run/running/running.module.code.ts",
  "pages/name-formats/modules/name-matching/name-matching.module.code.ts",
]

const AT = "checks/code-checks/pages/a/a.code-check.code.ts"

const asking = askingOver(HELD)

function only(text: string): readonly string[] {
  return reasonsIn(asking, AT, text)
}

test("a literal the index knows a page at is refused", () => {
  const said = only('const a = "design/colors/pages/yellow.color.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("design/colors/pages/yellow.color.ts")
})

test("a literal naming a folder the index files pages under is refused", () => {
  const said = only('const a = "utils-run/running/"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("utils-run/running")
})

test("a folder is named with or without the separator closing it", () => {
  expect(only('const a = "design/colors"\n')).toHaveLength(1)
})

test("a literal the index knows a path ending with is refused", () => {
  const said = only('const a = "name-matching/name-matching.module.code.ts"\n')
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("pages/name-formats/modules/name-matching")
})

test("a tail that does not begin at a separator is no path", () => {
  expect(only('const a = "matching/name-matching.module.code.ts"\n')).toEqual([])
})

test("a name holding no separator is no path", () => {
  expect(only('const a = "design"\n')).toEqual([])
})

test("a literal the index knows nothing at is let through", () => {
  expect(only('const a = "text/event-stream"\n')).toEqual([])
})

test("a specifier is left to the checks that judge a specifier", () => {
  expect(only('import { a } from "utils-run/running/running.module.code.ts"\n')).toEqual([])
})

test("a literal matched against rather than read is refused all the same", () => {
  expect(only('const a = path.startsWith("design/colors")\n')).toHaveLength(1)
})

test("the refusal names the line the literal sits on", () => {
  const said = only('const a = 1\nconst b = 2\nconst c = "design/colors"\n')
  expect(said[0]).toContain("line 3")
})

test("each literal is named on its own", () => {
  expect(only('const a = "design/colors"\nconst b = "utils-run/running"\n')).toHaveLength(2)
})

test("a long literal is shortened where the refusal names that literal", () => {
  const long = `${"pages/name-formats/modules/name-matching/name-matching.module.code.ts"} is here`
  const said = reasonsIn(askingOver([...HELD, long]), AT, `const a = "${long}"\n`)
  expect(said).toHaveLength(1)
  expect(said[0]).toContain("…")
})

test("a template holding a value is no plain string, so nothing is seen", () => {
  expect(only("const a = `design/${one}`\n")).toEqual([])
})

test("every folder above a path is derived from that path", () => {
  expect([...foldersOf(["a/b/c.ts"])].sort()).toEqual(["a", "a/b"])
})

test("paths are grouped under the last name each path carries", () => {
  expect(basedOn(["a/b.ts", "c/b.ts"]).get("b.ts")).toEqual(["a/b.ts", "c/b.ts"])
})
