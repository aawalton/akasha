import type { Module } from "@akasha/code-system/module"

export const traceInsert = {
  id: "01a05bc7-9129-700d-9b3a-ba23544a6e88",
  pageTypeSlug: "module",
  slug: "trace-insert",
  definition: "recorded places landed on the ESO day each was captured in",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "Two traces carried in under one name land as the later of the two.",
    },
    {
      invariantKind: "departure",
      statement: "A trace already standing on its day is passed over rather than written again.",
    },
    {
      invariantKind: "departure",
      statement: "A day no page stands for is written before its traces land.",
    },
    {
      invariantKind: "departure",
      statement: "Days land in the order they fall.",
    },
    {
      invariantKind: "departure",
      statement: "What was written is reported as a count rather than as the places themselves.",
    },
  ],
} as const satisfies Module
