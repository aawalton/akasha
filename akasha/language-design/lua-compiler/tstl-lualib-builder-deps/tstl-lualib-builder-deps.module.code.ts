import type { createTranspiler } from "../transpile-transpiler/transpile-transpiler.module.code.ts"
import type { createLuaPrinter } from "../tstl-lua-printer/tstl-lua-printer.module.code.ts"

export const lualibPrinterHolder: { fn: typeof createLuaPrinter | undefined } = {
  fn: undefined,
}

export const lualibTranspilerHolder: { fn: typeof createTranspiler | undefined } = {
  fn: undefined,
}

export function requireLualibPrinter(): typeof createLuaPrinter {
  if (lualibPrinterHolder.fn === undefined) {
    throw new Error(
      "lualib-builder: createLuaPrinter not registered — LuaPrinter must load before buildLuaLib is called"
    )
  }
  return lualibPrinterHolder.fn
}

export function requireLualibTranspiler(): typeof createTranspiler {
  if (lualibTranspilerHolder.fn === undefined) {
    throw new Error(
      "lualib-builder: createTranspiler not registered — transpilation/transpiler must load before buildLuaLib is called"
    )
  }
  return lualibTranspilerHolder.fn
}
