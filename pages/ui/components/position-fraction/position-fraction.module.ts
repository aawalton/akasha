import type { Module } from "@akasha/code-system/module"

export const positionFraction = {
  id: "01a05c3b-4fc5-7216-9ef8-0f552ccdcdd3",
  pageTypeSlug: "module",
  slug: "position-fraction",
  definition: "Converts playback and scroll positions to clamped 0-1 fractions and back.",
  code: "ts",
} as const satisfies Module
