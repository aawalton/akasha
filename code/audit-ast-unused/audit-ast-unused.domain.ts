import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const auditAstUnused = {
  id: "01a0675b-16da-7bfd-8434-ddca9c15459f",
  type: "page-type/domain",
  slug: "audit-ast-unused",
  definition: "how code no program uses is found",
  parts: ["ast-unused-config/every-workspace", "page-type/ast-unused-config"],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The curation is one root file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tree is one workspace, so the curation names no part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workspace the curation does not name takes the default entry globs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Reachability is computed from the entry globs the curation names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A change to the entry globs moves the files that read as reached.",
    },
  ],
} as const satisfies Domain
