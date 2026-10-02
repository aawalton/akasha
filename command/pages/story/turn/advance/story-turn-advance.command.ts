import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTurnAdvance = {
  id: "01a0deca-7611-72a6-9435-385ed7dedb72",
  type: "page-type/command",
  slug: "story-turn-advance",
  definition:
    "the command moving a turn or a written chapter on from its status, with what it made",
  code: "ts",
  test: "ts",
  testFixtures: "ts",
  parts: [
    "module/turn-described",
    "module/turn-handing",
    "module/turn-timing",
    "module/turn-crossed",
  ],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "What a step made lands on the turn in the landing that moves its status.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call handing in two steps' output is refused before anything is read.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An advance holds its turn from reading it to landing, so two advances on one turn go in turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each advance reads the turn as the advance before it landed the turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn moving tells the game's game master, world builder and writer seats of it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving into reviewers starts one fresh seat for each story reviewer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving into writer starts no seat, since its notice reaches the writer.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A turn moving into recorders starts one fresh seat for each story recorder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A recorder's advance moves the edits it drafted beside the turn before it lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every recorder's advance lands the edits that recorder drafted with its own move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No edit waits beside a turn past the advance that moved it there.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every recorder's advance folds its edits to the turn's own page into its move.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An advance that refuses gives the caller back its drafts and leaves the turn as it was.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A reviewer's or a recorder's seat is stopped once its advance lands.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The stop runs apart from the seat, so ending the seat never ends the stop.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A notice or a start that fails after the landing is told, and undoes nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that does not start is told to the game's game master and to Alan.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn moving into player from another status pushes Alan that the turn is ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A push that fails is named in the answer, and fails nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A landed advance ends the phase the turn was at, beside the story's page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter advances as a turn does, and its notices name it a chapter.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter reaching player pushes Alan that the chapter is ready.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A written chapter's writer names the chapter as it hands in the prose.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A named chapter is renamed to its story, its number and its title, keeping its id.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The edits a renaming advance folded or landed are taken from beside the new name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter's phases are timed under its story and number, whatever its title.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A reviewer of a played turn is named the mechanic descriptions the turn made new or changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A played turn reaching its game master names every level or rank the turn before crossed.",
    },
  ],
  name: "advance",
  arguments: [
    { argument: "argument/played-turn" },
    { argument: "argument/written-chapter" },
    { argument: "argument/turn-lore", repeats: true },
    { argument: "argument/beats-file" },
    { argument: "argument/reviewer" },
    { argument: "argument/issues-file" },
    { argument: "argument/prose-file" },
    { argument: "argument/character", repeats: true },
    { argument: "argument/recorder" },
    { argument: "argument/title" },
  ],
} as const satisfies Command
