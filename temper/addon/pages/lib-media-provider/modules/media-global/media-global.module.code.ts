import type { GlobalTable } from "akasha/temper/addon/pages/lib-media-provider/modules/media-casts/media-casts.module.code.ts"

import { createProvider } from "akasha/temper/addon/pages/lib-media-provider/modules/media-provider/media-provider.module.code.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"

const LIB_GLOBAL_NAME = "LibMediaProvider"

const glob = globalThis as GlobalTable
if (glob[LIB_GLOBAL_NAME] !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  glob[LIB_GLOBAL_NAME] = createProvider()
}
