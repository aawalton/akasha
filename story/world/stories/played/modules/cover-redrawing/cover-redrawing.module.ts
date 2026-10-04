import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const coverRedrawing = {
  id: "01a1060a-a302-7f33-a06f-8650c2870c98",
  type: "page-type/module",
  slug: "cover-redrawing",
  definition: "a story picture made again the way it was first made, at a new seed",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A rendered picture is rendered again from its recorded prompt, by the one story model.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Recorded steps and guidance are kept only where that model drew the picture.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A render is made at 832 by 1216, the one portrait size every story picture takes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An edited picture is edited again from its recorded input, by the edit the edit command runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Where that input is gone, the character a beat names as the picture's subject lends its cover.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An edit with no input to be had is refused rather than rendered from words.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A picture made again takes a new seed, since the old seed makes the same picture.",
    },
  ],
} as const satisfies Module
