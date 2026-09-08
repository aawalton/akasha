import { basename, dirname, join, relative } from "node:path"
import { partedIn } from "../../../../../pages/file-name/page-file-name.module.code.ts"
import { gathered, refusing } from "../../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/change-shadow/change-shadow.module.code.ts"

const PACKAGE = "workspace-package"

const MOVE_FOLDER = "change-mechanical-folder/move-folder"

const RENAME_FILE_PAGE = "change-mechanical/rename-file-page"

export type Asked = {
  readonly at: string
  readonly to: string
}

export function landingFor(at: string, from: string, to: string): string {
  return join(to, relative(from, at))
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const parted = partedIn(given.at)
  if (parted === null || parted.pageType !== PACKAGE) {
    return refusing(`\`${given.at}\` names no \`${PACKAGE}\`, so no folder is carried`)
  }
  const from = dirname(given.at)
  const carried = await reach(world, MOVE_FOLDER, { from, to: given.to })
  if (carried.said.refused !== null) return carried.said
  const named = basename(given.to)
  if (named === parted.slug) return carried.said
  const said = await reach(carried.world, RENAME_FILE_PAGE, {
    at: landingFor(given.at, from, given.to),
    to: named,
  })
  if (said.said.refused !== null) return said.said
  return gathered([carried.said, said.said])
}
