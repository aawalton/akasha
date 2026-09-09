import {
  COMPANIONS_OUTPUT_DIR,
  TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR,
} from "../addon-data-output-dirs/addon-data-output-dirs.module.code.ts"
import { generateCodecConstants } from "../codec-constants/codec-constants.module.code.ts"

export function buildAddonDataWritesCodec(
  w: (dir: string, name: string, source: string) => Promise<number>
): readonly Promise<number>[] {
  return [
    w(
      TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR,
      "codec-constants.generated.ts",
      generateCodecConstants()
    ),
    w(COMPANIONS_OUTPUT_DIR, "codec-constants.generated.ts", generateCodecConstants()),
  ]
}
