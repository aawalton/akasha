import { join } from "node:path"

export const GIT_AT = ".git"

export const CACHE = "cache"

export const DATA = "data"

export const HANDOFF = "harness-push"

export const INDEXES = "indexes"

export const TREES = "trees"

export const TREE_INDEXES = "tree-indexes"

export const DEPLOYS = "deploys"

export const LANDING_LOCK = "akasha-landing.lock"

export const LEFT: readonly string[] = [DATA, HANDOFF, INDEXES]

export function keptAt(name: string): string {
  return join(GIT_AT, name)
}

export function gitIn(root: string): string {
  return join(root, GIT_AT)
}

export function storeIn(root: string, store: string, ...parts: readonly string[]): string {
  return join(root, GIT_AT, store, ...parts)
}
