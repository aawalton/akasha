import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const changeMechanicalFileDivide = {
  id: "01a08df0-768c-7d3b-995c-093cebfb7b67",
  type: "page-type/domain",
  slug: "change-mechanical-file-divide",
  definition: "a mechanical change laying what a file holds across more than one file",
  parts: ["change-mechanical/divide-file-code", "change-mechanical/divide-file-page-property"],
  decisions: [],
} as const satisfies Domain
