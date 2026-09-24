import { unitBodyOf } from "akasha/infrastructure/machine/provisioning/provisioned-file/modules/unit-limits/unit-limits.module.code.ts"
import { backgroundSliceShare as page } from "akasha/infrastructure/machine/provisioning/provisioned-file/pages/background-slice-share/background-slice-share.provisioned-file.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const SECTION = "Slice"

export function bodyIn(given: string | Reading): string {
  return unitBodyOf(given, page, SECTION)
}
