import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyCloneRemove = {
  id: "01a17f3c-ea6c-7210-850f-82ad76e4702e",
  type: "page-type/command",
  slug: "story-clone-remove",
  definition: "the command removing a clone of a played story with every seat the clone started",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A story outside the test world is refused, and nothing is stopped or removed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A story naming no story it was cloned from is refused as no clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A clone's seats are the seats whose assignment is the clone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each seat is stopped as `akasha seat supervisor stop` stops a seat.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seat that refuses to stop leaves every page of the clone where it is.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every committed file under the clone's folder goes in one landing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That landing is the command's own, so no read its caller made can hold it back.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page outside that folder whose `story` is the clone goes with it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Any other page there loses the clone's pages from the knowers of its facts.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A fact the clone added stays, since a fact is the world's, whoever told it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A page naming the clone's pages anywhere but a fact's knowers refuses the removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page outside the test world naming a page of the clone refuses the removal.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page naming a page of the clone among its parts loses that part.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The answer lists each seat, file and part it takes before what it did.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A drafting call lists them and stops, removes and lands nothing.",
    },
  ],
  name: "clone-remove",
  arguments: [
    { argument: "argument/story", required: true },
    { argument: "argument/force" },
    { argument: "argument/draft" },
  ],
  createdAt: "2026-10-27T21:21:01.035Z",
  updatedAt: "2026-10-27T23:24:33.107Z",
} as const satisfies Command
