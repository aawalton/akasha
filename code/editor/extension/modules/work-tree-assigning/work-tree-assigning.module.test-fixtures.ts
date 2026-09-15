import { readFileSync } from "node:fs"
import * as path from "node:path"
import { VIEW_ID } from "akasha/code/editor/extension/modules/work-tree-ids/work-tree-ids.module.code.ts"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
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
      })
      .loose(),
  }),
})

const MANIFEST_PATH = path.join(rootOf(import.meta.dir), "package.json")

const manifest = MANIFEST_SCHEMA.parse(JSON.parse(readFileSync(MANIFEST_PATH, "utf8")))

const rowItems = manifest.contributes.menus["view/item/context"]

export function shownOn(contextValue: string): readonly string[] {
  const when = `view == ${VIEW_ID} && viewItem == ${contextValue}`
  return rowItems.filter((one) => one.when === when).map((one) => one.command)
}

export function titleOf(command: string): string | null {
  return manifest.contributes.commands.find((one) => one.command === command)?.title ?? null
}
