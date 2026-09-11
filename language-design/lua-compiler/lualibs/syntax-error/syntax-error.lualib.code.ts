import { Error } from "akasha/language-design/lua-compiler/lualibs/error/error.lualib.code.ts"
import { __TS__ErrorClassing } from "akasha/language-design/lua-compiler/lualibs/error-classing/error-classing.lualib.code.ts"

export const SyntaxError = __TS__ErrorClassing.create(Error, "SyntaxError")
