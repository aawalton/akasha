import {
  asNextFn,
  asRawIpairs,
} from "akasha/temper/addon/pages/world/collections/modules/saved-vars-casts/saved-vars-casts.module.code.ts"
import type { DataInstance } from "akasha/temper/addon/pages/world/collections/modules/saved-vars-types/saved-vars-types.module.code.ts"
import "akasha/design/language/lua-compiler/eso-sandbox/eso-sandbox.type-declaration.d.ts"
import "akasha/temper/addon/type/lib-lua-52/lib-lua-52.type-declaration.d.ts"

export const DO_NOT_OVERWRITE = true

export const rawnext = LibLua52 !== undefined ? asNextFn(LibLua52.rawnext) : asNextFn(next)

export const rawipairs =
  LibLua52 !== undefined ? asRawIpairs(LibLua52.rawipairs) : asRawIpairs(ipairs)

interface DataState {
  debugMode: boolean
  emptyObject?: DataInstance
}

export const DATA_STATE: DataState = {
  debugMode: false,
  emptyObject: undefined,
}
