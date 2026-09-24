import { unitBodyOf } from "akasha/infrastructure/machine/provisioning/provisioned-file/modules/unit-limits/unit-limits.module.code.ts"
import { seatsSlice as page } from "akasha/infrastructure/machine/provisioning/provisioned-file/pages/seats-slice/seats-slice.provisioned-file.ts"
import type { Reading } from "akasha/page/index/modules/shape/index-shape.module.code.ts"

const SECTION = "Slice"

const OPENING: readonly string[] = ["[Unit]", "Description=The seats agents work from", ""]

export function bodyIn(given: string | Reading): string {
  return unitBodyOf(given, page, SECTION, OPENING)
}
