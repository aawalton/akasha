import { describe, expect, test } from "bun:test"
import {
  EMAIL_RULE_SET,
  EMAIL_RULE_SET_NAME,
} from "akasha/alan/harness/email-watch/modules/email-rule-set/email-rule-set.module.code.ts"

describe("the fields an email rule tests", () => {
  test("every field holds text", () => {
    for (const field of EMAIL_RULE_SET.fields) expect(field.type).toBe("text")
  })

  test("names the fields a message is matched on", () => {
    expect(EMAIL_RULE_SET.fields.map((one) => one.name)).toEqual(["from", "list", "subject", "to"])
  })

  test("is named", () => {
    expect(EMAIL_RULE_SET.name).toBe(EMAIL_RULE_SET_NAME)
  })
})
