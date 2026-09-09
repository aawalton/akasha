import type { CodeFileProperty } from "@akasha/pages/code-file-property"

export type AddonBundleImage = "ts"

export const addonBundleImage = {
  id: "01a0817a-a1c9-7577-a1f2-bf5e6c93a43d",
  pageTypeSlug: "code-file-property",
  slug: "addon-bundle-image",
  propertySlug: "addon-bundle-image",
  definition: "the addon bundle image an app serves, named by its content hash",
  fileName: "deploy/addon-bundle-image.ts",
} as const satisfies CodeFileProperty
