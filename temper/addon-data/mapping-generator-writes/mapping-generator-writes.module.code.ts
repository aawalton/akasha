import type { AddonDataWrite } from "akasha/temper/addon-data/addon-data-writes/addon-data-writes.module.code.ts"
import { writeToDisk } from "akasha/temper/addon-data/addon-data-writes/addon-data-writes.module.code.ts"
import { rendered } from "akasha/temper/addon-data/failing-alone/failing-alone.module.code.ts"
import { MAPPING_RENDERS } from "akasha/temper/addon-data/mapping-renders/mapping-renders.module.code.ts"
import { TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR } from "akasha/temper/addon-data/modules/addon-data-output-dirs/addon-data-output-dirs.module.code.ts"

export function buildMappingGeneratorWrites(
  w: AddonDataWrite = writeToDisk
): readonly Promise<number>[] {
  const writes: Promise<number>[] = []
  for (const one of MAPPING_RENDERS) {
    writes.push(rendered(w, TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR, one.rendered, one.render))
  }
  return writes
}
