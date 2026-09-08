import type { Module } from "../modules/module.page-type.ts"

export const testBodies = {
  id: "01a08093-d0fd-7000-b952-6be67a9d255b",
  pageTypeSlug: "module",
  slug: "test-bodies",
  definition:
    "serving a change's bodies to a test run in place of the bodies those paths hold on disk",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A path the change carries is loaded from the body the change hands over.",
    },
    {
      invariantKind: "departure",
      statement: "A path the change carries resolves whether or not a file is there.",
    },
    {
      invariantKind: "departure",
      statement: "A body served is loaded under the path the change files that body at.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a served body is read against the folder of that path.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a served body reaching no served path is left to the runner.",
    },
    {
      invariantKind: "departure",
      statement: "An import reaching a path the change takes away is refused.",
    },
    {
      invariantKind: "departure",
      statement: "The form a body is read as follows the extension its path carries.",
    },
    {
      invariantKind: "departure",
      statement: "A body under an extension named by nothing here is read as text.",
    },
    {
      invariantKind: "departure",
      statement: "The bodies are read back out of one file of JSON.",
    },
    {
      invariantKind: "departure",
      statement: "The preload text names this module and the file the bodies were written to.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reads a body off the working tree.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here spawns a runner.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here writes a file.",
    },
  ],
} as const satisfies Module
