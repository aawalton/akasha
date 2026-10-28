import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const medicine = {
  id: "01a183df-77e9-773f-b423-de4ccacc0f65",
  type: "page-type/namespace",
  slug: "medicine",
  definition: "what Alan's health model predicts from his pages and his logs",
  parts: [
    "command/medicine-actions",
    "command/medicine-causes",
    "module/health-logs",
    "module/mortality-model",
    "module/mortality-readings",
  ],
  name: "medicine",
  createdAt: "2026-10-28T18:57:02.952Z",
  updatedAt: "2026-10-28T18:57:02.952Z",
} as const satisfies Namespace
