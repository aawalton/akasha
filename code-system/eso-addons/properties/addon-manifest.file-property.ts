import type { FileProperty } from "@akasha/pages-system/file-property"

export type AddonManifest = "json"

export const addonManifest = {
  id: "01a06036-9b77-7cb5-a23d-2567828313af",
  pageTypeSlug: "file-property",
  slug: "addon-manifest",
  propertySlug: "addon-manifest",
  definition: "what an addon states about itself",
} as const satisfies FileProperty
