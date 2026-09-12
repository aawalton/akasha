import { expect, test } from "bun:test"
import {
  authorIn,
  CLAUDE_AUTHOR,
  forgetCommitAuthor,
  WRITER_NAMED,
} from "akasha/commands/modules/commit-author/commit-author.module.code.ts"

const SOMEONE = "Someone <one@two.three>"

test("a commit no seat is writing and no writer is named for is authored as Claude", () => {
  forgetCommitAuthor()
  expect(authorIn({})).toBe(CLAUDE_AUTHOR)
})

test("a writer named as nothing is no writer named", () => {
  forgetCommitAuthor()
  expect(authorIn({ [WRITER_NAMED]: "" })).toBe(CLAUDE_AUTHOR)
})

test("a writer the environment names is the author over the persona", () => {
  forgetCommitAuthor()
  expect(authorIn({ [WRITER_NAMED]: SOMEONE })).toBe(SOMEONE)
})
