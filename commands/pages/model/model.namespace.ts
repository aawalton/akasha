import type { Namespace } from "akasha/commands/namespaces/namespace.page-type.types.ts"

export const model = {
  id: "01a09176-eab2-78d7-8a49-90f03d3713d9",
  type: "namespace",
  slug: "model",
  definition: "what is put to a model and what comes back",
  parts: ["command/model-test"],
  name: "model",
} as const satisfies Namespace
