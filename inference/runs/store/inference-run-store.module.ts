import type { Module } from "@akasha/code/module"

export const inferenceRunStore = {
  id: "01a0685d-4b35-7014-819a-3402c8830118",
  pageTypeSlug: "module",
  type: "module",
  slug: "inference-run-store",
  definition: "recording a run from before it starts through to what it made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The failure a run throws is raised on.",
    },
    {
      invariantKind: "departure",
      statement: "An audio operation records the output that operation made as audio.",
    },
    {
      invariantKind: "departure",
      statement:
        "An operation that is not audio records the output that operation made as an image.",
    },
    {
      invariantKind: "departure",
      statement:
        "The output a run made is hashed into the record rather than trusted from the path.",
    },
    {
      invariantKind: "departure",
      statement: "No run lands both an image page and an audio page.",
    },
  ],
} as const satisfies Module
