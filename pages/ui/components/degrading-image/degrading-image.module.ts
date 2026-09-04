import type { Module } from "@akasha/code-system/module"

export const degradingImage = {
  id: "01a05c40-2192-76a6-9bf0-a3b224e8b06b",
  pageTypeSlug: "module",
  slug: "degrading-image",
  definition:
    "Renders an img that swaps to fallback content on load error, resetting when src changes.",
  code: "tsx",
} as const satisfies Module
