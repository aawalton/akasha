import { expect, test } from "bun:test"
import { decideDomainLead, recipientFromLead } from "./domain-lead-decide.module.code.ts"

const DECLARED = { declared: true, persona: "athena", at: "domains/akasha.md" }

test("a declared domain naming a champion yields that champion", () => {
  expect(decideDomainLead("akasha", DECLARED)).toEqual({ kind: "lead", handle: "athena" })
})

test("no domain named at all yields no lead", () => {
  expect(decideDomainLead("  ", DECLARED).kind).toBe("unresolved")
})

test("a domain no document declares says the slug may be spelled otherwise", () => {
  const said = decideDomainLead("ghost", { declared: false, persona: null, at: null })
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("spelled differently")
})

test("a declared domain reaching no champion reports a tree that lost one", () => {
  const said = decideDomainLead("akasha", { declared: true, persona: null, at: null })
  expect(said.kind).toBe("unresolved")
  if (said.kind === "unresolved") expect(said.reason).toContain("has lost it")
})

test("a champion named as blank space is no champion", () => {
  expect(decideDomainLead("akasha", { declared: true, persona: "   ", at: "x" }).kind).toBe(
    "unresolved"
  )
})

test("a lead is the recipient, defaulted for nothing", () => {
  expect(recipientFromLead({ kind: "lead", handle: "athena" }, "alan")).toEqual({
    handle: "athena",
    defaultedBecause: null,
  })
})

test("an unresolved lead falls back to the default and carries the reason", () => {
  const said = recipientFromLead({ kind: "unresolved", reason: "nothing declares it." }, " alan ")
  expect(said.handle).toBe("alan")
  expect(said.defaultedBecause).toContain("nothing declares it.")
  expect(said.defaultedBecause).toContain("'alan'")
})
