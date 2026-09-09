import { basename, dirname, join, relative } from "node:path"
import { textAt } from "@akasha/pages/page-value"
import { partedIn } from "../../../../../pages/file-name/page-file-name.module.code.ts"
import { gathered, refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const PACKAGE = "workspace-package"

const PAGE_TYPE = "page-type"

const PLURAL_SLUG = "pluralSlug"

const TS = "ts"

const MOVE_FOLDER = "change-mechanical-folder/move-folder"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

export type Asked = {
  readonly at: string
  readonly to: string
}

export function landingFor(at: string, from: string, to: string): string {
  return join(to, relative(from, at))
}

export function slugNaming(world: World, folder: string, named: string): string {
  for (const path of world.under(folder)) {
    if (dirname(path) !== folder) continue
    const parted = partedIn(path)
    if (parted === null || parted.sections.length > 0 || parted.held !== TS) continue
    if (parted.pageType !== PAGE_TYPE) continue
    const value = world.index.pageAt(PAGE_TYPE, parted.slug)
    if (value === null || textAt(value, PLURAL_SLUG) !== named) continue
    return parted.slug
  }
  return named
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const parted = partedIn(given.at)
  if (parted === null || parted.pageType !== PACKAGE) {
    return refusing(`\`${given.at}\` names no \`${PACKAGE}\`, so no folder is carried`)
  }
  const from = dirname(given.at)
  const named = slugNaming(world, from, basename(given.to))
  const carried = await reach(world, MOVE_FOLDER, { from, to: given.to })
  if (carried.said.refused !== null) return carried.said
  if (named === parted.slug) return carried.said
  const said = await reach(carried.world, RENAME_FILE_PAGE, {
    at: landingFor(given.at, from, given.to),
    to: named,
  })
  if (said.said.refused !== null) return said.said
  return gathered([carried.said, said.said])
}
