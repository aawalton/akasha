import type { Repo } from "@akasha/pages-system/markdown-document"

// `CODE_REPO` is the constant `@akasha/checks/repo-scope` holds. `@akasha/checks` reaches this
// package, so naming it back here would be a cycle. Its value is the string `code`, written out
// rather than carried across the boundary.
const CODE_REPO = "code"

export interface NodeKeyParts {
  readonly type: string
  readonly repo?: Repo
  readonly key: string
}

export function nodeKey(parts: NodeKeyParts): string {
  return parts.repo === undefined
    ? `${parts.type}:${parts.key}`
    : `${parts.type}:${parts.repo}:${parts.key}`
}

export const nodeId = (type: string, key: string): string => nodeKey({ type, repo: CODE_REPO, key })

export const nodeIdPrefix = (type: string): string => nodeId(type, "")
