import type { PageType } from "@akasha/pages-system/page-type"

export const rulesEngineRuleSet = {
  id: "01a06838-7a9e-7718-bfdd-784885fe5f76",
  pageTypeSlug: "page-type",
  slug: "rules-engine-rule-set",
  definition: "one set of rules, run and proven together",
  pluralSlug: "rules-engine-rule-sets",
  extendsSlug: "page-type/page-type",
  properties: [],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A rule set declares a shape of its own, and no two rule sets share one.",
    },
    {
      invariantKind: "departure",
      statement: "The pages a rule set applies to are its own, and nothing crosses between two.",
    },
    {
      invariantKind: "departure",
      statement: "A rule set is proven a partition on its own rather than inside a larger set.",
    },
    {
      invariantKind: "gap",
      statement: "The page type a rule set applies to stands as a property of this page type.",
    },
    {
      invariantKind: "gap",
      statement: "The paths a rule set's rules stand at stand as a property of this page type.",
    },
  ],
} as const satisfies PageType
