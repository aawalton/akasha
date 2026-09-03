import { expect, test } from "bun:test"
import { decideBlockedPrincipal } from "./blocked-principal-decide.module.code.ts"

test("no principal is derivable for a named agent, and the reason names it", () => {
  const said = decideBlockedPrincipal({ agentName: "scribe" })
  expect(said.kind).toBe("unresolved")
  expect(said.reason).toContain("'scribe'")
})

test("an agent with no name is reported as unnamed rather than left out", () => {
  const said = decideBlockedPrincipal({ agentName: null })
  expect(said.reason).toContain("(unnamed)")
})

test("the reason says why the pages cannot answer, not merely that they did not", () => {
  const said = decideBlockedPrincipal({ agentName: "scribe" })
  expect(said.reason).toContain("An initiative states an aim")
  expect(said.reason).toContain("a branch carries a change")
})
