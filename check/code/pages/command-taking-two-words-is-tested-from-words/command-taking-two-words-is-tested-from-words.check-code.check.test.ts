import { afterAll, expect, test } from "bun:test"
import { commandTakingTwoWordsIsTestedFromWords } from "akasha/check/code/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.check-code.check.code.ts"
import type { Judged } from "akasha/check/modules/judging/judging.module.code.ts"
import { arriving } from "akasha/check/test-fixtures/scratch/check-scratch.test-fixture.code.ts"
import { scratchWorld } from "akasha/file/disk/modules/scratching/scratching.module.code.ts"
import { writing } from "akasha/file/disk/modules/scratching/scratching.module.test-fixtures.ts"
import { shadowAt } from "akasha/page/modules/shadow/shadow.module.code.ts"

const AT = "command/pages/humming/leaf/humming-leaf.command.ts"

const BESIDE = "command/pages/humming/leaf/humming-leaf.command.test.ts"

const NOTES_AT = "command/pages/humming/leaf/notes.md"

const PAGE = `export const hummingLeaf = {
  slug: "humming-leaf",
  name: "leaf",
  arguments: [
    { argument: "argument/one", required: true, saidAs: "word" },
    { argument: "argument/two", required: true, saidAs: "word" },
  ],
} as const satisfies Command
`

const FILLS =
  'test("it takes its words", () => {\n  takenFor(["a", "b"], "leaf", page, PAGES)\n})\n'

const KEYED = 'test("it answers", () => {\n  hummingLeaf({ one: "a", two: "b" })\n})\n'

const scratch = scratchWorld()

afterAll(scratch.sweep)

function judged(beside: string, path: string): readonly Judged[] {
  const root = scratch.rootFor("akasha-command-two-words-check-")
  writing(root, BESIDE, beside)
  return commandTakingTwoWordsIsTestedFromWords(arriving(root, { [path]: PAGE }), shadowAt(root))
}

test("a command page the change carries whose test fills nothing from words is refused", () => {
  const said = judged(KEYED, AT)
  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("fills 2 arguments from words")
})

test("a command page whose test fills from words is let through", () => {
  expect(judged(FILLS, AT)).toEqual([])
})

test("a path the change carries that is no TypeScript is passed over", () => {
  expect(judged(KEYED, NOTES_AT)).toEqual([])
})
