import { type Held, heldIn } from "./page-file-name.module.code.ts"

export const PAGE_TYPES = new Set<string>(["page-type", "module", "check", "domain"])

export const FILE_PROPERTIES = new Set<string>(["code", "test"])

export const PORTRAIT = new Set<string>(["portrait"])

export const PATCH = new Set<string>(["code", "test", "patch"])

export const ITEMS = new Set<string>(["items", "quests", "part2"])

export const MINE = "akasha/one/eso.temper-mine"

export function kindOf(path: string): string {
  return heldIn(path, PAGE_TYPES, FILE_PROPERTIES).kind
}

export function itemsAt(path: string): Held {
  return heldIn(path, PAGE_TYPES, ITEMS)
}
