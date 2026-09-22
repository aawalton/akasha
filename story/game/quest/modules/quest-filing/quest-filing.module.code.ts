import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { slugFor } from "akasha/story/game/entity/modules/entity-filing/entity-filing.module.code.ts"
import {
  listIn,
  saidIn,
} from "akasha/story/game/entity/modules/sheet-reading/sheet-reading.module.code.ts"
import {
  type Composed,
  type Filed,
  filedAt,
} from "akasha/story/game/modules/page-filing/page-filing.module.code.ts"
import type { Where } from "akasha/story/game/modules/row-reading/row-reading.module.code.ts"
import type { Placed } from "akasha/story/game/modules/world-filing/world-filing.module.code.ts"
import { gameQuest } from "akasha/story/game/quest/game-quest.page-type.ts"

const QUESTS = "quests"
const OFFERED = "offered"
const ACTIVE = "active"
const UNNAMED = "unnamed"
const UNSTATED = "none stated"
const JOIN = "; "
const KEYS = ["title", "game", "objective", "reward", "status", "note"] as const

export function statusOf(held: unknown): string {
  const said = (saidIn(held) ?? ACTIVE).toLowerCase()
  return said === OFFERED ? ACTIVE : said
}

export function conditionsOf(held: unknown): string | undefined {
  if (!Array.isArray(held)) return undefined
  const said = held.map(saidIn).filter((one) => one !== undefined)
  return said.length === 0 ? undefined : said.join(JOIN)
}

export function questFiled(where: Where, one: Record<string, unknown>): Composed {
  const named = saidIn(one["id"]) ?? UNNAMED
  return filedAt({
    root: where.root,
    folder: where.folder,
    pageTypeSlug: gameQuest.slug,
    plural: gameQuest.pluralSlug,
    slug: slugFor(where.slug, named),
    keys: [...KEYS],
    values: {
      title: saidIn(one["title"]) ?? named,
      game: where.game,
      objective: saidIn(one["objective"]) ?? UNSTATED,
      reward: saidIn(one["reward"]),
      status: statusOf(one["status"]),
      note: conditionsOf(one["conditions"]),
    },
  })
}

export function everyQuestFiled(where: Where, rows: readonly unknown[]): Placed {
  const last = rows.filter(isRecord).at(-1)
  if (last === undefined) return { answered: [] }
  const found: Filed[] = []
  for (const one of listIn(last[QUESTS])) {
    const filed = questFiled(where, one)
    if ("refused" in filed) return filed
    found.push(filed.answered)
  }
  return { answered: found }
}
