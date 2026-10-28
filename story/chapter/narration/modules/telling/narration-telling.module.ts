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
      statement: "A chapter started at its beginning has its title said first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's title is followed by the pause a heading leaves.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter resumed part way starts at its prose, with no title said.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is said with the pronunciations of its story's world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is said with every pronunciation naming no world as well.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's skill windows are said with the ability kinds of its story's world.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A chapter's windows are said knowing its world's abilities, their slots and their tiers.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Pronunciations are asked for on each narration, so a pronunciation changed needs no deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A sentence's character is counted in the text handed on, markup and all.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter starts at the segment holding its read progress.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter not begun or read through starts at its beginning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A segment's word start reaches the speech workload in the chapter's own length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Each later sentence of a segment reaches the speech workload with its character and its word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A sentence's word is its share of the words between its segment and the next one.",
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
  updatedAt: "2026-10-28T15:05:41.633Z",
  createdAt: "2026-10-05T20:36:00.748Z",
} as const satisfies Module
