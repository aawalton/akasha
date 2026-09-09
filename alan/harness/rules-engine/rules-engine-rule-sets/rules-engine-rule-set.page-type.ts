import type { PageType } from "@akasha/pages/page-type"

export const rulesEngineRuleSet = {
  id: "01a06838-7a9e-7718-bfdd-784885fe5f76",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "rules-engine-rule-set",
  definition: "one set of rules, run and proven together",
  pluralSlug: "rules-engine-rule-sets",
  extends: ["page-type/page-type"],
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule set declares a shape of its own.",
    },
    {
      invariantKind: "departure",
      statement: "No two rule sets share a shape.",
    },
    {
      invariantKind: "departure",
      statement: "The pages a rule set applies to are its own.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing crosses between two rule sets.",
    },
    {
      invariantKind: "departure",
      statement: "A rule set is proven a partition on its own rather than inside a larger set.",
    },
    {
      invariantKind: "gap",
      statement: "The page type a rule set applies to is a property of this page type.",
    },
    {
      invariantKind: "gap",
      statement: "The paths a rule set's rules sit at are a property of this page type.",
    },
  ],
} as const satisfies PageType
