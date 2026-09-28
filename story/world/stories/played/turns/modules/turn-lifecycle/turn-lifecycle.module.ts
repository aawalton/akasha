import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const turnLifecycle = {
  id: "01a0dec2-87a0-7072-b427-5155e34684b0",
  type: "page-type/module",
  slug: "turn-lifecycle",
  definition: "how a played turn moves from one status to the next",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "Only the seat whose role the turn's status names advances the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An advance hands in what its own step makes and nothing else.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A world builder's advance names only lore pages, a place being one.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game master's advance goes to writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's advance goes to reviewers while any story reviewer has not run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's advance on a reviewed turn goes to recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The reviewer completing the set moves the turn on.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer finds issues in goes to game-master.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn the last reviewer finds no issue in goes to recorders.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "A reviewed turn with no prose yet goes to writer rather than recorders.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A move to recorders goes to player where no story recorder is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's and a recorder's seats are stopped once each advances.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The writer's seat outlives its advance, as the game master's does.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The recorder completing the set moves the turn to player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The move to player from recorders lands every recorder's kept edits with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn is made only once the turn before it reaches player.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn's slug is the one before it with its last number one higher, as padded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice of a turn names its path and its status, and nothing of its content.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A refusal names a beat or an issue by its place, and never quotes it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A notice also names each lore page its seat read that has changed since, by path alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice names no lore page withheld from its seat.",
    },
  ],
} as const satisfies Module
