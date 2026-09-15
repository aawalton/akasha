import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonHealthIntentPerform = {
  id: "01a0595b-ef59-7b52-84e4-2da173759a5e",
  type: "page-type/shell-script",
  slug: "alanwalton-health-intent-perform",
  definition: "the Swift performing the health-samples intent",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The health store is asked for read access alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The share set is empty.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A share set with anything asks to write Alan's own health data.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The state reset runs unconditionally before the first query of the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reset reached only under a condition leaves the run querying the cursor that reset drops.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run's outcome reaches akasha rather than the phone alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every run reports, including the run that worked.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The notice is posted before the report is sent.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The work a run does is written once and asked for by both its callers.",
    },
  ],
} as const satisfies ShellScript
