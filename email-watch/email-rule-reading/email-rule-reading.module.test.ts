import { describe, expect, test } from "bun:test"
import { rulesOf } from "@akasha/email-watch/email-rule-reading"
import { ruleFolderIn, ruleLocation } from "@akasha/email-watch/email-rule-set"
import { akashaRoot } from "@akasha/pages-system/checkout-roots"

const ROOT = akashaRoot()

describe("rulesOf", () => {
  const rules = rulesOf("alan", ROOT)

  test("reads every rule of both kinds", () => {
    expect(rules.filter((one) => one.kind === "code")).toHaveLength(54)
    expect(rules.filter((one) => one.kind === "agent")).toHaveLength(54)
  })

  test("reads agent rules before code rules, each kind by page file name", () => {
    const kinds = [...new Set(rules.map((one) => one.kind))]
    expect(kinds).toEqual(["agent", "code"])
    for (const kind of kinds) {
      const names = rules.filter((one) => one.kind === kind).map((one) => one.relPath)
      expect(names).toEqual([...names].sort())
    }
  })

  test("orders a slug before the slug it is a prefix of, as the file names do", () => {
    const at = (slug: string) => rules.findIndex((one) => one.slug === slug)
    expect(at("apple-developer-notices-testflight-no-reply")).toBeLessThan(
      at("apple-developer-notices")
    )
  })

  test("carries a code rule's filing and its clauses", () => {
    const rule = rules.find((one) => one.slug === "account-statements")
    expect(rule?.filing).toBe("archive")
    expect(rule?.conditions).toEqual([
      {
        field: "from",
        test: "is",
        negated: false,
        values: [
          "alerts@info6.citi.com",
          "support@uccu.com",
          "noreply-finance@mail.churchofjesuschrist.org",
          "statements@mail.synchronybank.com",
          "support@betterment.com",
        ],
      },
      { field: "subject", test: "contains", negated: false, values: ["statement"] },
    ])
  })

  test("reads a negated comparison as its positive test negated", () => {
    const rule = rules.find((one) => one.slug === "amazon-other")
    expect(rule?.conditions.map((one) => [one.test, one.negated])).toEqual([
      ["ends with", false],
      ["is", true],
      ["contains", true],
    ])
  })

  test("carries the delay and the forwarding a rule states", () => {
    expect(rules.find((one) => one.slug === "anthropic-login-links")?.delayMinutes).toBe(15)
    expect(rules.find((one) => one.slug === "apple-receipt")?.forwardToSlug).toBe("jenny")
    expect(rules.filter((one) => one.forwardToSlug !== null)).toHaveLength(6)
  })

  test("carries an agent rule's judgment and files nothing", () => {
    const rule = rules.find((one) => one.slug === "everything-else")
    expect(rule?.kind).toBe("agent")
    expect(rule?.filing).toBeNull()
    expect(rule?.judgment.length).toBeGreaterThan(0)
  })

  test("holds no rule under a slug no page names", () => {
    expect(rules.find((one) => one.slug === "zzz-not-a-real-rule")).toBeUndefined()
  })

  test("raises where a person's rules cannot be read", () => {
    expect(() => rulesOf("nobody-of-that-name", ROOT)).toThrow(/cannot be read/)
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

  test("answers none for a path that is no rule", () => {
    expect(ruleLocation("akasha/email-watch/inbox-run/inbox-run.module.code.ts")).toBeNull()
  })
})
