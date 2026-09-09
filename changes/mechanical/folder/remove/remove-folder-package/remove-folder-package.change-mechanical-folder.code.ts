import { dirname } from "node:path"
import { calledIn, dependsIn } from "@akasha/code/package-manifest"
import { manifestsIn } from "@akasha/indexes/package-reaching"
import { partedIn } from "../../../../../pages/file-name/page-file-name.module.code.ts"
import { refusing } from "../../../../modules/answer/change-answer.module.code.ts"
import type { Answer } from "../../../../modules/answer/change-answer.module.types.ts"
import { reach, type World } from "../../../../modules/shadow/change-shadow.module.code.ts"

const PACKAGE = "workspace-package"

const REMOVE_FOLDER = "change-mechanical-folder/remove-folder"

const PARTED_BY = "/"

const UNTAKEN = "so no folder is taken away"

export type Asked = {
  readonly at: string
}

export type Depending = {
  readonly path: string
  readonly named: string
}

export function dependedOn(world: World, at: string): Depending | null {
  const manifests = manifestsIn(world.index.everyPath(), world.index.fileKeysAt())
  const own = manifests.find((one) => dirname(one) === at)
  if (own === undefined) return null
  const named = calledIn(world.textOf(own))
  if (named === null) return null
  for (const path of manifests) {
    if (path.startsWith(`${at}${PARTED_BY}`)) continue
    const text = world.textOf(path)
    if (text !== null && dependsIn(text).has(named)) return { path, named }
  }
  return null
}

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const parted = partedIn(given.at)
  if (parted === null || parted.pageType !== PACKAGE) {
    return refusing(`\`${given.at}\` names no \`${PACKAGE}\`, ${UNTAKEN}`)
  }
  const at = dirname(given.at)
  const held = dependedOn(world, at)
  if (held !== null) {
    return refusing(`\`${held.path}\` depends on \`${held.named}\`, ${UNTAKEN}`)
  }
  return (await reach(world, REMOVE_FOLDER, { at })).said
}
