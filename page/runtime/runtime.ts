/**
 * Which runtime worked an answer out, as one line of the ground a cache key is built from.
 *
 * A KEPT ANSWER IS ONLY GOOD FOR THE RUNTIME THAT WORKED IT OUT, so this stands among the inputs to
 * every ground. It replaces `bun:${Bun.version}`, which could only name the one runtime able to
 * read it: the same code now answers in the editor's extension host, which is node.
 *
 * This lives under `page/` deliberately. `CODE_AT` and `CODE_DIRS` take the tree oid of whole
 * folders, and `page` is one of them, so a change here moves every key that depends on it. A new
 * top-level folder would be covered by neither, and the ground would go stale against its own code.
 */
export const RUNTIME_MARK: string =
  process.versions.bun === undefined
    ? `node:${process.versions.node}`
    : `bun:${process.versions.bun}`
