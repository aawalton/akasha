import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const strength = {
  id: "01a0911d-062d-7eb2-a167-500195a36ae0",
  type: "page-type/domain",
  slug: "strength",
  definition: "how much load Alan's body moves",
  parts: ["page-type/strength-decline", "page-type/strength-exercise", "page-type/strength-log"],
} as const satisfies Domain
