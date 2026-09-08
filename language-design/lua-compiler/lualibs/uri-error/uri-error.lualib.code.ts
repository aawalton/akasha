import { Error } from "../error/error.lualib.code.ts"
import { __TS__ErrorClassing } from "../error-classing/error-classing.lualib.code.ts"

export const URIError = __TS__ErrorClassing.create(Error, "URIError")
