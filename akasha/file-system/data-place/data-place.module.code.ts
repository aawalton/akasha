import { join } from "node:path"

const DATA_AT = ".git/data"

export function dataAt(...parts: readonly string[]): string {
  return join(DATA_AT, ...parts)
}

export function dataIn(root: string, ...parts: readonly string[]): string {
  return join(root, DATA_AT, ...parts)
}
