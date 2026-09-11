import { readFileSync } from "node:fs"
import * as path from "node:path"
import { VIEW_ID } from "akasha/code-system/editor/extension/agent-tree-ids/agent-tree-ids.module.code.ts"
import type { SeatMode } from "akasha/code-system/editor/extension/seat-mode/seat-mode.module.code.ts"
import { seatContextValue } from "akasha/code-system/editor/extension/seat-toggles/seat-toggles.module.code.ts"
import { rootOf } from "akasha/commands/modules/rooting/rooting.module.code.ts"
import { z } from "zod"

const MENU_ITEM_SCHEMA = z.object({
  command: z.string(),
  when: z.string(),
  group: z.string(),
})

const MANIFEST_SCHEMA = z.object({
  contributes: z.object({
    commands: z.array(z.object({ command: z.string(), title: z.string() }).loose()),
    menus: z
      .object({
        "view/item/context": z.array(MENU_ITEM_SCHEMA),
        "editor/title/context/replace": z.array(MENU_ITEM_SCHEMA),
      })
      .loose(),
  }),
})

const MANIFEST_PATH = path.join(rootOf(import.meta.dir), "package.json")

export const manifest = MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_PATH, "utf8")))

export const rowItems = manifest.contributes.menus["view/item/context"]

export const tabItems = manifest.contributes.menus["editor/title/context/replace"]

const VIEW_RE = /view\s*==\s*([A-Za-z]+)/

const VIEW_ITEM_RE = /viewItem\s*=~\s*\/(.+?)\/\s*$/

export const CLAUSE_SCHEMA = z.tuple([z.string(), z.string()]).nullable()

export function matchesRow(when: string, contextValue: string, view: string = VIEW_ID): boolean {
  const named = CLAUSE_SCHEMA.parse(VIEW_RE.exec(when))
  if (named !== null && named[1] !== view) {
    return false
  }
  const found = CLAUSE_SCHEMA.parse(VIEW_ITEM_RE.exec(when))
  if (found === null) {
    return true
  }
  return new RegExp(found[1]).test(contextValue)
}

export function shownFor(live: boolean, place: SeatMode): readonly string[] {
  const value = seatContextValue(live, place)
  return rowItems.filter((i) => matchesRow(i.when, value)).map((i) => i.command)
}
