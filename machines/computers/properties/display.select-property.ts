import type { SelectProperty } from "@akasha/pages-system/select-property"

export const display = {
  id: "01a0658c-329a-7432-acf0-aada90a012ff",
  pageTypeSlug: "select-property",
  slug: "display",
  propertySlug: "display",
  definition: "which monitor it drives",
  values: [
    "omen-by-hp-35",
    "built-in-liquid-retina-xdr-display",
    "msi-g271",
    "dell-s3222dgm",
    "samsung-smbx2440",
    "samsung-s24d300",
    "acer-xz322qu-v3",
  ],
} as const satisfies SelectProperty

export type Display = (typeof display.values)[number]
