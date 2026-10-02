import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const portraitRedrawing = {
  id: "01a0fd85-c8f1-7dda-aae8-0ec2ff4ea1f9",
  type: "page-type/module",
  slug: "portrait-redrawing",
  definition: "a story picture of a landscape size drawn again at the one portrait size",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story picture whose image page records a landscape size is drawn again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture is drawn again from the prompt, model and seed its image page records, at 832 by 1216.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Turns go first, newest first, then played chapters, then written chapters.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every page naming the old picture names the new one, and the old one is graded F, in one commit.",
    },
    {
      decisionKind: "decision-kind/constraint",
      statement:
        "A picture is drawn again only after two quiet ticks running: an empty queue and a card under 15%.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One picture is drawn again at a time, on the reroll lane, so new pictures and rerolls go first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A picture refused once is passed over until the service starts again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Once no landscape picture is left, nothing more is looked for until the service starts again.",
    },
  ],
} as const satisfies Module
