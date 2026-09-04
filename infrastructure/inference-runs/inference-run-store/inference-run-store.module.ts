import type { Module } from "@akasha/code-system/module"

export const inferenceRunStore = {
  id: "01a0685d-4b35-7014-819a-3402c8830118",
  pageTypeSlug: "module",
  slug: "inference-run-store",
  definition: "recording a run from before it starts through to what it made",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A run that throws is still finished, as failed, and the failure is raised on.",
    },
    {
      invariantKind: "departure",
      statement: "An audio operation records what it made as audio and every other as an image.",
    },
    {
      invariantKind: "departure",
      statement: "What a run made is hashed into the record rather than trusted from the path.",
    },
    {
      invariantKind: "departure",
      statement: "A run lands at most one of an image page and an audio page.",
    },
  ],
} as const satisfies Module
