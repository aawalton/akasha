import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const deployFileClosure = {
  id: "01a09196-9c2c-732f-bd4f-d1f618fae23a",
  type: "module",
  slug: "deploy-file-closure",
  definition: "the files the artifact a deploy puts up could be built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A deploy is built from the files it is seeded with and every file those reach.",
    },
    {
      invariantKind: "departure",
      statement: "Every kind is seeded with the tracked files under the folder its page sits in.",
    },
    {
      invariantKind: "departure",
      statement: "A web app is seeded as well with the folder its page names as its source.",
    },
    {
      invariantKind: "departure",
      statement:
        "A web app is seeded as well with its cluster service, its manifest and that manifest's code.",
    },
    {
      invariantKind: "departure",
      statement: "An ios app is seeded as well with the files every ios app build shares.",
    },
    {
      invariantKind: "departure",
      statement: "A page a kind's own reader refuses is seeded with the files beside it alone.",
    },
    {
      invariantKind: "departure",
      statement: "A file is reached by following the imports of the code rather than a manifest.",
    },
    {
      invariantKind: "departure",
      statement: "A file reached through another file reached is reached.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier is read through the manifests the tracked files carry.",
    },
    {
      invariantKind: "departure",
      statement: "A path the imports reach that git does not track is reached by nothing.",
    },
    {
      invariantKind: "departure",
      statement: "A body that is no TypeScript is read for no import.",
    },
    {
      invariantKind: "departure",
      statement: "The files are read out of the commit being put up rather than off the worktree.",
    },
    {
      invariantKind: "departure",
      statement: "Which files git tracks is read out of that commit's tree.",
    },
    {
      invariantKind: "gap",
      statement: "The paths a container recipe copies out of its context are seeded here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a deploy does with the files it is built from.",
    },
  ],
} as const satisfies Module
