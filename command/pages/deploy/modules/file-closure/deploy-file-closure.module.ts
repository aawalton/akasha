import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployFileClosure = {
  id: "01a09196-9c2c-732f-bd4f-d1f618fae23a",
  type: "page-type/module",
  slug: "deploy-file-closure",
  definition: "the files building the artifact a deploy puts up",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "A deploy is built from the files it is seeded with and every file those reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every kind is seeded with the tracked files under the folder its page sits in.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A web app is seeded as well with the folder its page names as its source.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A web app is seeded as well with its cluster service, its manifest and that manifest's code.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "An ios app is seeded as well with the files every ios app build shares.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A workstation service is seeded as well with the code its unit's command runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page a kind's own reader refuses is seeded with the files beside it alone.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is reached by asking the graph what that file reaches.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file reached through another file reached is reached.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A path the imports reach that git does not track is reached by nothing.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A seed is reached whether or not git tracks that seed.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The files are read out of the commit being put up rather than off the worktree.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Which files git tracks is read out of that commit's tree.",
    },
    {
      decisionKind: "decision-kind/gap",
      statement: "The paths a container recipe copies out of its context are seeded here.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here says what a deploy does with the files it is built from.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "One reading of a commit builds every closure asked of it, reading each body once.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "Every tracked file in a folder a deploy is built from is carried with that deploy.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The types written for a page are reached by no addon, and neither is whatever only they reach.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "An addon is built from no file generated beside a page, though every other kind still is.",
    },
  ],
} as const satisfies Module
