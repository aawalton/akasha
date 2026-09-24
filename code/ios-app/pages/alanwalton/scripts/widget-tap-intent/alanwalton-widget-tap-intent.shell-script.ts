import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonWidgetTapIntent = {
  id: "01a0d513-cd14-7298-b842-9cece0f76c1e",
  type: "page-type/shell-script",
  slug: "alanwalton-widget-tap-intent",
  definition: "the Swift of the intent a tap on a widget runs in the app",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/constraint",
      statement: "iOS runs no intent that opens the app inside a widget extension.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The intent a widget's button runs is run in the app, once for every tap.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tap's id is made as the intent runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The widget's link is handed on naming the tap, as a link the app is opened by is.",
    },
  ],
} as const satisfies ShellScript
