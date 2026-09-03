import type { Module } from "@akasha/code-system/module"

export const rrServerModuleImports = {
  id: "01a06880-1000-7000-9000-000000000004",
  pageTypeSlug: "module",
  slug: "rr-server-module-imports",
  definition: "a server-only module reached from a router app's client bundle",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A router app's own folder is read from its configuration rather than assumed.",
    },
    {
      invariantKind: "departure",
      statement: "A configuration naming no app directory stands for the conventional one.",
    },
    {
      invariantKind: "departure",
      statement: "A module is server-only where its own path says so.",
    },
    {
      invariantKind: "departure",
      statement: "A test file is judged by nothing here.",
    },
    {
      invariantKind: "departure",
      statement: "An import carrying only a type reaches no server module at runtime.",
    },
  ],
} as const satisfies Module
