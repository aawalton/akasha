import type { Domain } from "../../../domains/domain.page-type.ts"

export const monarch = {
  id: "01a0538f-7c09-7c69-a9d0-d209d9a480db",
  pageTypeSlug: "domain",
  slug: "monarch",
  definition:
    "the outside service that gathers every account Alan holds into one picture of his money",
  partSlugs: [
    "module/monarch-syncing",
    "module/transaction-polling",
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
    "domain/monarch-eval",
    "module/monarch-agree",
    "module/monarch-agreement",
    "module/monarch-amazon-lines",
    "module/monarch-amazon-match",
    "module/monarch-amazon-notes",
    "module/monarch-amazon-order",
    "module/monarch-amazon-pairs",
    "module/monarch-amazon-refund",
    "module/monarch-amazon-refunds",
    "module/monarch-amazon-write",
    "module/monarch-apply",
    "module/monarch-audible-credits",
    "module/monarch-audible-migration",
    "module/monarch-candidate",
    "module/monarch-categorize",
    "module/monarch-categorize-recent",
    "module/monarch-client",
    "module/monarch-credential",
    "module/monarch-domain-files",
    "module/monarch-evidence",
    "module/monarch-files",
    "module/monarch-gmail-cache",
    "module/monarch-history",
    "module/monarch-land-files",
    "module/monarch-merchant-naming",
    "module/monarch-notes-revert",
    "module/monarch-notes-write",
    "module/monarch-poll",
    "module/monarch-propose",
    "module/monarch-provenance",
    "module/monarch-reading",
    "module/monarch-reconcile",
    "module/monarch-report",
    "module/monarch-rule-amounts",
    "module/monarch-rule-clauses",
    "module/monarch-rule-dates",
    "module/monarch-rule-describe",
    "module/monarch-rule-documents",
    "module/monarch-rule-pages",
    "module/monarch-rules",
    "module/monarch-seat",
    "module/monarch-shape",
    "module/monarch-sync",
    "module/monarch-transaction",
    "module/monarch-transaction-create",
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

    { invariantKind: "absence", statement: "Monarch's own rules engine is never written to." },
    {
      invariantKind: "departure",
      statement:
        "Category rules run outside Monarch, and only a single transaction update is posted back.",
    },
    {
      invariantKind: "departure",
      statement:
        "Category rules run without asking on that sync, over a window narrower than the copy's.",
    },
    {
      invariantKind: "departure",
      statement: "Transactions are checked every minute, and only changed rows move.",
    },
    {
      invariantKind: "departure",
      statement: "Only the daily full run speaks for rows older than the trusted period.",
    },
    { invariantKind: "departure", statement: "Every monarch page is in a file." },
    {
      invariantKind: "departure",
      statement: "What a schedule writes is in memory; what names it is in the instructions.",
    },
    {
      invariantKind: "departure",
      statement:
        "A monarch page holds the fields its readers name rather than a copy of Monarch's reply.",
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
