import type { Domain } from "../../domains/domain.page-type.types.ts"

export const auditAstUnused = {
  id: "01a0675b-16da-7bfd-8434-ddca9c15459f",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "audit-ast-unused",
  definition:
    "the audit reading the code repository against what the instructions repository reaches into it",
  parts: ["page-type/ast-unused-config", "ast-unused-config/every-workspace"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The curation is a root file naming its parts.",
    },
    {
      invariantKind: "departure",
      statement: "The root names a part for each package family.",
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
      statement: "A workspace the curation does not name takes the default entry globs.",
    },
    {
      invariantKind: "departure",
      statement: "Reachability is computed from the entry globs the curation names.",
    },
    {
      invariantKind: "departure",
      statement: "A change to the entry globs moves the files that read as reached.",
    },
  ],
} as const satisfies Domain
