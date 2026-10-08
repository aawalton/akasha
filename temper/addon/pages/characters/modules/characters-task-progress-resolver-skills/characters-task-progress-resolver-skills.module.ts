import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const charactersTaskProgressResolverSkills = {
  id: "01a062ee-f099-706f-8191-446ff9807a6f",
  type: "page-type/module",
  slug: "characters-task-progress-resolver-skills",
  definition:
    "how far a character's skill lines have ranked up and how far its skill points have got",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The skill point sources are the skill point pages, written in as the add-on compiles.",
    },
  ],
  createdAt: "2026-09-02T16:23:41.465Z",
  updatedAt: "2026-09-27T02:22:54.000Z",
} as const satisfies Module
