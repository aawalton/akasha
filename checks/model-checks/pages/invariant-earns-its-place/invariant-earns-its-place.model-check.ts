import type { ModelCheck } from "../../model-check.page-type.ts"

export const invariantEarnsItsPlace = {
  id: "01a05a0b-3a49-7d40-9dae-f16b21c7ffe2",
  pageTypeSlug: "model-check",
  slug: "invariant-earns-its-place",
  definition: "whether a departure a change writes earns its place",
  modelTestSlugs: ["model-test/restatement"],
  patchRuns: 0,
  auditRuns: 0,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement a change writes or alters is judged rather than every statement the page holds.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose definition a change alters has every departure on that page judged again.",
    },
    {
      invariantKind: "gap",
      statement: "A test stands here for each way a departure fails.",
    },
  ],
} as const satisfies ModelCheck
