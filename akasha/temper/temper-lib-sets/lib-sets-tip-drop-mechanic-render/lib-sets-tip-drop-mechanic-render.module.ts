import type { Module } from "@akasha/code-system/module"

export const libSetsTipDropMechanicRender = {
  id: "01a06231-8f1e-7a46-8a06-c666a6d92267",
  pageTypeSlug: "module",
  slug: "lib-sets-tip-drop-mechanic-render",
  definition: "the whole drop text for a set built from its per-zone pieces",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The dungeon name follows the parent zone name in square brackets.",
    },
    {
      invariantKind: "constraint",
      statement: "A set whose zones are identical is treated as a single zone.",
    },
    {
      invariantKind: "departure",
      statement: "Every text is built once with textures and once plain.",
    },
  ],
} as const satisfies Module
