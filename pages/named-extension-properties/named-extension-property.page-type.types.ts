import type { HoldsBytes } from "akasha/pages/file-properties/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/pages/file-properties/properties/runs-file-length.boolean-property.types.ts"
import type { ExtensionName } from "akasha/pages/named-extension-properties/properties/extension-name.text-property.types.ts"
import type { PageProperty } from "akasha/pages/types/page-properties/page-property.page-type.types.ts"

export type NamedExtensionProperty = PageProperty & {
  extensionName: ExtensionName
  holdsBytes?: HoldsBytes
  runsFileLength?: RunsFileLength
}
