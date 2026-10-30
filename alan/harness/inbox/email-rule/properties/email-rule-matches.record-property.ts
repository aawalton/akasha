import type { RecordProperty } from "akasha/page/record-property/record-property.page-type.types.ts"

export const emailRuleMatches = {
  id: "01a06860-549f-7699-a464-5922a5455508",
  type: "page-type/record-property",
  slug: "email-rule-matches",
  propertySlug: "matches",
  definition: "the conditions every email a rule handles matches",
  properties: [
    { pageProperty: "select-property/email-rule-match-field", required: true, many: false },
    {
      pageProperty: "select-property/email-rule-match-comparison",
      required: true,
      many: false,
    },
    {
      pageProperty: "text-property/email-rule-match-values",
      required: true,
      many: true,
      maxCount: 50,
    },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece of mail is caught where the mail passes every clause.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rule with no clause catches nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two clauses on one field are two entries.",
    },
  ],
  types: "ts",
  createdAt: "2026-09-03T17:45:38.719Z",
  updatedAt: "2026-10-30T15:28:47.405Z",
} as const satisfies RecordProperty
