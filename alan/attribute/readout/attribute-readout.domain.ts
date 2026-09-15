import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const attributeReadout = {
  id: "01a08bad-e763-7a0b-968c-2dfedc23ba69",
  type: "page-type/domain",
  slug: "attribute-readout",
  definition: "the reading each attribute's points are shown as",
  parts: [
    "readout/attribute-charisma",
    "readout/attribute-constitution",
    "readout/attribute-endurance",
    "readout/attribute-intelligence",
    "readout/attribute-luck",
    "readout/attribute-strength",
    "readout/attribute-wisdom",
  ],
} as const satisfies Domain
