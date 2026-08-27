import { describe, expect, test } from "bun:test"
import {
  type CategorySource,
  categorySourceSentence,
  parseRuleMatch,
  type RuleCondition,
  ruleConditions,
  ruleOutcomes,
} from "./wording"

function looksFor(...conditions: readonly RuleCondition[]): {
  readonly conditions: readonly RuleCondition[]
} {
  return { conditions }
}

function condition(
  field: string,
  test: string,
  negated: boolean,
  ...values: readonly string[]
): RuleCondition {
  return { field, test, negated, values }
}

const JARGON = [
  "merchantContains",
  "merchantExcludes",
  "statementContains",
  "statementExcludes",
  "reserveForPerson",
  "categoryProvenance",
  "categorySlug",
  "decidedBy",
  "category-source",
  "category-decided-by",
  "programmatic-categorization",
  "semantic-categorization",
  "manual-categorization",
]

const SOURCES = [
  "programmatic-categorization",
  "semantic-categorization",
  "manual-categorization",
  "monarch",
  "a-kind-nobody-has-entered-yet",
]

describe("reading what a rule looks for out of its own document", () => {
  test("takes every condition under the match heading, with the words beneath it", () => {
    const parsed = parseRuleMatch(
      "\n# Match\n\n- **merchant** is\n  - `costco`\n  - `costco gas`\n- **sign** is not\n  - `positive`\n"
    )
    expect(parsed).toEqual([
      condition("merchant", "is", false, "costco", "costco gas"),
      condition("sign", "is", true, "positive"),
    ])
  })

  test("stops at the heading after the match, so a rule's prose is never read as a condition", () => {
    const parsed = parseRuleMatch(
      "\n# Match\n\n- **merchant** is\n  - `chevron`\n\n# Rule\n\n- **merchant** is\n  - `never read`\n"
    )
    expect(parsed).toEqual([condition("merchant", "is", false, "chevron")])
  })

  test("reads a document with no match section as looking for nothing", () => {
    expect(parseRuleMatch("# Rule\n\nSomething else entirely.\n")).toEqual([])
  })

  test("carries a denial back to the test it denies rather than making a test of its own", () => {
    expect(parseRuleMatch("# Match\n\n- **account** is not\n  - `7882`\n")).toEqual([
      condition("account", "is", true, "7882"),
    ])
  })
})

describe("what a rule looks for", () => {
  test("carries no name from the stored record into the sentence", () => {
    const sentences = ruleConditions(
      looksFor(
        condition("merchant", "contains", false, "costco"),
        condition("merchant", "contains", true, "costco gas"),
        condition("statement", "contains", false, "wholesale"),
        condition("statement", "contains", true, "fuel")
      )
    ).join(" ")
    for (const jargon of JARGON) expect(sentences).not.toContain(jargon)
  })

  test("gives every condition naming a word a sentence of its own, and nothing else one", () => {
    expect(ruleConditions(looksFor())).toHaveLength(0)
    expect(
      ruleConditions(looksFor(condition("merchant", "contains", false, "costco")))
    ).toHaveLength(1)
    expect(
      ruleConditions(
        looksFor(
          condition("merchant", "contains", false, "costco"),
          condition("merchant", "contains", true, "costco gas")
        )
      )
    ).toHaveLength(2)
  })

  test("says what a rule matches on and what it rules out as opposite conditions", () => {
    const [matches] = ruleConditions(looksFor(condition("merchant", "contains", false, "costco")))
    const [rulesOut] = ruleConditions(looksFor(condition("merchant", "contains", true, "costco")))
    expect(matches).not.toBe(rulesOut)
    expect(rulesOut).toContain("does not")
    expect(matches).not.toContain("does not")
  })

  test("keeps the shop's name and the bank's own line apart", () => {
    const [shop] = ruleConditions(looksFor(condition("merchant", "contains", false, "sq")))
    const [bank] = ruleConditions(looksFor(condition("statement", "contains", false, "sq")))
    expect(shop).not.toBe(bank)
  })

  test("shows every word it is looking for, quoted so a stray space is visible", () => {
    const [sentence = ""] = ruleConditions(
      looksFor(condition("merchant", "contains", true, "gas", "fuel ", "pharmacy"))
    )
    for (const word of ["gas", "fuel ", "pharmacy"]) expect(sentence).toContain(`“${word}”`)
    expect(sentence).toContain(" or “pharmacy”")
  })

  test("treats a condition with no word under it as nothing to look for", () => {
    expect(ruleConditions(looksFor(condition("merchant", "is", false)))).toHaveLength(0)
    expect(ruleConditions(looksFor(condition("merchant", "is", false, "")))).toHaveLength(0)
  })

  test("phrases a field it has no words for from that field's own name", () => {
    const [sentence = ""] = ruleConditions(looksFor(condition("tag", "is", false, "trip")))
    expect(sentence).toContain("the tag")
    expect(sentence).toContain("“trip”")
  })
})

