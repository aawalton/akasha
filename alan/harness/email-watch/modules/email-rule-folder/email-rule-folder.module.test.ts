import { describe, expect, test } from "bun:test"
import {
  EMAIL_RULE_KINDS,
  ruleFolderIn,
  ruleKinds,
  ruleLocation,
} from "akasha/alan/harness/email-watch/modules/email-rule-folder/email-rule-folder.module.code.ts"
import { NO_RULE_AT } from "akasha/alan/harness/email-watch/modules/email-rule-folder/email-rule-folder.module.test-fixtures.ts"

describe("where a person's rules of each kind are", () => {
  test("there are two kinds", () => {
    expect(ruleKinds()).toEqual(EMAIL_RULE_KINDS)
  })

  test("a kind's folder names the person and the kind", () => {
    expect(ruleFolderIn("alan", "code")).toBe("alan/harness/inbox/email-rule/code/pages")
    expect(ruleFolderIn("jenny", "agent")).toBe("jenny/harness/inbox/email-rule/agent/pages")
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
      const at = `${ruleFolderIn("alan", kind)}/some-rule.email-rule-${kind}.ts`
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
    expect(ruleLocation(NO_RULE_AT)).toBeNull()
  })
})
