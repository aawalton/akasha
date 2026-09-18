import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const checkModel = {
  id: "01a05911-aa15-776e-9726-ed4131cd6b51",
  type: "page-type/page-type",
  slug: "check-model",
  definition: "a check judging a change by putting prompts to a model",
  parts: [
    "number-property/audit-runs",
    "number-property/change-runs",
    "relation-property/model-tests",
  ],
  extends: ["page-type/domain"],
  properties: [
    {
      pageProperty: "relation-property/model-tests",
      required: true,
      many: true,
      maxCount: null,
    },
    { pageProperty: "number-property/change-runs", required: true, many: false },
    { pageProperty: "number-property/audit-runs", required: true, many: false },
    { pageProperty: "boolean-property/experimental", required: false, many: false },
  ],
  loadedBy: "module/model-running",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "One positive among the runs is a positive.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two runs of one prompt over one input answer differently.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count of no runs is a check that exists and does not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An audit is asked for a count rather than given a count.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A model check spends a call for each run over each thing whose answer is still `no`.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A refusal says a positive the writer does not think true is brought to Alan rather than argued with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which pages a test judges is stated in its code rather than in its prompt.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A check refuses only where a model answered the check.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A model check states no phase.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