describe("what a rule then does", () => {
  test("gives every outcome that is set an entry, and reports both where both are", () => {
    expect(ruleOutcomes({ categoryName: null, reserveForPerson: false })).toHaveLength(0)
    expect(ruleOutcomes({ categoryName: "Groceries", reserveForPerson: false })).toHaveLength(1)
    expect(ruleOutcomes({ categoryName: null, reserveForPerson: true })).toHaveLength(1)
    expect(ruleOutcomes({ categoryName: "Groceries", reserveForPerson: true })).toHaveLength(2)
  })

  test("names the category the rule files it under", () => {
    expect(ruleOutcomes({ categoryName: "Groceries", reserveForPerson: false })[0]).toContain(
      "Groceries"
    )
  })

  test("says a person settles it without naming the field that says so", () => {
    const [outcome = ""] = ruleOutcomes({ categoryName: null, reserveForPerson: true })
    expect(outcome).toContain("person")
    for (const jargon of JARGON) expect(outcome).not.toContain(jargon)
  })
})

describe("where a category came from", () => {
  test("tells every kind of decision apart, so one can be argued with and another cannot", () => {
    const named = SOURCES.map((source) => categorySourceSentence({ source, decidedBy: "Someone" }))
    expect(new Set(named).size).toBe(SOURCES.length)
  })

  test("parts a record naming nobody from no record at all", () => {
    const fromMonarch = categorySourceSentence({ source: "monarch", decidedBy: null })
    const nothingRecorded = categorySourceSentence(null)
    expect(fromMonarch).not.toBe(nothingRecorded)
    expect(fromMonarch).toContain("Monarch")
  })

  test("names the decider wherever the record names one", () => {
    for (const source of SOURCES) {
      expect(categorySourceSentence({ source, decidedBy: "Costco Gas" })).toContain("Costco Gas")
    }
  })

  test("never renders an unnamed decider as a blank or a stringified nothing", () => {
    const unnamed: readonly (CategorySource | null)[] = [
      null,
      ...SOURCES.map((source) => ({ source, decidedBy: null })),
    ]
    for (const provenance of unnamed) {
      const sentence = categorySourceSentence(provenance)
      expect(sentence.trim()).toBe(sentence)
      expect(sentence.length).toBeGreaterThan(0)
      for (const empty of ["null", "undefined", "  ", '""', "“”"]) {
        expect(sentence).not.toContain(empty)
      }
    }
  })

  test("never puts the stored spelling of a decision in front of Jenny", () => {
    for (const source of SOURCES) {
      for (const decidedBy of ["Someone", null]) {
        const sentence = categorySourceSentence({ source, decidedBy })
        for (const jargon of JARGON) expect(sentence).not.toContain(jargon)
      }
    }
  })

  test("says a kind it has no words for is unaccounted for rather than guessing at one", () => {
    const unknown = categorySourceSentence({
      source: "a-kind-nobody-has-entered-yet",
      decidedBy: null,
    })
    for (const known of ["rule", "Monarch", "person"]) expect(unknown).not.toContain(known)
  })
})
