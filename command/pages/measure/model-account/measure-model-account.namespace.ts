import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const measureModelAccount = {
  id: "01a0796e-608f-717c-b6a8-4843088b5a0e",
  type: "page-type/namespace",
  slug: "measure-model-account",
  definition: "what the fleet of model accounts has spent",
  parts: ["command/measure-model-account-cost", "command/measure-model-account-usage"],
  name: "model-account",
  createdAt: "2026-09-07T01:14:31.951Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
