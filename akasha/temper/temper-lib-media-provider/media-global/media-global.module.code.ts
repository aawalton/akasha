import "../media-declarations/media-declarations.module.code.ts"
import { asGlobalTable } from "../media-casts/media-casts.module.code.ts"
import { createProvider } from "../media-provider/media-provider.module.code.ts"
import type { LibMediaProviderApi } from "../media-types/media-types.module.code.ts"

declare global {
  var LibMediaProvider: LibMediaProviderApi
}

const glob = asGlobalTable(globalThis)
if (glob.LibMediaProvider !== undefined) {
  d("Warning : 'LibMediaProvider' has always been loaded.")
} else {
  globalThis.LibMediaProvider = createProvider()
}
