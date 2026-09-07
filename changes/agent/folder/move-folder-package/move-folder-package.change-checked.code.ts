import { basename, dirname, join, relative } from "node:path"
import { partedIn } from "../../../../pages/file-name/page-file-name.module.code.ts"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import {
  addedTo,
  isLedger,
  type World,
  worldOver,
} from "../../../modules/change-shadow/change-shadow.module.code.ts"
import { renamePage } from "../../file/rename-page/rename-page.change-checked.code.ts"
import { moveFolder } from "../move-folder/move-folder.change-checked.code.ts"

const PACKAGE = "workspace-package"

const AT = "at"

const TO = "to"

export type MoveFolderPackageAsked = {
  readonly at: string
  readonly to: string
}

export function landingFor(at: string, from: string, to: string): string {
  return join(to, relative(from, at))
}

export async function moveFolderPackage(
  world: World,
  given: MoveFolderPackageAsked
): Promise<Answer> {
  const parted = partedIn(given.at)
  if (parted === null || parted.pageType !== PACKAGE) {
    return refusing(`\`${given.at}\` names no \`${PACKAGE}\`, so no folder is carried`)
  }
  const from = dirname(given.at)
  const carried = await moveFolder(world, { at: from, to: given.to })
  if (carried.refused !== null) return carried
  const named = basename(given.to)
  if (named === parted.slug) return carried
  const over = isLedger(world) ? addedTo(world, carried) : worldOver(world, carried)
  const said = await renamePage(over, {
    at: landingFor(given.at, from, given.to),
    to: named,
  })
  if (said.refused !== null) return said
  return gathered([carried, said])
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const at = given[AT]
  if (at === undefined) return refusing(missing(AT))
  const to = given[TO]
  if (to === undefined) return refusing(missing(TO))
  return await moveFolderPackage(world, { at, to })
}
