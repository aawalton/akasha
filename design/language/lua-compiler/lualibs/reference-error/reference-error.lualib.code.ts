import { Error } from "akasha/design/language/lua-compiler/lualibs/error/error.lualib.code.ts"
import { __TS__ErrorClassing } from "akasha/design/language/lua-compiler/lualibs/error-classing/error-classing.lualib.code.ts"

export const ReferenceError = __TS__ErrorClassing.create(Error, "ReferenceError")
