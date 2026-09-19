import { __TS__CountVarargs } from "akasha/design/language/lua-compiler/lualib-helper/count-varargs/count-varargs.lualib-helper.code.ts"

function asSparseArray<T>(items: T[]): __TS__SparseArray<T> {
  return items as __TS__SparseArray<T>
}

export function __TS__SparseArrayNew<T>(this: void, ...args: T[]): __TS__SparseArray<T> {
  const sparseArray = asSparseArray<T>([...args])
  sparseArray.sparseLength = __TS__CountVarargs(...args)
  return sparseArray
}
