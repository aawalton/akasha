import type { ShellScript } from "akasha/code-system/shell-scripts/shell-script.page-type.types.ts"

export const alanwaltonHealthCursorlessBackstop = {
  id: "01a0595b-ef58-7361-88ab-99ceef2aceec",
  pageTypeSlug: "shell-script",
  type: "shell-script",
  slug: "alanwalton-health-cursorless-backstop",
  definition: "the Swift reading a window of samples when no anchor is held",
  shell: "sh",
  sourced: true,
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The backstop is a second reading, the drain's cursor having been wrong once already.",
    },
    {
      invariantKind: "departure",
      statement: "The backstop reads with no cursor and persists nothing at all.",
    },
    {
      invariantKind: "departure",
      statement:
        "A second anchored read would inherit the very fault the backstop exists to catch.",
    },
    {
      invariantKind: "departure",
      statement: "Two readings part a quiet window from a read the app is not allowed to make.",
    },
  ],
} as const satisfies ShellScript
