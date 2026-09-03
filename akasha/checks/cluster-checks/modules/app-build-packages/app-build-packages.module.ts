import type { Module } from "@akasha/code-system/module"

export const appBuildPackages = {
  id: "01a06880-1000-7000-9000-000000000007",
  pageTypeSlug: "module",
  slug: "app-build-packages",
  definition: "the workspaces an app-build step is composed for",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A workspace declaring no build script is built by no step.",
    },
    {
      invariantKind: "departure",
      statement: "The workspaces are answered in path order.",
    },
    {
      invariantKind: "departure",
      statement:
        "A selection holding nothing is refused rather than answered, because a branch would then go green one bundler pass shorter.",
    },
    {
      invariantKind: "departure",
      statement: "A step's name is the workspace's path with its separators flattened.",
    },
  ],
} as const satisfies Module
