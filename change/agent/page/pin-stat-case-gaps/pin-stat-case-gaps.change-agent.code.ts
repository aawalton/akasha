import {
  type Answer,
  type FileChange,
  missing,
  refusing,
  stating,
} from "akasha/change/modules/answer/change-answer.module.code.ts"
import type { World } from "akasha/change/modules/shadow/change-shadow.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import {
  statCaseShape,
  statCaseText,
} from "akasha/temper/player/character/stat/modules/stat-case/stat-case.module.code.ts"
import { verifiedStats } from "akasha/temper/player/character/stat/temper-stat-case/properties/verified-stats.file-property.ts"
import { temperStatCase } from "akasha/temper/player/character/stat/temper-stat-case/temper-stat-case.page-type.ts"

const STAT = "stat"

const CASES = "cases"

type Asked = Readonly<Record<string, string>>

function inOrder(stats: Readonly<Record<string, number>>): Record<string, number> {
  const ordered: Record<string, number> = {}
  for (const stat of Object.keys(stats).sort()) ordered[stat] = stats[stat] ?? 0
  return ordered
}

function pinnedIn(world: World, slug: string, stat: string): FileChange | string {
  const pageAt = world.index.listedAt(temperStatCase.slug, slug)[0]?.path
  if (pageAt === undefined) return `\`${slug}\` names no stat case`
  const statsAt = besideAt(pageAt, verifiedStats.propertySlug, "json")
  const text = statsAt === null ? null : world.textOf(statsAt)
  if (statsAt === null || text === null) return `\`${slug}\` holds no verified stats`
  const parsed = statCaseShape.safeParse(JSON.parse(text))
  if (!parsed.success) return `the verified stats of \`${slug}\` do not read`
  const statCase = parsed.data
  if (statCaseText(statCase) !== text) {
    return `the verified stats of \`${slug}\` are not written as a case is written`
  }
  const gap = statCase.gaps[stat]
  if (gap === undefined) return `\`${slug}\` keeps no gap for \`${stat}\``
  const gaps = Object.fromEntries(Object.entries(statCase.gaps).filter(([one]) => one !== stat))
  const pinned = inOrder({ ...statCase.pinned, [stat]: gap })
  return {
    kind: "replace",
    path: statsAt,
    contentFrom: text,
    contentTo: statCaseText({ ...statCase, pinned, gaps }),
  }
}

export function pinStatCaseGapsCommand(world: World, given: Asked): Answer {
  const stat = given[STAT]
  if (stat === undefined) return refusing(missing(STAT))
  const named = given[CASES]
  if (named === undefined) return refusing(missing(CASES))
  const slugs = named
    .split("\n")
    .map((one) => one.trim())
    .filter((one) => one !== "")
  if (slugs.length === 0) return refusing(`\`${CASES}\` names no case`)
  const edits: FileChange[] = []
  for (const slug of slugs) {
    const one = pinnedIn(world, slug, stat)
    if (typeof one === "string") return refusing(one)
    edits.push(one)
  }
  return stating(edits)
}

export const takes: readonly string[] = [STAT, CASES]

export function runChange(world: World, given: Asked): Promise<Answer> {
  return Promise.resolve(pinStatCaseGapsCommand(world, given))
}
