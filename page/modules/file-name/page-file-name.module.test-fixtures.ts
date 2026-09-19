import { expect } from "bun:test"
import {
  type Held,
  heldIn,
  pageNamed,
  pageOf,
  partedIn,
  secretNamed,
  uncommittedNamed,
} from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export const PAGE_TYPES = new Set<string>(["page-type", "module", "check", "domain"])

export const FILE_PROPERTIES = new Set<string>(["code", "test"])

export const PORTRAIT = new Set<string>(["portrait"])

export const PATCH = new Set<string>(["code", "test", "patch"])

const ITEMS = new Set<string>(["items", "quests", "part2"])

export const MINE = "akasha/one/eso.temper-mine"

export function kindOf(path: string): string {
  return heldIn(path, PAGE_TYPES, FILE_PROPERTIES).kind
}

export function itemsAt(path: string): Held {
  return heldIn(path, PAGE_TYPES, ITEMS)
}

export function pageNameIn(path: string): string {
  const said = partedIn(path)
  if (said === null) throw new Error(`expected \`${path}\` to parse`)
  return pageOf(said)
}

function agreeing(
  path: string,
  pageTypes: ReadonlySet<string> = PAGE_TYPES,
  fileProperties: ReadonlySet<string> = FILE_PROPERTIES
): undefined {
  const kind = heldIn(path, pageTypes, fileProperties).kind
  expect(pageNamed(path, pageTypes)).toBe(kind === "page")
  expect(uncommittedNamed(path)).toBe(kind === "uncommitted")
  expect(secretNamed(path)).toBe(kind === "secret")
}

export function everyNameAgrees(): undefined {
  agreeing("one/file-length.check.ts")
  agreeing("one/file-length.check.uncommitted.ts")
  agreeing("one/aine.model-account.sops.yaml")
  agreeing("one/file-length.check.code.ts")
  agreeing("one/dalla.seat.patch.uncommitted.patch")
  agreeing("one/held.uncommitted.ts")
  agreeing("one/held.uncommitted.ts", new Set(["uncommitted"]))
  agreeing("one/held.sops.yaml")
  agreeing("one/notes.txt")
  agreeing("one/dalla.seat.patch.uncommitted.patch", PAGE_TYPES, PATCH)
  agreeing("one/dalla.seat.patch.sops.yaml", PAGE_TYPES, PATCH)
}
