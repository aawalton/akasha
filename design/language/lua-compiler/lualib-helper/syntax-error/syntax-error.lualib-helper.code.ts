import { Error } from "akasha/design/language/lua-compiler/lualib-helper/error/error.lualib-helper.code.ts"
import { __TS__ErrorClassing } from "akasha/design/language/lua-compiler/lualib-helper/error-classing/error-classing.lualib-helper.code.ts"

export const SyntaxError = __TS__ErrorClassing.create(Error, "SyntaxError")
