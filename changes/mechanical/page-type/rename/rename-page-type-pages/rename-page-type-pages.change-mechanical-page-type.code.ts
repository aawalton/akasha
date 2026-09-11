import { refusing, stating } from "akasha/changes/modules/answer/change-answer.module.code.ts"
import type { FileChange, Said } from "akasha/changes/modules/answer/change-answer.module.types.ts"
import type { Moving } from "akasha/changes/modules/page-type-renaming/page-type-renaming.module.code.ts"
import {
  importersOf,
  keyedAnew,
  manifestsAnew,
  movesOf,
  pagesMoved,
  repointedOver,
} from "akasha/changes/modules/page-type-renaming/page-type-renaming.module.code.ts"
import type { World } from "akasha/changes/modules/shadow/change-shadow.module.code.ts"
import { typeSlugIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { saidBy } from "akasha/utils/narrow/said-by/said-by.module.code.ts"

export type Asked = {
  readonly at: string
  readonly to: string
}

export function renamePageTypePages(world: World, given: Asked): Said {
  const was = typeSlugIn(given.at)
  if (was === null) return refusing(`\`${given.at}\` names no page type, so no page is renamed`)
  let held: Moving
  try {
    held = pagesMoved(world, was, given.to)
  } catch (cause) {
    return refusing(`${saidBy(cause)}, so no page is renamed`)
  }
  if ("refused" in held) return refusing(held.refused)
  const importers = importersOf(world, held.moved)
  if (typeof importers === "string") return refusing(importers)
  const repointed = repointedOver(world, held.moved, [...held.moved.keys(), ...importers])
  if (typeof repointed === "string") return refusing(repointed)
  const ways = manifestsAnew(world, held.moved)
  if (typeof ways === "string") return refusing(ways)
  const edits: FileChange[] = [...movesOf(held.moved), ...repointed, ...ways]
  for (const one of held.paged) {
    const text = world.textOf(one.at)
    if (text === null) continue
    edits.push(...keyedAnew(text, one.lands, was, given.to))
  }
  return stating(edits)
}

export function runChange(world: World, given: Asked): Promise<Said> {
  return Promise.resolve(renamePageTypePages(world, given))
}
