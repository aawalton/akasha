import type { Domain } from "../../../domains/domain.page-type.types.ts"

export const attributeReadouts = {
  id: "01a08bad-e763-7a0b-968c-2dfedc23ba69",
  pageTypeSlug: "domain",
  type: "domain",
  slug: "attribute-readouts",
  definition: "the reading each attribute's points are shown as",
  parts: [
    "readout/attribute-strength",
    "readout/attribute-endurance",
    "readout/attribute-constitution",
    "readout/attribute-wisdom",
    "readout/attribute-intelligence",
    "readout/attribute-charisma",
  ],
} as const satisfies Domain
