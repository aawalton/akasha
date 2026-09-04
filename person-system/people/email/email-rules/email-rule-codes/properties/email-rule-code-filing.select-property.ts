import type { SelectProperty } from "@akasha/pages-system/select-property"

export const emailRuleCodeFiling = {
  id: "01a06860-549f-7088-a74f-de255a1b5b39",
  pageTypeSlug: "select-property",
  slug: "email-rule-code-filing",
  propertySlug: "filing",
  definition: "whether a piece of mail the rule matches leaves the inbox",
  values: ["archive", "skip"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "Archiving and skipping exclude each other, so a rule states one of them.",
    },
    {
      invariantKind: "departure",
      statement: "Skipping is doing nothing to the mail rather than leaving the filing unstated.",
    },
  ],
} as const satisfies SelectProperty

export type EmailRuleCodeFiling = (typeof emailRuleCodeFiling.values)[number]
