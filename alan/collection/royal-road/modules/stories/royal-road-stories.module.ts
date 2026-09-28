import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const royalRoadStories = {
  id: "01a0e98e-6a22-7780-b98d-486a37054265",
  type: "page-type/module",
  slug: "royal-road-stories",
  definition: "the story pages the Royal Road sync reads, restates and makes",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story is synced by the royal road id the story states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That id is read off the story's record of royal road.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no such record is left as it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An empty answer about the stories refuses the run.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story whose fiction is on Alan's follow list states it is following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story whose fiction is not on that list states it is not following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story stating no following already reads as not following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A story's status is restated only where royal road says ongoing or completed or hiatus.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story made here is named by the slug royal road gives its fiction.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story made here states its title, author, tags and status as royal road does.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story made here holds the description royal road gives as its text.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story made here states it is following.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story made here is under the world of the same name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That world is made where no world has that name.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A slug a story page already holds makes no story.",
    },
  ],
} as const satisfies Module
