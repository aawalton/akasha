import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const measureModelAccount = {
  id: "01a0796e-608f-717c-b6a8-4843088b5a0e",
  type: "namespace",
  slug: "measure-model-account",
  definition: "what the fleet of model accounts has spent",
  parts: ["command/measure-model-account-cost", "command/measure-model-account-usage"],
  name: "model-account",
} as const satisfies Namespace
