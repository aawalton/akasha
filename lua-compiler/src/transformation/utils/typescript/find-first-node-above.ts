import type * as ts from "typescript"

export function findFirstNodeAbove<T extends ts.Node>(
  node: ts.Node,
  callback: (n: ts.Node) => n is T
): T | undefined {
  let current = node
  while (current.parent) {
    if (callback(current.parent)) {
      return current.parent
    } else {
      current = current.parent
    }
  }
}
