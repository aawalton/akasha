import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const emailRule = {
  id: "01a06828-59d3-7486-8463-b59a1768c717",
  type: "page-type",
  slug: "email-rule",
  definition: "what to do with some of a person's mail",
  extends: ["page-type/page"],
  parts: [
    "page-type/email-rule-agent",
    "page-type/email-rule-code",
    "record-property/email-rule-matches",
    "select-property/email-rule-match-comparison",
    "select-property/email-rule-match-field",
    "text-property/email-rule-match-values",
  ],
  properties: [
    { pageProperty: "text-property/title", required: true, many: false },
    {
      pageProperty: "record-property/email-rule-matches",
      required: true,
      many: true,
      maxCount: 10,
    },
  ],
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule is matched against an email message.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One person's rules are a set of their own.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A rule's kind is the folder the rule is in rather than a key on the rule.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
