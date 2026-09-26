import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const playedShell = {
  id: "01a0a164-5a91-7e83-b7f5-92c604ad817e",
  type: "page-type/module",
  slug: "played-shell",
  definition: "the display a story played draws over its own play, with the panels it names",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The run drawn is the story's played turns, or its chapters where it has no turn.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The rows drawn are the rows naming this story and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Nothing is drawn until the rows of the story have arrived.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A row of the run is drawn once the read for its prose has answered.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story with no turn and no chapter of its own draws its title alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The title and its menu span the same width and edges as the run and its panels.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game that went unread is said so above the run rather than passed over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels sit in a drawer on a narrow screen and beside the run on a wide one.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming a coordinator agent has an action bar drawn under the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A game naming no coordinator agent has no action bar.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A turn arrives as the store pushes the story's turns and its game's turns and entities.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Where a panel is drawn is the place that panel's own page names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no panel for the run draws its prose plainly.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The state drawn is what the story's character player's own pages hold.",
    },
    {
      decisionKind: "decision-kind/stopgap",
      statement: "What those pages do not hold is drawn from its game's turn and entity pages.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The panels drawn are the panels the story played names, not its game.",
    },
  ],
} as const satisfies Module
