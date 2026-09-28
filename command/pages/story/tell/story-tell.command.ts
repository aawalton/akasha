import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyTell = {
  id: "01a0def0-8330-79a7-a268-bf9d923a71cc",
  type: "page-type/command",
  slug: "story-tell",
  definition: "the command making the game master, and any characters named, know one fact of lore",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The page named is a lore page or a place, and the fact is named word for word.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The game master is made a knower of the fact in the same write as any character.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call naming no character tells the fact to the game master alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact among the page's secrets leaves the secrets for the page's facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A secret longer than a fact may run is refused rather than told, and is reworded first.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page whose last secret is told keeps no secrets file.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A telling rewrites the page's body in place, and every file beside it remains.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact already told gains the knowers it lacks, and loses none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A call adding no knower is refused rather than landing nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A knower naming no page is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call keeps its edit beside the calling agent and commits nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call reads the page as the calling agent's kept edits leave it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Two drafting calls on one page keep both facts told.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A telling writes the page as the formatter lays it out, so a later draft finds it so.",
    },
  ],
  name: "tell",
  arguments: [
    { argument: "argument/page", required: true },
    { argument: "argument/fact", required: true },
    { argument: "argument/knower", repeats: true },
    { argument: "argument/draft" },
  ],
} as const satisfies Command
