import type { PageType } from "akasha/page/type/page-type.page-type.types.ts"

export const subagentKind = {
  id: "01a06838-7a9d-7394-97ff-d069ea588410",
  type: "page-type/page-type",
  slug: "subagent-kind",
  definition: "everything a subagent is, apart from the work it is given",
  extends: ["page-type/domain"],
  parts: [
    "file-property/subagent-prompt",
    "subagent-kind/explore",
    "subagent-kind/fork",
    "subagent-kind/general-purpose",
    "text-property/dispatched-as",
    "text-property/model",
  ],
  properties: [
    { pageProperty: "text-property/dispatched-as", required: true, many: false },
    { pageProperty: "file-property/subagent-prompt", required: false, many: false },
    { pageProperty: "text-property/model", required: false, many: false },
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Subagents run from a single kind at the same time.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind's prompt is the whole of the context a subagent of that kind starts with.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind stating no prompt is run as the client ships it rather than composed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A kind's definition is the one thing a seat reads to choose between kinds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The name a seat dispatches a kind by is a property rather than the kind's title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A kind stating no model runs on the model of the seat that dispatched the subagent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A subagent names the kind page its dispatched-as reaches, and its dispatched-as stays text.",
    },
  ],
  types: "ts",
  schema: "jsonl",
} as const satisfies PageType
