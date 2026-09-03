import type { Domain } from "../../../domain-system/domains/domain.page-type.ts"

export const monarch = {
  id: "01a0538f-7c09-7c69-a9d0-d209d9a480db",
  pageTypeSlug: "domain",
  slug: "monarch",
  definition:
    "the outside service that gathers every account Alan holds into one picture of his money",
  partSlugs: [
    "page-type/category-rule",
    "page-type/category-rule-agent",
    "page-type/category-rule-code",
    "page-type/monarch-account",
    "page-type/monarch-category",
    "page-type/monarch-direction",
    "page-type/monarch-holding",
    "page-type/monarch-merchant",
    "page-type/monarch-month",
    "page-type/monarch-record",
    "page-type/monarch-tag",
    "readout/monarch-unreviewed-transactions",
    "module/monarch-reading",
    "workstation-service/monarch-reading-service",
    "workstation-service/monarch-relay-service",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The categorization ring reads Monarch directly on Alan's own signed-in browser cookie.",
    },
    {
      invariantKind: "constraint",
      statement: "A Monarch session cookie comes only from Alan at a signed-in browser.",
    },
    {
      invariantKind: "departure",
      statement:
        "The reading is taken by a workstation timer rather than by a pod serving a route.",
    },
    {
      invariantKind: "departure",
      statement: "The cookie stands only on the workstation that takes the reading.",
    },
    {
      invariantKind: "departure",
      statement: "Every site showing the reading is carried it rather than taking one.",
    },
    {
      invariantKind: "departure",
      statement: "A carry that fails to one site does not stop the carry to another site.",
    },
    {
      invariantKind: "departure",
      statement: "Every tile drawing the reading shows the count Alan's workstation last took.",
    },
  ],
  directives: [
    {
      directiveKind: "principle",
      name: "Doubt Goes To A Person",
      act: "Leave a category to a person unless something settles it beyond doubt.",
      warrant:
        "A wrong category is never looked at again, while a needless question is answered once.",
      aids: [
        "Where you are nearly sure, ask rather than write.",
        "Apply a rule only where all its conditions hold.",
      ],
    },
  ],
} as const satisfies Domain
