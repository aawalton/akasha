import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const narrationTelling = {
  id: "01a10dc7-ce6c-7342-9c2f-af0d90fb646a",
  type: "page-type/module",
  slug: "narration-telling",
  definition: "a narration opened, carried on and closed on the speech workload",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's title is said first, and its prose follows.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The next chapter is the nearest one after the chapter playing in its story.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter with no position is never the next chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A narration whose story has no next chapter is ended on the speech workload.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter past the segments one narration takes is refused rather than shortened.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the playlist, the chapters, the init section and the pieces pass through.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A piece passes through as it streams, and nothing here holds its bytes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal by the speech workload reaches Alan with the reason it gave.",
    },
  ],
} as const satisfies Module
