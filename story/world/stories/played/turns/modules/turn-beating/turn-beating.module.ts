import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnBeating = {
  id: "01a17ee3-24ba-77f1-a6ba-74e695bddc23",
  type: "page-type/module",
  slug: "turn-beating",
  definition: "how one advance hands in one step's part of one beat of a turn at beats",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance at beats names one beat and hands in its own step's part of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The mechanics recorder hands in a beat's numbers, the writer its prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The memory recorder hands in a beat's memory, the picture recorder its pictures.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat other than the one ready for that step is refused, naming the one that is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A part from a seat whose role is not that step's is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An entry naming another beat than the one handed in is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A step handing in nothing for a beat fills that beat with an empty list.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A beat's prose lands on its line, and the turn's prose file holds the prose so far.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The part filling the last step of the last beat moves the turn to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat named while the turn is at another status is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A played turn flows by beats unless it is roleplayed, written already, or holds issues.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A beat's changes reach their pages in the move that shows that beat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The numbers seat refuses a beat by handing in its issues and no changes.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the numbers seat refuses a beat, so a shown beat is never refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master states a refused beat again by handing in the whole beats file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restatement moving a beat before the refused one is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restatement keeps every part of the beats before the refused one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A restatement clears every part of the refused beat and the beats after it.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages hold the values the shown beats left, so numbers are checked from there.",
    },
  ],
  createdAt: "2026-10-27T19:42:57.720Z",
  updatedAt: "2026-10-27T20:47:29.242Z",
} as const satisfies Module
