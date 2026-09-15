import { expect, test } from "bun:test"
import { addLabel } from "akasha/command/arguments/pages/add-label.argument.ts"
import { removeLabel } from "akasha/command/arguments/pages/remove-label.argument.ts"
import type { Given } from "akasha/command/modules/calling/calling.module.code.ts"
import { emailMessageModifyLabel } from "akasha/command/pages/email/message/modify-label/email-message-modify-label.command.code.ts"

const GIVEN: Given = {
  root: "/nowhere",
  calledAs: "akasha email message modify-label",
  from: "/nowhere",
  writer: null,
  agentId: null,
}

test("a relabelling naming neither an addition nor a removal is refused once", async () => {
  const said = await emailMessageModifyLabel(["--message", "abc123"], GIVEN)

  expect(said.report).toEqual([])
  expect(said.refusals.length).toBe(1)
  expect(said.refusals[0]).toContain(addLabel.said)
  expect(said.refusals[0]).toContain(removeLabel.said)
})
