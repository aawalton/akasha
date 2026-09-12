import { expect, test } from "bun:test"
import {
  found,
  testPathOf,
} from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.decision.code.ts"

const AT = "commands/pages/humming/leaf/humming-leaf.command.ts"

const BESIDE = "commands/pages/humming/leaf/humming-leaf.command.test.ts"

function paged(held: string): string {
  return `export const hummingLeaf = {
  slug: "humming-leaf",
  name: "leaf",
  arguments: [
${held}
  ],
} as const satisfies Command
`
}

const TWO = paged(
  '    { argument: "argument/one", required: true, saidAs: "word" },\n' +
    '    { argument: "argument/two", required: true, saidAs: "word" },'
)

const ONE = paged(
  '    { argument: "argument/one", required: true, saidAs: "word" },\n' +
    '    { argument: "argument/json" },'
)

const MIXED = paged(
  '    { argument: "argument/one", saidAs: "flag-or-word" },\n' +
    '    { argument: "argument/two", saidAs: "word" },'
)

const FILLS =
  'test("it takes its words", () => {\n  takenFor(["a", "b"], "leaf", page, PAGES)\n})\n'

const KEYED = 'test("it answers", () => {\n  hummingLeaf({ one: "a", two: "b" })\n})\n'

test("a command filling two arguments from words with no test filling them is refused", () => {
  const said = found(AT, TWO, KEYED)

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("fills 2 arguments from words")
  expect(said[0]).toContain("a test calling `takenFor` with those words")
})

test("the refusal says why the order is load-bearing", () => {
  expect(found(AT, TWO, KEYED)[0]).toContain("the place its argument sits at in `arguments`")
})

test("a command whose test fills from words is let through", () => {
  expect(found(AT, TWO, FILLS)).toEqual([])
})

test("a command filling one argument from words is let through", () => {
  expect(found(AT, ONE, KEYED)).toEqual([])
})

test("an argument taken at its flag or as a word counts as a word", () => {
  expect(found(AT, MIXED, KEYED)).toHaveLength(1)
})

test("a command with no test beside it is refused by name", () => {
  expect(found(AT, TWO, null)[0]).toContain("is not there")
})

test("a file outside `commands/pages` is judged nothing", () => {
  expect(found("checks/held/held.command.ts", TWO, KEYED)).toEqual([])
})

test("a command's code is judged nothing", () => {
  expect(found("commands/pages/humming/leaf/humming-leaf.command.code.ts", TWO, KEYED)).toEqual([])
})

test("a command page names the test beside it", () => {
  expect(testPathOf(AT)).toBe(BESIDE)
})

test("a path that is no command page names no test", () => {
  expect(testPathOf("commands/modules/held/held.module.ts")).toBeNull()
})
