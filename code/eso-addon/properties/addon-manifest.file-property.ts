import type { FileProperty } from "akasha/page/file-property/file-property.page-type.types.ts"

export const addonManifest = {
  id: "01a06036-9b77-7cb5-a23d-2567828313af",
  type: "page-type/file-property",
  slug: "addon-manifest",
  propertySlug: "addon-manifest",
  definition: "what an addon states about itself",
  extensions: ["json"],
  types: "ts",
} as const satisfies FileProperty
