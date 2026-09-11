import { join } from "node:path"

const GIT_AT = ".git"

export const CACHE = "cache"

export const DATA = "data"

export const HANDOFF = "harness-push"

export const INDEXES = "indexes"

export const STORES: readonly string[] = [CACHE, DATA, HANDOFF, INDEXES]

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
