import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const wwwBuild = {
  id: "01a05cee-e560-7a57-a963-fd6e97427f94",
  type: "module",
  slug: "www-build",
  definition: "the www bundle built at a named commit in a detached worktree",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The build happens in a detached worktree under the home directory.",
    },
    {
      invariantKind: "departure",
      statement: "A build directory that is not a worktree of this repo is deleted and made again.",
    },
    {
      invariantKind: "departure",
      statement: "The ref built is `origin/main` where no ref is named.",
    },
    {
      invariantKind: "departure",
      statement:
        "The workstation's web env file is copied into the build worktree where that file exists.",
    },
    {
      invariantKind: "departure",
      statement: "The staged `www/` lands in the shell's own checkout rather than in the worktree.",
    },
    {
      invariantKind: "departure",
      statement:
        "Each thing this deletes, adds, installs or stages is named into the list handed in.",
    },
    {
      invariantKind: "departure",
      statement: "A build directory deleted is named before the worktree replacing it is added.",
    },
  ],
} as const satisfies Module
