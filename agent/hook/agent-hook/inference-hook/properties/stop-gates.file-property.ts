import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const stopGates = {
  id: "01a09b0a-a031-7f2c-928a-bfbf7e56eb21",
  type: "page-type/file-property",
  slug: "stop-gates",
  propertySlug: "stop-gates",
  definition: "the step at the stop of each run of a hook",
  extensions: ["jsonl"],
  generated: true,
  appendOnly: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names where the run stopped rather than what the run judged.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that reached a model and a run that never did are told apart here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A line states how many rules were put to the model, which is none where none was put.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line states how many rules a model answered and how many reached no model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn judged in part is told from one judged whole by the rules left unanswered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Lines are kept outside the commit.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No page states its own lines here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what the model answered.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run that cannot be recorded is not a run that is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line names the seat the run was under, or no seat where the run knew none yet.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
