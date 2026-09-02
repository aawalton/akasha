import type { WorkspacePackage } from "../../code-system/workspace-packages/workspace-package.page-type.ts"

export const temperBitCodec = {
  id: "01a060af-255f-7995-9b3e-b6dcbaae7cd7",
  pageTypeSlug: "workspace-package",
  slug: "temper-bit-codec",
  definition:
    "packing a build into as few bits as the game allows, and the characters that carry them",
  manifest: "json",
  partSlugs: [
    "module/bit-writer",
    "module/bit-reader",
    "module/base64url",
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
} as const satisfies WorkspacePackage
