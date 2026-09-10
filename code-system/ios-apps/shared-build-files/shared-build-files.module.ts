import type { Module } from "../../modules/module.page-type.types.ts"

export const sharedBuildFiles = {
  id: "01a08d67-2fb9-78c4-b9ea-4808b713a611",
  pageTypeSlug: "module",
  type: "module",
  slug: "shared-build-files",
  definition: "the files of the pages every iOS app build compiles",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement:
        "The shell scripts every build shares are the shell-script pages the ios-app page type names.",
    },
    {
      invariantKind: "departure",
      statement: "Every build shares every ios-component page and every ios-program page.",
    },
    {
      invariantKind: "departure",
      statement: "A page hands the build the files that page's properties carry.",
    },
    {
      invariantKind: "absence",
      statement: "A page's own TypeScript file is handed to no build.",
    },
    {
      invariantKind: "departure",
      statement: "A script the ios-app page type names and no page carries is refused.",
    },
    {
      invariantKind: "departure",
      statement: "A file is named from the repository root.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches a machine.",
    },
  ],
} as const satisfies Module
