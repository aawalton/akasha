import type { Asked } from "akasha/command/pages/story/turn/correct/modules/correct-handing/correct-handing.module.code.ts"
import type { Turn } from "akasha/command/pages/story/turn/modules/turn-reaching/turn-reaching.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { textAt } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type BeatProse,
  proseWritten,
} from "akasha/story/engine/beat-state/modules/beat-prose/beat-prose.module.code.ts"
import type { Beats } from "akasha/story/engine/beat-state/modules/beat-records/beat-records.module.code.ts"

const PROSE = "prose"

const PROSE_HELD = "txt"

const PARAGRAPH = "\n\n"

type Refused = { readonly refused: string }

export type Told = {
  readonly prose: readonly BeatProse[] | undefined
  readonly text: string | null
  readonly at: string
}

export type Retelling = {
  readonly present: (path: string) => boolean
  readonly textOf: (path: string) => string
}

function paragraphsOf(prose: string): number {
  return prose.split(PARAGRAPH).length
}

function reshaped(old: BeatProse, now: BeatProse): boolean {
  const continued = (one: BeatProse) => one.continues === true
  return paragraphsOf(old.prose) !== paragraphsOf(now.prose) || continued(old) !== continued(now)
}

export function proseTold(
  reading: Retelling,
  page: Turn,
  beats: Beats,
  asked: Asked,
  chapter: boolean
): Told | Refused {
  const at = besideAt(page.at, PROSE, textAt(page.value, PROSE) ?? PROSE_HELD) ?? page.at
  if (asked.prose === null) return { prose: beats.prose, text: null, at }
  const held = beats.prose ?? []
  const old = held.find((one) => one.beat === asked.beat)
  if (old === undefined) {
    return {
      refused: `beat ${asked.beat} carries no prose of its own, so its prose is mended in \`${at}\``,
    }
  }
  const restated = typeof asked.prose === "string" ? { ...old, prose: asked.prose } : asked.prose
  if (chapter && reshaped(old, restated)) {
    return {
      refused: `a chapter keeps the paragraph each turn opens at, so beat ${asked.beat}'s prose keeps its paragraphs and whether it continues the one before`,
    }
  }
  const prose = held.map((one) => (one.beat === asked.beat ? restated : one))
  if (!reading.present(at)) return { prose, text: null, at }
  const text = reading.textOf(at)
  if (text === proseWritten(held)) return { prose, text: proseWritten(prose), at }
  const parts = text.split(old.prose)
  if (parts.length !== 2) {
    return {
      refused: `\`${at}\` holds beat ${asked.beat}'s prose ${parts.length - 1} times, and a correction replaces it once`,
    }
  }
  return { prose, text: parts.join(restated.prose), at }
}
