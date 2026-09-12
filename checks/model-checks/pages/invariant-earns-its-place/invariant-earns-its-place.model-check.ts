import type { ModelCheck } from "akasha/checks/model-checks/model-check.page-type.types.ts"

export const invariantEarnsItsPlace = {
  id: "01a05a0b-3a49-7d40-9dae-f16b21c7ffe2",
  type: "model-check",
  slug: "invariant-earns-its-place",
  definition: "whether a departure a change writes earns its place",
  modelTests: ["model-test/restatement"],
  changeRuns: 0,
  auditRuns: 0,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "A statement a change writes or alters is judged rather than every statement the page has.",
    },
    {
      invariantKind: "departure",
      statement:
        "A page whose definition a change alters has every departure on that page judged again.",
    },
  ],
} as const satisfies ModelCheck
