import { expect, test } from "bun:test"
import {
  ALERT_ROLE,
  type AlertRequirementRow,
  decideAlertRecipient,
} from "./alert-recipient-decide.module.code.ts"

function row(over: Partial<AlertRequirementRow> = {}): AlertRequirementRow {
  return { slug: "disk-full", domain: null, person: null, ...over }
}

test("an alert naming a domain reaches that domain through the operator role", () => {
  const said = decideAlertRecipient("disk-full", [row({ domain: "infrastructure" })])
  expect(said).toEqual({ kind: "domain", domain: "infrastructure", role: ALERT_ROLE })
})

test("an alert naming a person reaches that person", () => {
  expect(decideAlertRecipient("disk-full", [row({ person: "alan" })])).toEqual({
    kind: "person",
    person: "alan",
  })
})

test("no alert named at all resolves to nobody", () => {
  const said = decideAlertRecipient("   ", [row({ person: "alan" })])
  expect(said.kind).toBe("unresolved")
})

test("an alert no document declares says how many it read", () => {
  const said = decideAlertRecipient("other", [row({ person: "alan" })])
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("(1 read)")
})

test("an alert two documents declare picks neither", () => {
  const said = decideAlertRecipient("disk-full", [
    row({ person: "alan" }),
    row({ domain: "infrastructure" }),
  ])
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("refusing to pick one silently")
})

test("an alert naming both a domain and a person names none", () => {
  const said = decideAlertRecipient("disk-full", [row({ domain: "infra", person: "alan" })])
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("two different recipients")
})

test("an alert naming neither lands nowhere until one is stated", () => {
  const said = decideAlertRecipient("disk-full", [row()])
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("names nobody to reach")
})

test("a recipient stated as blank space is no recipient", () => {
  const said = decideAlertRecipient("disk-full", [row({ domain: "   " })])
  expect(said.kind).toBe("unresolved")
})

test("the alert named and the slugs read are compared trimmed", () => {
  const said = decideAlertRecipient("  disk-full  ", [
    row({ slug: " disk-full ", domain: "infrastructure" }),
  ])
  expect(said.kind).toBe("domain")
})
