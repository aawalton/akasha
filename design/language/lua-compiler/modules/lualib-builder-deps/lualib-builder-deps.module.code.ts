import type { createLuaPrinter } from "akasha/design/language/lua-compiler/modules/lua-printer/lua-printer.module.code.ts"
import type { createTranspiler } from "akasha/design/language/lua-compiler/modules/transpile-transpiler/transpile-transpiler.module.code.ts"

export const LUALIB_PRINTER_HOLDER: { fn: typeof createLuaPrinter | undefined } = {
  fn: undefined,
}

export const LUALIB_TRANSPILER_HOLDER: { fn: typeof createTranspiler | undefined } = {
  fn: undefined,
}

export function requireLualibPrinter(): typeof createLuaPrinter {
  if (LUALIB_PRINTER_HOLDER.fn === undefined) {
    throw new Error(
      "lualib-builder: createLuaPrinter not registered — LuaPrinter must load before buildLuaLib is called"
    )
  }
  return LUALIB_PRINTER_HOLDER.fn
}

export function requireLualibTranspiler(): typeof createTranspiler {
  if (LUALIB_TRANSPILER_HOLDER.fn === undefined) {
    throw new Error(
      "lualib-builder: createTranspiler not registered — transpilation/transpiler must load before buildLuaLib is called"
    )
  }
  return LUALIB_TRANSPILER_HOLDER.fn
}
