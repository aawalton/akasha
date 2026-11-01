import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersHudLine = {
  id: "01a19920-1a04-723e-8344-2c1f8141797d",
  type: "page-type/module",
  slug: "characters-hud-line",
  definition: "how a line drawn in the task HUD's style looks",
  code: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A done, urgent, gold, blue or purple line is the design system's green, red, yellow, blue or purple.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A plain line is the game's body text color.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is in the bold font with the thick shadow drawn over play.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A line is indented by four spaces a step.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A count sits at the right edge, parted from the line's text by a gap.",
    },
  ],
  createdAt: "2026-11-01T21:59:40.292Z",
  updatedAt: "2026-11-01T21:59:40.292Z",
} as const satisfies Module
