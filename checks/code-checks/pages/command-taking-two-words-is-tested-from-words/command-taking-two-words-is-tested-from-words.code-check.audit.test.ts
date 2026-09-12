import { afterAll, expect, test } from "bun:test"
import { commandTakingTwoWordsIsTestedFromWords } from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.audit.code.ts"
import { treed } from "akasha/checks/modules/scratch/check-scratch.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const AT = "commands/pages/humming/leaf/humming-leaf.command.ts"

const BESIDE = "commands/pages/humming/leaf/humming-leaf.command.test.ts"

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

function rooted(beside: string): string {
  const root = scratch.rootFor("akasha-command-two-words-audit-")
  writing(root, AT, PAGE)
  writing(root, BESIDE, beside)
  return treed(root)
}

test("a command whose test fills nothing from words is refused over the whole tree", () => {
  const said = commandTakingTwoWordsIsTestedFromWords(rooted(KEYED))

  expect(said.map((one) => one.path)).toEqual([AT])
  expect(said[0]?.reason).toContain("fills 2 arguments from words")
})

test("a tree whose commands are tested from words is let through", () => {
  expect(commandTakingTwoWordsIsTestedFromWords(rooted(FILLS))).toEqual([])
})
