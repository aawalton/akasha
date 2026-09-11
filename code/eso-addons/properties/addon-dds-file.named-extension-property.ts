import type { NamedExtensionProperty } from "akasha/pages/named-extension-properties/named-extension-property.page-type.types.ts"

export const addonDdsFile = {
  id: "01a09166-6d67-76ef-8807-56251e571e35",
  type: "named-extension-property",
  slug: "addon-dds-file",
  propertySlug: "addon-dds-file",
  definition: "the textures an add-on keeps in files beside its page",
  extensionName: "dds",
  holdsBytes: true,
  runsFileLength: false,
  types: "ts",
} as const satisfies NamedExtensionProperty
