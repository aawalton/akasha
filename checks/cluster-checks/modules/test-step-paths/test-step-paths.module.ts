import type { Module } from "@akasha/code-system/module"

export const testStepPaths = {
  id: "01a06880-1000-7000-9000-000000000002",
  pageTypeSlug: "module",
  slug: "test-step-paths",
  definition: "the test files a run holds, sorted by kind and by the workspace that bears them",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A test file's kind is read from the name it ends with.",
    },
    {
      invariantKind: "departure",
      statement: "A file ending in no known kind is in no bucket.",
    },
    {
      invariantKind: "departure",
      statement: "A kind holding no file composes no step.",
    },
    {
      invariantKind: "departure",
      statement: "A step names the workspaces bearing its files rather than the files.",
    },
    {
      invariantKind: "departure",
      statement: "A workspace bearing a test but carrying no name bears no step.",
    },
    {
      invariantKind: "departure",
      statement: "The deepest workspace root a test file stands under is the one that bears it.",
    },
    {
      invariantKind: "departure",
      statement: "A step dispatches on every package in the closure of a bearing workspace.",
    },
    {
      invariantKind: "departure",
      statement: "Every step also dispatches on the shared configuration files.",
    },
  ],
} as const satisfies Module
