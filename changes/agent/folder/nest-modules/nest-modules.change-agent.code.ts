import { basename, dirname, join } from "node:path"
import { gathered, refusing } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { Answer } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import { reach, type World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { atMostIn } from "akasha/changes/modules/value-carrying/value-carrying.module.code.ts"

const AT_MOST = "at-most"

const MODULE = "module"

const MODULES = "modules"

const MOVE_FOLDER = "change-mechanical-folder/move-folder"

const SERVER = ".server"

export type NestModulesAsked = {
  readonly atMost?: number | null
}

export function underModules(folder: string): boolean {
  return folder.split("/").some((one) => one === MODULES || one === SERVER)
}

export function nestedAt(folder: string): string {
  return join(dirname(folder), MODULES, basename(folder))
}

export async function nestModules(world: World, given: NestModulesAsked): Promise<Answer> {
  const atMost = given.atMost ?? null
  const said: Answer[] = []
  let seen = world
  for (const slug of world.index.slugsOfType(MODULE)) {
    if (atMost !== null && said.length >= atMost) break
    const held = seen.index.listedAt(MODULE, slug)[0]
    if (held === undefined) continue
    const folder = dirname(held.path)
    if (folder === "" || underModules(folder)) continue
    const moved = await reach(seen, MOVE_FOLDER, { from: folder, to: nestedAt(folder) })
    if (moved.said.refused !== null) return refusing(moved.said.refused)
    said.push(moved.said)
    seen = moved.world
  }
  if (said.length === 0) {
    return refusing(`every module's folder sits under a \`${MODULES}\` folder already`)
  }
  return gathered(said)
}

export type Asked = Readonly<Record<string, string>>

export const takes: readonly string[] = [AT_MOST]

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const atMost = atMostIn(given[AT_MOST])
  if (typeof atMost === "string") return refusing(atMost)
  return await nestModules(world, { atMost })
}
