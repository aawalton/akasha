import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const attributeReadout = {
  id: "01a08bad-e763-7a0b-968c-2dfedc23ba69",
  type: "page-type/domain",
  slug: "attribute-readout",
  definition: "an attribute's readout",
  parts: [
    "readout/attribute-charisma",
    "readout/attribute-constitution",
    "readout/attribute-endurance",
    "readout/attribute-intelligence",
    "readout/attribute-luck",
    "readout/attribute-strength",
    "readout/attribute-wisdom",
  ],
  createdAt: "2026-09-10T14:17:05.123Z",
  updatedAt: "2026-09-24T17:53:00.000Z",
} as const satisfies Domain
