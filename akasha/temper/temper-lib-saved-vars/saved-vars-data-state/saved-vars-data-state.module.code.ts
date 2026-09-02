import { asNextFn, asRawIpairs } from "../saved-vars-casts/saved-vars-casts.module.code.ts"
import type { DataInstance } from "../saved-vars-types/saved-vars-types.module.code.ts"

export const DO_NOT_OVERWRITE = true

export const rawnext = LibLua52 !== undefined ? asNextFn(LibLua52.rawnext) : asNextFn(next)

export const rawipairs =
  LibLua52 !== undefined ? asRawIpairs(LibLua52.rawipairs) : asRawIpairs(ipairs)

export interface DataState {
  debugMode: boolean
  emptyObject?: DataInstance
}

export const DATA_STATE: DataState = {
  debugMode: false,
  emptyObject: undefined,
}
