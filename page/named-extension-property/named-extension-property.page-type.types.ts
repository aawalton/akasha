import type { HoldsBytes } from "akasha/page/file-property/properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "akasha/page/file-property/properties/runs-file-length.boolean-property.types.ts"
import type { ExtensionName } from "akasha/page/named-extension-property/properties/extension-name.text-property.types.ts"
import type { TrueProperty } from "akasha/page/true-property/true-property.page-type.types.ts"

export type NamedExtensionProperty = TrueProperty & {
  extensionName: ExtensionName
  holdsBytes?: HoldsBytes
  runsFileLength?: RunsFileLength
}
