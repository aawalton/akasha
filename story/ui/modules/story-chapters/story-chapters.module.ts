import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const storyChapters = {
  id: "01a0de1e-6b9d-7c94-a226-81457bb9e050",
  type: "page-type/module",
  slug: "story-chapters",
  definition: "the chapters of one story, drawn through the view its kind of story embeds",
  code: "tsx",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters drawn are the chapters naming this story and no other.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The chapters are drawn by the view the story's page type embeds.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "That view lists the chapter type matching the kind of story it is.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A story played draws no such listing, since its play screen shows its chapters.",
    },
  ],
} as const satisfies Module
