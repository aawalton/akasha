import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import {
  type DayWindow,
  dayAfter,
  esoWindowOf,
  openingInstantFromBlocks,
  type SleepBlockInput,
  windowSpanned,
} from "akasha/alan/harness/health-sample/day/modules/opening-span/opening-span.computed-property-module.code.ts"
import { listedAt } from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { akashaRoot } from "akasha/page/modules/checkout-roots/checkout-roots.module.code.ts"
import { entriesIn } from "akasha/page/modules/entries/page-entries.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"

export interface Refused {
  readonly refused: string
}

const DAY_PAGE_TYPE = "day"

const SESSIONS_SLUG = "sessions"

const ENTRY_EXTENSION = "jsonl"

const DAY_SLUG_PREFIX = "day-"

const SLEEP = "sleep"

const TITLE = "title"

const STARTED_AT = "startedAt"

const ENDED_AT = "endedAt"

export function sleepBlocksOn(root: string, dayStr: string): readonly SleepBlockInput[] | Refused {
  const slug = `${DAY_SLUG_PREFIX}${dayStr}`
  const listed = listedAt(root, DAY_PAGE_TYPE, slug)
  const page = listed.length === 1 ? listed[0]?.path : undefined
  if (page === undefined) {
    return {
      refused:
        `the index names ${listed.length} \`${DAY_PAGE_TYPE}\` page under '${slug}' and a day ` +
        "is one page",
    }
  }
  const at = besideAt(page, SESSIONS_SLUG, ENTRY_EXTENSION)
  if (at === null) return { refused: `'${page}' is no page file, so nothing sits beside it` }
  if (!existsSync(join(root, at))) {
    return {
      refused: `'${at}' is where ${dayStr} would keep its stretches of time and nothing is there`,
    }
  }
  const read = entriesIn(at, readFileSync(join(root, at), "utf8"))
  if ("refused" in read) return read
  return read.entries.map((one) => ({
    title: one[TITLE],
    startedAt: one[STARTED_AT],
    endedAt: one[ENDED_AT],
  }))
}

export function openingInstantOn(root: string, dayStr: string): Date | Refused {
  if (esoWindowOf(dayStr) === null) {
    return {
      refused: `'${dayStr}' is no day, so there is no evening to read a sleep block against`,
    }
  }
  const blocks = sleepBlocksOn(root, dayStr)
  if ("refused" in blocks) return blocks
  const opening = openingInstantFromBlocks(blocks, dayStr)
  if (opening === null) {
    return {
      refused:
        `${dayStr} holds ${blocks.length} stretch(es) of time and none titled ${SLEEP} starts or ` +
        "runs past six the evening before, so when the day opened is not recorded",
    }
  }
  return opening
}

function openedAt(opening: Date | Refused): Date | null {
  return "refused" in opening ? null : opening
}

function noSpanOver(dayStr: string): Refused {
  return { refused: `'${dayStr}' is no day, so no span can be counted over it` }
}

export function spannedWindowIn(root: string, dayStr: string): DayWindow | Refused {
  if (esoWindowOf(dayStr) === null) return noSpanOver(dayStr)
  const opening = openedAt(openingInstantOn(root, dayStr))
  const next = openedAt(openingInstantOn(root, dayAfter(dayStr)))
  return windowSpanned(dayStr, opening, next) ?? noSpanOver(dayStr)
}

export function spannedWindow(dayStr: string): DayWindow | Refused {
  return spannedWindowIn(akashaRoot(), dayStr)
}
