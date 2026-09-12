import { afterAll, expect, test } from "bun:test"
import { reasonsIn } from "akasha/checks/code-checks/pages/command-taking-two-words-is-tested-from-words/command-taking-two-words-is-tested-from-words.code-check.check.code.ts"
import { bodiesIn } from "akasha/testing-system/modules/bodying/bodying.module.code.ts"
import { scratchWorld } from "akasha/utils/fs/scratching/scratching.module.code.ts"
import { writing } from "akasha/utils/fs/scratching/scratching.module.test-fixtures.ts"

const AT = "commands/pages/humming/leaf/humming-leaf.command.ts"

const BESIDE = "commands/pages/humming/leaf/humming-leaf.command.test.ts"

const NOTES_AT = "commands/pages/humming/leaf/notes.md"

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
  const root = scratch.rootFor("akasha-command-two-words-check-")
  writing(root, BESIDE, beside)
  return root
}

test("a command page the change carries whose test fills nothing from words is refused", () => {
  const said = reasonsIn(bodiesIn(rooted(KEYED))(AT, PAGE))

  expect(said).toHaveLength(1)
  expect(said[0]).toContain("fills 2 arguments from words")
})

test("a command page whose test fills from words is let through", () => {
  expect(reasonsIn(bodiesIn(rooted(FILLS))(AT, PAGE))).toEqual([])
})

test("a path the change carries that is no TypeScript is passed over", () => {
  expect(reasonsIn(bodiesIn(rooted(KEYED))(NOTES_AT, PAGE))).toEqual([])
})

test("a body that is not text refuses rather than being passed over", () => {
  const held = { root: rooted(KEYED), path: AT, bytes: new Uint8Array([0xff, 0xfe, 0x00]) }

  expect(() => reasonsIn(held)).toThrow("not valid UTF-8")
})
