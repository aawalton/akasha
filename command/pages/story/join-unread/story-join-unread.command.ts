import type { Command } from "akasha/command/command.page-type.types.ts"

export const storyJoinUnread = {
  id: "01a0eb0e-4c4f-7211-8fd9-ee922888c35a",
  type: "page-type/command",
  slug: "story-join-unread",
  definition: "the command joining every unread chapter of the wandering inn into one chapter",
  code: "ts",
  test: "ts",
  parts: [],
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter is unread where its own progress falls short of its own length.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter stating no own progress is unread.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters are joined in the order of their positions.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each chapter opens on one line naming its title and the day it was published.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A blank line parts that line from the prose and each chapter from the next.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A chapter holding no stored prose is its heading line alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A limit keeps the earliest unread chapters and passes over the rest.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The joined chapter's own length is the words its whole text holds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Those words are counted by the story engine's own reckoning.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run lands the joined chapter over the one already there rather than beside it.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run takes back the joined chapter's own progress, since its words have moved.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run changing nothing lands nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run finding no unread chapter lands nothing and is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The joined chapter states no position, no link, no day and no own progress.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "No chapter the run joins is changed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The joined chapter sits in the story's everything-unread folder.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A run says how many chapters it joined and how many words they hold.",
    },
  ],
  name: "join-unread",
  arguments: [{ argument: "argument/chapter-limit" }],
} as const satisfies Command
