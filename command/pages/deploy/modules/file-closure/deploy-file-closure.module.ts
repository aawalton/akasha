import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const deployFileClosure = {
  id: "01a09196-9c2c-732f-bd4f-d1f618fae23a",
  type: "module",
  slug: "deploy-file-closure",
  definition: "the files the artifact a deploy puts up could be built from",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "A deploy is built from the files it is seeded with and every file those reach.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Every kind is seeded with the tracked files under the folder its page sits in.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A web app is seeded as well with the folder its page names as its source.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "A web app is seeded as well with its cluster service, its manifest and that manifest's code.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "An ios app is seeded as well with the files every ios app build shares.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A workstation service is seeded as well with the code its unit's command runs.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page a kind's own reader refuses is seeded with the files beside it alone.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file is reached by asking the graph what that file reaches.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file reached through another file reached is reached.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A path the imports reach that git does not track is reached by nothing.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A seed is reached whether or not git tracks that seed.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "The files are read out of the commit being put up rather than off the worktree.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "Which files git tracks is read out of that commit's tree.",
    },
    {
      invariantKind: "invariant-kind/gap",
      statement: "The paths a container recipe copies out of its context are seeded here.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "Nothing here says what a deploy does with the files it is built from.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "One reading of a commit builds every closure asked of it, reading each body once.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement:
        "Every tracked file in a folder a deploy is built from is carried with that deploy.",
    },
  ],
} as const satisfies Module
