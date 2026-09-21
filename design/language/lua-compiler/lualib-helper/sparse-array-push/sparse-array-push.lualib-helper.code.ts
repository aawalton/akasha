import { __TS__CountVarargs } from "akasha/design/language/lua-compiler/lualib-helper/count-varargs/count-varargs.lualib-helper.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/design/language/lua-compiler/sparse-array/sparse-array.type-declaration.d.ts"

export function __TS__SparseArrayPush<T>(
  this: void,
  sparseArray: __TS__SparseArray<T>,
  ...args: T[]
): undefined {
  const argsLen = __TS__CountVarargs(...args)
  const listLen = sparseArray.sparseLength
  for (const i of $range(1, argsLen)) {
    sparseArray[listLen + i - 1] = args[i - 1]
  }
  sparseArray.sparseLength = listLen + argsLen
}
