import { expect, test } from "bun:test"
import { explore } from "akasha/agent/subagent/kind/pages/explore/explore.subagent-kind.ts"
import { generalPurpose } from "akasha/agent/subagent/kind/pages/general-purpose/general-purpose.subagent-kind.ts"
import { everyKind } from "akasha/agent/subagent/modules/compose-subagent/compose-subagent.module.code.ts"

test("every kind stating a prompt is in the map under its dispatched-as", () => {
  const kinds = everyKind()
  expect(kinds[explore.dispatchedAs]?.description).toBe(explore.definition)
  expect(kinds[explore.dispatchedAs]?.model).toBe(explore.model)
  expect(kinds[generalPurpose.dispatchedAs]?.description).toBe(generalPurpose.definition)
  expect(kinds[generalPurpose.dispatchedAs]?.prompt ?? "").not.toBe("")
})
