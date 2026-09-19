import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonLiveActivity = {
  id: "01a0ba68-97db-73c8-8a86-d51eb0da597b",
  type: "page-type/shell-script",
  slug: "alanwalton-live-activity",
  definition: "the Swift starting, updating and ending the stoplights live activity",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity is started asking Apple for a token to push it at.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every token the activity names is handed to the web layer as it arrives.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An activity still running when the app starts again is watched for a token.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "One activity is watched once, however many times a start reaches it.",
    },
  ],
} as const satisfies ShellScript
