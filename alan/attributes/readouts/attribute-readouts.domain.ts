import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const attributeReadouts = {
  id: "01a08bad-e763-7a0b-968c-2dfedc23ba69",
  type: "domain",
  slug: "attribute-readouts",
  definition: "the reading each attribute's points are shown as",
  parts: [
    "readout/attribute-charisma",
    "readout/attribute-constitution",
    "readout/attribute-endurance",
    "readout/attribute-strength",
    "readout/attribute-intelligence",
    "readout/attribute-wisdom",
  ],
} as const satisfies Domain
