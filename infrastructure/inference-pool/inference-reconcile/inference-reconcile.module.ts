import type { Module } from "@akasha/code-system/module"

export const inferenceReconcile = {
  id: "01a0685d-4b35-700c-9b4c-80e9256ed4e8",
  pageTypeSlug: "module",
  slug: "inference-reconcile",
  definition: "bringing what stands on an inference host to what this repository declares",
  code: "ts",
  invariants: [
    { invariantKind: "departure", statement: "The plan is printed before anything is applied." },
    {
      invariantKind: "departure",
      statement: "A dry run reaches the host to read it and changes nothing.",
    },
    {
      invariantKind: "departure",
      statement:
        "Nothing is applied where the host has no GUI session for launchd to load an agent into.",
    },
    {
      invariantKind: "departure",
      statement: "The pool file is written before the services it fronts are applied.",
    },
    { invariantKind: "departure", statement: "Pruning runs before applying." },
  ],
} as const satisfies Module
