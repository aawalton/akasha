import {
  builtFrom,
  refusalsOver,
} from "akasha/check/code/pages/lua-code-compiles/lua-code-compiles.check-code.decision.code.ts"
import { filesBy, input } from "akasha/check/modules/change-walking/change-walking.module.code.ts"

const BUILT = filesBy(
  "the files a Lua target is compiled from, and its configs and manifests",
  (path) => builtFrom(path)
)

export const luaCodeCompiles = input(BUILT, refusalsOver)
