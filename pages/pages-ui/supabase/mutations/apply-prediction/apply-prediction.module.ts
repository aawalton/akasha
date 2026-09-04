import type { Module } from "@akasha/code-system/module"

export const applyPrediction = {
  id: "01a06164-b506-7004-907a-c0f6cdc5b6ca",
  pageTypeSlug: "module",
  slug: "apply-prediction",
  definition: "Runs a mutation against the pages store with its optimistic plans applied first.",
  code: "ts",
} as const satisfies Module
