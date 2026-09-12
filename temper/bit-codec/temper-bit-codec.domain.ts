import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const temperBitCodec = {
  id: "01a060af-255f-7995-9b3e-b6dcbaae7cd7",
  type: "domain",
  slug: "temper-bit-codec",
  definition:
    "packing a build into as few bits as the game allows, and the characters that have them",
  parts: [
    "module/base64url",
    "module/bit-reader",
    "module/bit-writer",
    "module/equipment-mappings",
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The bit arithmetic goes through the game's own bit functions.",
    },
    {
      invariantKind: "departure",
      statement: "A game constant is mapped to a small index before the packing.",
    },
    {
      invariantKind: "departure",
      statement: "The writer and the reader take the bits in the one order.",
    },
  ],
} as const satisfies Domain
