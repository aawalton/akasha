import type { WorkspacePackage } from "../../code-system/workspace-package/workspace-package.page-type.ts"

export const temperBitCodec = {
  id: "01a060af-255f-7995-9b3e-b6dcbaae7cd7",
  pageTypeSlug: "workspace-package",
  slug: "temper-bit-codec",
  definition: "packing an item's traits and quality into as few bits as the game allows",
  manifest: "json",
  partSlugs: ["module/bit-writer", "module/equipment-mappings"],
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
      invariantKind: "gap",
      statement: "The reader and the base64url coding are outside akasha yet.",
    },
  ],
} as const satisfies WorkspacePackage
