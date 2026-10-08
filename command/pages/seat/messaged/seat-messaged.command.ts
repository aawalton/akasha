import type { Command } from "akasha/command/command.page-type.types.ts"

export const seatMessaged = {
  id: "01a0780e-7f14-71fd-ac09-b12de342c207",
  type: "page-type/command",
  slug: "seat-messaged",
  definition: "the command counting a message Alan wrote to the persona at a seat",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The moment kept is the moment of the run rather than a moment the caller states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The values are kept beside the persona's page and the day's page rather than committed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A hundred messages is one point.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The persona marked is the persona the named seat states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A name that is no seat is refused rather than kept against nobody.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run states the persona the named seat states and the moment of the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run raises that persona's count on today's day by one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run keeps her points for today from the count that day now carries.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A day with no page filed under it earns no point and changes nothing of the mark.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run keeps the last-messaged mark only at a seat the Agents panel draws under the personas.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run at a handler's seat or a story's seat leaves the mark as it was and says so.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat's section is read by the seat section module, as the editor reads it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run raises the count and keeps the points whatever section the seat is under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat with no persona is refused in the same words as a name that is no seat.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reads the seat's work.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A run marks no persona but the named seat's persona.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A run that stopped part way is refused naming each mark it kept before it stopped.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run that stopped before it kept a mark is refused as the fault alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fault carries the code that fault names and says where it was thrown.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat index that would not read is refused here rather than left unanswered.",
    },
  ],
  name: "messaged",
  arguments: [{ argument: "argument/seat", required: true, saidAs: "word" }],
  updatedAt: "2026-10-08T14:57:21.534Z",
} as const satisfies Command
