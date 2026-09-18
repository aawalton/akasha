import type { CheckModel } from "akasha/check/model/check-model.page-type.types.ts"

export const decisionEarnsItsPlace = {
  id: "01a05a0b-3a49-7d40-9dae-f16b21c7ffe2",
  type: "page-type/check-model",
  slug: "decision-earns-its-place",
  definition: "whether a departure a change writes earns its place",
  modelTests: ["model-test/restatement"],
  changeRuns: 0,
  auditRuns: 0,
  experimental: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A statement a change writes or alters is judged rather than every statement the page has.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page whose definition a change alters has every departure on that page judged again.",
    },
  ],
} as const satisfies CheckModel
