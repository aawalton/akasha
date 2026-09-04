import { expect, test } from "bun:test"
import { type CommsRule, ruleMatches } from "./seat-wake-rules.module.code.ts"

function rule(over: Partial<CommsRule> = {}): CommsRule {
  return {
    id: "one",
    senderMatch: "alan",
    contentRegex: undefined,
    target: "scribe",
    status: "LIVE",
    ...over,
  }
}

test("a rule stating no content pattern matches on the sender alone", () => {
  expect(ruleMatches(rule(), { sender: "alan", content: "anything at all" })).toBe(true)
})

test("a sender the rule does not name matches nothing", () => {
  expect(ruleMatches(rule(), { sender: "someone-else", content: "x" })).toBe(false)
})

test("a sender matches where the rule's name is part of it", () => {
  expect(ruleMatches(rule(), { sender: "sms:alan:mobile", content: "x" })).toBe(true)
})

test("work arriving from nobody matches no rule", () => {
  expect(ruleMatches(rule({ senderMatch: "" }), { sender: "", content: "x" })).toBe(false)
})

test("the content pattern must match once one is stated", () => {
  const it = rule({ contentRegex: "deploy" })
  expect(ruleMatches(it, { sender: "alan", content: "please deploy" })).toBe(true)
  expect(ruleMatches(it, { sender: "alan", content: "please wait" })).toBe(false)
})

test("a content pattern is read without regard to case", () => {
  expect(ruleMatches(rule({ contentRegex: "deploy" }), { sender: "alan", content: "DEPLOY" })).toBe(
    true
  )
})

test("the sender must match even where the content does", () => {
  const it = rule({ contentRegex: "deploy" })
  expect(ruleMatches(it, { sender: "other", content: "deploy" })).toBe(false)
})

test("a content pattern that is no regular expression matches nothing rather than throwing", () => {
  expect(ruleMatches(rule({ contentRegex: "([" }), { sender: "alan", content: "([" })).toBe(false)
})
