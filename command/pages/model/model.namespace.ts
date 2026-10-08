import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const model = {
  id: "01a09176-eab2-78d7-8a49-90f03d3713d9",
  type: "page-type/namespace",
  slug: "model",
  definition: "what is put to a model and what comes back",
  parts: ["command/model-test", "namespace/model-gateway"],
  name: "model",
  createdAt: "2026-09-11T17:14:44.786Z",
  updatedAt: "2026-09-15T15:51:21.000Z",
} as const satisfies Namespace
