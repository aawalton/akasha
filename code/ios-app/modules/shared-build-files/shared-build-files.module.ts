import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const sharedBuildFiles = {
  id: "01a08d67-2fb9-78c4-b9ea-4808b713a611",
  type: "page-type/module",
  slug: "shared-build-files",
  definition: "the files of the pages every iOS app build compiles",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The shell scripts every build shares are the shell-script pages the ios-app page type names.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Every build shares every ios-component page and every ios-program page.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A page hands the build the files that page's properties carry.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "A page's own TypeScript file is handed to no build.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A script the ios-app page type names and no page carries is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A file is named from the repository root.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The pages and files are read from the pages a caller hands in, a commit's or a checkout's.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches a machine.",
    },
  ],
} as const satisfies Module
