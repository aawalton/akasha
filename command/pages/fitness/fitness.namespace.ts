import type { Namespace } from "akasha/command/namespace/namespace.page-type.types.ts"

export const fitness = {
  id: "01a0b6de-94d3-70e8-885d-2799c7d023a9",
  type: "page-type/namespace",
  slug: "fitness",
  definition: "how Alan trains his body and what the training did",
  parts: [
    "command/fitness-cooldown",
    "command/fitness-mobility",
    "command/fitness-today",
    "command/fitness-week",
    "module/training-week",
  ],
  name: "fitness",
  updatedAt: "2026-10-08T16:02:32.012Z",
  createdAt: "2026-09-18T23:33:55.539Z",
} as const satisfies Namespace
