import { join } from "node:path"

export const GIT_AT = ".git"

export const CACHE = "cache"

export const DATA = "data"

export const HANDOFF = "harness-push"

export const INDEXES = "indexes"

export const TREES = "trees"

export const DEPLOYS = "deploys"

export const LANDING_LOCK = "akasha-landing.lock"

export const HARNESS_LANDING_LOCK = "harness-landing.lock"

export const STORES: readonly string[] = [CACHE, DATA, DEPLOYS, HANDOFF, INDEXES, TREES]

export const KEPT: readonly string[] = [...STORES, LANDING_LOCK, HARNESS_LANDING_LOCK]

export const LEFT: readonly string[] = [`${DATA}/reads/agent`]

export function keptAt(name: string): string {
  return join(GIT_AT, name)
}

export function gitIn(root: string): string {
  return join(root, GIT_AT)
}

export function storeAt(store: string, ...parts: readonly string[]): string {
  return join(GIT_AT, store, ...parts)
}

export function storeIn(root: string, store: string, ...parts: readonly string[]): string {
  return join(root, GIT_AT, store, ...parts)
}

export function dataAt(...parts: readonly string[]): string {
  return storeAt(DATA, ...parts)
}

export function dataIn(root: string, ...parts: readonly string[]): string {
  return storeIn(root, DATA, ...parts)
}
