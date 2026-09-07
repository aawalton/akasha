import type { Module } from "@akasha/code/module"

export const workspaceDeps = {
  id: "01a06880-1000-7000-9000-000000000001",
  pageTypeSlug: "module",
  slug: "workspace-deps",
  definition: "what one workspace declares it depends on, and what it reaches through those",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A dependency and a development dependency are both reached.",
    },
    {
      invariantKind: "departure",
      statement: "A development dependency is told apart from a dependency.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier that is relative or absolute or a node builtin or a bun builtin names no package.",
    },
    {
      invariantKind: "departure",
      statement: "A specifier holding a shell substitution names no package.",
    },
    {
      invariantKind: "departure",
      statement:
        "A scoped specifier names the scope and the first segment after that scope and nothing deeper.",
    },
    {
      invariantKind: "departure",
      statement: "A name that is no lower-case npm name names no package.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace's closure holds the workspace itself.",
    },
    {
      invariantKind: "departure",
      statement:
        "A dependency that is no workspace here ends the walk rather than refusing that walk.",
    },
    {
      invariantKind: "departure",
      statement:
        "A script's command names are read from each subcommand a separator divides that script into.",
    },
    {
      invariantKind: "departure",
      statement: "A leading assignment is stepped over to reach the command name.",
    },
    {
      invariantKind: "departure",
      statement: "A command run through a runner names the runner and the package the runner runs.",
    },
    {
      invariantKind: "departure",
      statement: "A version suffix is taken off a package a runner runs.",
    },
  ],
} as const satisfies Module
