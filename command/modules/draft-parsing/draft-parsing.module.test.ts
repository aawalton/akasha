import { expect, test } from "bun:test"
import type { FileChange } from "akasha/change/modules/answer/change-answer.module.code.ts"
import { unparsedAfter } from "akasha/command/modules/draft-parsing/draft-parsing.module.code.ts"

const AT = "lore/hall.lore.ts"

const BODY = 'export const hall = {\n  facts: [{ fact: "one" }],\n} as const\n'

const bodyOf = (path: string): string | null => (path === AT ? BODY : null)

const JOINED: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: "}],",
  contentTo: '}, { fact: "two" }],',
}

const RUN_ON: FileChange = {
  kind: "replace",
  path: AT,
  contentFrom: "],",
  contentTo: '{ fact: "two" }],',
}

test("a draft leaving a page that parses is not refused", () => {
  expect(unparsedAfter(bodyOf, [JOINED], [JOINED])).toEqual([])
})

test("a draft leaving a page that will not parse names the path, line and column", () => {
  const said = unparsedAfter(bodyOf, [RUN_ON], [RUN_ON])
  expect(said).toHaveLength(1)
  expect(said[0]).toStartWith(`\`${AT}\` would no longer parse — line 2, column 26 — `)
})

test("an edit kept earlier is replayed before the new one is judged", () => {
  expect(unparsedAfter(bodyOf, [RUN_ON, JOINED], [JOINED])).toHaveLength(1)
})

test("a body that is no TypeScript is not parsed", () => {
  const note: FileChange = { kind: "add", path: "lore/hall.md", content: "{ {" }
  expect(unparsedAfter(bodyOf, [note], [note])).toEqual([])
})
