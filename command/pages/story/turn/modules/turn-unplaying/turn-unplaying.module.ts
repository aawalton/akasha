import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnUnplaying = {
  id: "01a18308-b096-7e31-96c3-630deba90f7b",
  type: "page-type/module",
  slug: "turn-unplaying",
  definition: "what a played turn's own beats wrote onto pages, taken back",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Taking a turn back undoes what its beats state they changed, and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page another turn or a builder changed while the turn was made keeps that change.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn at player has written every beat, and a turn at beats only its shown beats.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number goes back to the value the turn's first change on it started from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is no longer what the turn left it is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character the turn's scenes moved goes back to where the beats before it left them.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A character no beat before the turn placed goes back to the place its page held then.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A character no longer where the turn left them is refused and named.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A knower the turn's memory taught is taken off its fact.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact the turn's memory established is taken off its lore page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A fact or knower the lore held before the turn, or an earlier beat taught, stays.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every change one page takes lands in one write of that page.",
    },
  ],
  createdAt: "2026-10-28T15:02:27.222Z",
  updatedAt: "2026-10-28T15:02:27.222Z",
} as const satisfies Module
