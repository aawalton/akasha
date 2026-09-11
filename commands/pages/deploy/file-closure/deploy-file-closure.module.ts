import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

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
      statement: "A deploy is built from the files beside its page and every file those reach.",
    },
    {
      invariantKind: "departure",
      statement:
        "The files beside a page are the tracked files under the folder that page sits in.",
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
      statement: "The files are read off the worktree rather than off the commit being put up.",
    },
    {
      invariantKind: "gap",
      statement: "The files a build of a kind shares with every other build of that kind are here.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a commit.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here says what a deploy does with the files it is built from.",
    },
  ],
} as const satisfies Module
