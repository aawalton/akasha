import {
  builtFrom,
  refusalsOver,
} from "akasha/check/code/pages/lua-runtime-library-compiles/lua-runtime-library-compiles.check-code.decision.code.ts"
import { filesBy, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const BUILT = filesBy("the files a lua runtime library's configs name, and those configs", (path) =>
  builtFrom(path)
)

export const luaRuntimeLibraryCompiles = input(BUILT, refusalsOver)
