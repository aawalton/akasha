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
      statement: "The story's chapters, turns and character are asked for by the story's address.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The story is the page its drawing was handed rather than a page read here again.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "No row is asked for before the story's address is known.",
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
      statement:
        "The in-game time the latest turn at player ends at is drawn first beside the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The appointments still to come with the story's character are listed under it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story with an in-game time or an appointment to come has the panels beside the run drawn.",
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
      statement: "A turn arrives as the store pushes the story's turns.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Only a turn at player reaches the run, the sheet and the turns the bar counts.",
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
      decisionKind: "decision-kind/departure",
      statement:
        "The panels are handed the story's character player, whether or not a turn is open.",
    },

    {
      decisionKind: "decision-kind/departure",
      statement: "The panels drawn are the panels the story played names, not its game.",
    },
  ],
} as const satisfies Module
