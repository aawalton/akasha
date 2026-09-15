import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const checkModel = {
  id: "01a05911-aa15-776e-9726-ed4131cd6b51",
  type: "page-type/page-type",
  slug: "check-model",
  definition: "a check judging a change by putting prompts to a model",
  parts: [
    "check-model/decision-earns-its-place",
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
  ],
  loadedBy: "module/model-running",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "One positive among the runs is a positive.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Two runs of one prompt over one input answer differently.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A count of no runs is a check that exists and does not run.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An audit is asked for a count rather than given a count.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A model check spends a call for each run over each thing whose answer is still `no`.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A refusal says a positive the writer does not think true is brought to Alan rather than argued with.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which pages a test judges is stated in its code rather than in its prompt.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A check refuses only where a model answered the check.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "A model check states no phase.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
