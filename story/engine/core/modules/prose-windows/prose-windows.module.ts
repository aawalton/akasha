import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const proseWindows = {
  id: "01a0d44e-912e-72bc-aaf4-6ffcdb4d5a15",
  type: "page-type/module",
  slug: "prose-windows",
  definition: "a turn's prose cut into runs at the system windows written in it",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A window opens on a line of three colons and its kind, and shuts on three colons.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each line inside a window is one field, its name and a colon before its value.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line shuts a window left open, so no line of colons is read as prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A window whose fields draw no card is still cut out of the prose.",
    },
  ],
} as const satisfies Module
