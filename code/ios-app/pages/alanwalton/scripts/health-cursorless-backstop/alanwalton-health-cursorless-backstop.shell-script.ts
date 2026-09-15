import type { ShellScript } from "akasha/code/shell-script/shell-script.page-type.types.ts"

export const alanwaltonHealthCursorlessBackstop = {
  id: "01a0595b-ef58-7361-88ab-99ceef2aceec",
  type: "page-type/shell-script",
  slug: "alanwalton-health-cursorless-backstop",
  definition: "the Swift reading a window of samples when no anchor is held",
  shell: "sh",
  sourced: true,
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The backstop is a second reading.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The backstop reads with no cursor and persists nothing at all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A second anchored read would inherit the very fault the backstop exists to catch.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two readings part a quiet window from a read the app is not allowed to make.",
    },
  ],
} as const satisfies ShellScript
