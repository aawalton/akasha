import { dirname, join } from "node:path"
import {
  gathered,
  missing,
  refusing,
} from "../../../modules/change-answer/change-answer.module.code.ts"
import type { Answer } from "../../../modules/change-answer/change-answer.module.types.ts"
import { reach, type World } from "../../../modules/change-shadow/change-shadow.module.code.ts"

const CHANGE_DOMAIN_PARENT = "change-agent/change-domain-parent"

const COMMAND = "command"

const HYPHEN = "-"

const MOVE_PAGE = "change-agent/move-page"

const NAMESPACE = "namespace"

const PART_SLUGS = "part-slugs"

const ROOT = "commands/pages"

export type NestCommandsAsked = {
  readonly namespace: string
}

export type Carrying =
  | { readonly said: readonly Answer[]; readonly world: World }
  | { readonly refused: string }

export function heldBy(slugs: readonly string[], slug: string): string | null {
  let best: string | null = null
  for (const one of slugs) {
    if (one === slug || !slug.startsWith(one + HYPHEN)) continue
    if (best === null || one.length > best.length) best = one
  }
  return best
}

export function folderFor(slugs: readonly string[], slug: string): string {
  const above = heldBy(slugs, slug)
  return above === null ? join(ROOT, slug) : join(folderFor(slugs, above), slug)
}

export async function carriedTo(world: World, at: string, to: string): Promise<Carrying> {
  if (dirname(at) === to) return { said: [], world }
  const carried = await reach(world, MOVE_PAGE, { at, to })
  if (carried.said.refused !== null) return { refused: carried.said.refused }
  return { said: [carried.said], world: carried.world }
}

export async function parentedUnder(
  world: World,
  slug: string,
  holder: string,
  under: string
): Promise<Carrying> {
  const held = world.index.listedAt(COMMAND, slug)[0]
  if (held === undefined) return { refused: `\`${slug}\` is at no path` }
  if (world.index.idsNaming(held.id, PART_SLUGS).includes(holder)) return { said: [], world }
  const put = await reach(world, CHANGE_DOMAIN_PARENT, {
    page: `${COMMAND}/${slug}`,
    to: `${NAMESPACE}/${under}`,
  })
  if (put.said.refused !== null) return { refused: put.said.refused }
  return { said: [put.said], world: put.world }
}

export async function nestCommands(world: World, given: NestCommandsAsked): Promise<Answer> {
  const slugs = world.index.slugsOfType(NAMESPACE)
  const holder = world.index.listedAt(NAMESPACE, given.namespace)[0]
  if (holder === undefined) return refusing(`\`${given.namespace}\` names no namespace`)
  const folder = folderFor(slugs, given.namespace)
  const said: Answer[] = []
  const carried = await carriedTo(world, holder.path, folder)
  if ("refused" in carried) return refusing(carried.refused)
  said.push(...carried.said)
  let seen = carried.world
  for (const slug of world.index.slugsOfType(COMMAND)) {
    if (heldBy(slugs, slug) !== given.namespace) continue
    const held = seen.index.listedAt(COMMAND, slug)[0]
    if (held !== undefined && !held.path.startsWith(`${ROOT}/`)) continue
    const put = await parentedUnder(seen, slug, holder.id, given.namespace)
    if ("refused" in put) return refusing(put.refused)
    said.push(...put.said)
    const at = put.world.index.listedAt(COMMAND, slug)[0]
    if (at === undefined) return refusing(`\`${slug}\` is at no path`)
    const moved = await carriedTo(put.world, at.path, join(folder, slug))
    if ("refused" in moved) return refusing(moved.refused)
    said.push(...moved.said)
    seen = moved.world
  }
  return gathered(said)
}

export type Asked = Readonly<Record<string, string>>

export async function runChange(world: World, given: Asked): Promise<Answer> {
  const namespace = given[NAMESPACE]
  if (namespace === undefined) return refusing(missing(NAMESPACE))
  return await nestCommands(world, { namespace })
}
