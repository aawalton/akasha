import type { Module } from "../../../../code-system/modules/module.page-type.ts"

export const monarchApply = {
  id: "01a06867-e5ed-7dbd-9dc1-7068e19aad4f",
  pageTypeSlug: "module",
  slug: "monarch-apply",
  definition: "one rule's decision written onto the transaction it decided",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A rule that did not match the transaction is refused, because applying it would record a decision as the rule's that the rule did not make.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reservation names no category to set and is refused, because it is answered by somebody saying what the transaction is.",
    },
    {
      invariantKind: "departure",
      statement:
        "An unpaired decision is refused, because the rule reached no conclusion to apply.",
    },
    {
      invariantKind: "departure",
      statement:
        "An ambiguity is refused rather than guessed between, because Alan ruled these fall through to semantic review.",
    },
    {
      invariantKind: "departure",
      statement: "Both legs of a paired decision are categorized, not only the subject.",
    },
    {
      invariantKind: "departure",
      statement: "What decided is recorded as the rule's own name.",
    },
    {
      invariantKind: "departure",
      statement: "A rule's note is written only onto the subject and only where no note stands.",
    },
  ],
} as const satisfies Module
