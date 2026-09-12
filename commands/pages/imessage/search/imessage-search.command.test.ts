import { expect, test } from "bun:test"
import { messageQuery } from "akasha/commands/arguments/pages/message-query.argument.ts"
import { queryFile } from "akasha/commands/arguments/pages/query-file.argument.ts"
import type { Given } from "akasha/commands/modules/calling/calling.module.code.ts"
import { imessageSearch } from "akasha/commands/pages/imessage/search/imessage-search.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha imessage search",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a search naming nothing to search for is refused once, naming every way to say it", async () => {
  const said = await imessageSearch([], GIVEN)

  expect(said.report).toEqual([])
  expect(said.refusals.length).toBe(1)
  for (const one of [queryFile.said, `<${messageQuery.placeholder}>`, messageQuery.said]) {
    expect(said.refusals[0]).toContain(one)
  }
})
