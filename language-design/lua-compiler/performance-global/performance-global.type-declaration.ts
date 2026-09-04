import type { TypeDeclaration } from "@akasha/code-system/type-declaration"

export const performanceGlobal = {
  id: "01a06c82-21b6-70be-aed0-9bc2e1d7da47",
  pageTypeSlug: "type-declaration",
  slug: "performance-global",
  definition: "the clock a compiled program reads the elapsed time from",
  d: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "What this declares is implemented by the compiler's own runtime library.",
    },
  ],
} as const satisfies TypeDeclaration
