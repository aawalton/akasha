import type { Module } from "@akasha/code/module"

export const retired = {
  id: "01a07e9b-700e-7d97-853c-db77977e6b42",
  pageTypeSlug: "module",
  slug: "retired",
  definition: "the refusal a retired cluster check makes when it is run",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Running a retired cluster check refuses and exits.",
    },
    {
      invariantKind: "departure",
      statement: "A retired check calls the refusal under `import.meta.main`.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal is a call rather than an import side effect.",
    },
    {
      invariantKind: "departure",
      statement: "Seventeen retired checks export scanners that live code imports.",
    },
    {
      invariantKind: "departure",
      statement:
        "A module exiting while being imported ends the importing module with nothing said.",
    },
    {
      invariantKind: "departure",
      statement: "Refusing at call time leaves an importing reader its run.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal exits 2 for a tool error.",
    },
    {
      invariantKind: "departure",
      statement: "The refusal's exit code is no count of violations.",
    },
  ],
} as const satisfies Module
