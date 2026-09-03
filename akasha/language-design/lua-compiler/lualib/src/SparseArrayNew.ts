import { __TS__CountVarargs } from "./CountVarargs"

function as__TS__SparseArray<T>(items: T[]): __TS__SparseArray<T> {
  return items as __TS__SparseArray<T>
}

export function __TS__SparseArrayNew<T>(this: void, ...args: T[]): __TS__SparseArray<T> {
  const sparseArray = as__TS__SparseArray<T>([...args])
  sparseArray.sparseLength = __TS__CountVarargs(...args)
  return sparseArray
}
