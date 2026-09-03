import type { Domain } from "../domain-system/domains/domain.page-type.ts"

export const codeAuditAstUnused = {
  id: "01a0675b-16da-7bfd-8434-ddca9c15459f",
  pageTypeSlug: "domain",
  slug: "code-audit-ast-unused",
  definition:
    "the audit reading the code repository against what the instructions repository reaches into it",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The curation is a root file naming its parts, one per package family.",
    },
    {
      invariantKind: "departure",
      statement: "The curation is read by merging the root with each part the root names.",
    },
    {
      invariantKind: "departure",
      statement: "A part the tree does not hold refuses the read rather than being skipped.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace the curation does not name takes default entry globs, not none.",
    },
    {
      invariantKind: "departure",
      statement: "Reachability is computed from what the curation names as entry globs.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the entry globs moves what reads as reached.",
    },
  ],
} as const satisfies Domain
