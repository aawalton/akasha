import { describe, expect, test } from "bun:test"
import {
  EMAIL_RULE_KINDS,
  EMAIL_RULE_SET,
  emailRuleSet,
  ruleFileSuffix,
  ruleFolderIn,
  ruleFolderOf,
  ruleKinds,
  ruleLocation,
} from "./email-rule-set.module.code.ts"

describe("the fields an email rule tests", () => {
  test("every field holds text", () => {
    for (const field of emailRuleSet.fields) expect(field.type).toBe("text")
  })

  test("names the fields a message is matched on", () => {
    expect(emailRuleSet.fields.map((one) => one.name)).toEqual(["from", "list", "subject", "to"])
  })

  test("states no value of its own for any field", () => {
    for (const field of emailRuleSet.fields) expect(field.values).toEqual([])
  })

  test("fills an absent address field rather than leaving it empty", () => {
    const filled = emailRuleSet.fields.filter((one) => one.filler !== undefined)
    expect(filled.map((one) => one.name)).toEqual(["from", "to"])
  })

  test("is named", () => {
    expect(emailRuleSet.name).toBe(EMAIL_RULE_SET)
  })
})

describe("where a person's rules of each kind are", () => {
  test("there are two kinds", () => {
    expect(ruleKinds()).toEqual(EMAIL_RULE_KINDS)
  })

  test("a kind's folder names the person and the kind", () => {
    expect(ruleFolderIn("alan", "code")).toBe("alan/harness/inboxes/email-rules/codes/pages")
    expect(ruleFolderIn("jenny", "agent")).toBe("jenny/harness/inboxes/email-rules/agents/pages")
  })

  test("a kind's file suffix carries that kind", () => {
    expect(ruleFileSuffix("agent")).toBe(".email-rule-agent.ts")
    expect(ruleFileSuffix("code")).toBe(".email-rule-code.ts")
  })

  test("a person's folders of every kind are named together", () => {
    expect(ruleFolderOf("alan")).toBe(
      `${ruleFolderIn("alan", "agent")} and ${ruleFolderIn("alan", "code")}`
    )
  })

  test("each kind's glob reaches the same folder for every person", () => {
    for (const kind of ruleKinds()) {
      expect(emailRuleSet.kinds[kind]?.glob).toBe(
        `${ruleFolderIn("*", kind)}/*${ruleFileSuffix(kind)}`
      )
    }
  })
})

describe("ruleLocation", () => {
  test("reads the person, the kind and the slug off a rule's path", () => {
    const at = `${ruleFolderIn("alan", "code")}/account-statements.email-rule-code.ts`
    expect(ruleLocation(at)).toEqual({
      person: "alan",
      kind: "code",
      slug: "account-statements",
    })
  })

  test("reads the kind of every kind there is", () => {
    for (const kind of ruleKinds()) {
      const at = `${ruleFolderIn("alan", kind)}/some-rule${ruleFileSuffix(kind)}`
      expect(ruleLocation(at)?.kind).toBe(kind)
    }
  })

  test("answers none where the folder's kind and the file's kind disagree", () => {
    const crossed = `${ruleFolderIn("alan", "agent")}/account-statements.email-rule-code.ts`
    expect(ruleLocation(crossed)).toBeNull()
  })

  test("answers none for a rule sitting under nobody", () => {
    expect(ruleLocation("account-statements.email-rule-code.ts")).toBeNull()
  })

  test("answers none for a path that is no rule", () => {
    expect(ruleLocation("akasha/email-watch/inbox-run/inbox-run.module.code.ts")).toBeNull()
  })
})
