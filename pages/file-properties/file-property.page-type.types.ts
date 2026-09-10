import type { PageProperty } from "../types/page-properties/page-property.page-type.types.ts"
import type { FileName } from "./properties/file-name.text-property.ts"
import type { Generated } from "./properties/generated.boolean-property.types.ts"
import type { HoldsBytes } from "./properties/holds-bytes.boolean-property.types.ts"
import type { RunsFileLength } from "./properties/runs-file-length.boolean-property.types.ts"

export type FileProperty = PageProperty & {
  fileName?: FileName
  generated?: Generated
  runsFileLength?: RunsFileLength
  holdsBytes?: HoldsBytes
}
