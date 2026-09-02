import "../media-declarations/media-declarations.module.code.ts"
import { asGlobalTable } from "../media-casts/media-casts.module.code.ts"
import { createProvider } from "../media-provider/media-provider.module.code.ts"

const LIB_GLOBAL_NAME = "LibMediaProvider"

const glob = asGlobalTable(globalThis)
if (glob[LIB_GLOBAL_NAME] !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  glob[LIB_GLOBAL_NAME] = createProvider()
}
