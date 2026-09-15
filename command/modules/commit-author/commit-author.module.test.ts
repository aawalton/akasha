import { expect, test } from "bun:test"
import {
  authorIn,
  CLAUDE_AUTHOR,
  WRITER_NAMED,
} from "akasha/command/modules/commit-author/commit-author.module.code.ts"

const SOMEONE = "Someone <one@two.three>"

test("a commit no seat is writing and no writer is named for is authored as Claude", () => {
  expect(authorIn({})).toBe(CLAUDE_AUTHOR)
})

test("a writer named as nothing is no writer named", () => {
  expect(authorIn({ [WRITER_NAMED]: "" })).toBe(CLAUDE_AUTHOR)
})

test("a writer the environment names is the author over the persona", () => {
  expect(authorIn({ [WRITER_NAMED]: SOMEONE })).toBe(SOMEONE)
})

test("an environment naming a writer does not settle what a later call answers", () => {
  expect(authorIn({ [WRITER_NAMED]: SOMEONE })).toBe(SOMEONE)
  expect(authorIn({})).toBe(CLAUDE_AUTHOR)
})
