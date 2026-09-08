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
      invariantKind: "constraint",
      statement: "A bare specifier is resolved by the runner rather than by anything here.",
    },
    {
      invariantKind: "departure",
      statement: "A body the change moves is served at the path the runner still resolves to.",
    },
    {
      invariantKind: "departure",
      statement: "An import inside a moved body is spelled against the folder it moves to.",
    },
    {
      invariantKind: "departure",
      statement:
        "A specifier the change's manifest brings is spelled back to the one the runner resolves.",
    },
    {
      invariantKind: "departure",
      statement: "One way in going and one arriving is a move; more than one is left alone.",
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
      statement:
        "A body under a form the runner will not load is served as JavaScript answering that body's text.",
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
      invariantKind: "departure",
      statement: "A serving writes the bodies and the preload under one folder of its own.",
    },
    {
      invariantKind: "departure",
      statement: "That folder sits under `/var/tmp` rather than `/tmp`.",
    },
    {
      invariantKind: "departure",
      statement: "A serving is swept by the caller that asked for the serving.",
    },
    {
      invariantKind: "departure",
      statement: "A serving that could not be made is swept and reaches no caller.",
    },
    {
      invariantKind: "departure",
      statement: "A body handed in that would not be read names the path it was handed in for.",
    },
    {
      invariantKind: "departure",
      statement: "A test file the change brings and no file is there for is given a shim to run.",
    },
    {
      invariantKind: "departure",
      statement: "A shim imports that test file by the path the change files it at.",
    },
    {
      invariantKind: "departure",
      statement: "A test file already on disk is named to the runner by its own path.",
    },
    {
      invariantKind: "departure",
      statement: "A body served over a file that is there is loaded at that file's own path.",
    },
    {
      invariantKind: "departure",
      statement: "A body loaded at a file's own path answers `import.meta` as that file.",
    },
  ],
} as const satisfies Module
