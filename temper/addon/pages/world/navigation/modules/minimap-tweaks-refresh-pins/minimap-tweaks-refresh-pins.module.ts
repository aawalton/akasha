import type { Module } from "akasha/code/module/module.page-type.types.ts"

export const minimapTweaksRefreshPins = {
  id: "01a06269-2997-781e-a33a-db5d2d258898",
  type: "page-type/module",
  slug: "minimap-tweaks-refresh-pins",
  definition:
    "the world map's point-of-interest, wayshrine and location refreshes done a little at a time",
  code: "ts",
} as const satisfies Module
