import type { TypeDeclaration } from "akasha/code/type-declaration/type-declaration.page-type.types.ts"

export const performanceGlobal = {
  id: "01a06c82-21b6-70be-aed0-9bc2e1d7da47",
  type: "page-type/type-declaration",
  slug: "performance-global",
  definition: "the clock giving a compiled program the elapsed time",
  d: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The global declared here is implemented by the compiler's own runtime library.",
    },
  ],
} as const satisfies TypeDeclaration
