import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { Naming } from "akasha/page/service/modules/page-composing/page-composing.module.code.ts"
import {
  lineOf,
  type MechanicRun,
} from "akasha/story/game/game-mechanic/modules/mechanic-run/mechanic-run.module.code.ts"
import { gameMechanicRun } from "akasha/story/game/game-mechanic-run/game-mechanic-run.page-type.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"

const TS = "ts"
const PARTED = "/"
const RUN = "run"
const JSON_HELD = "json"
const PADDED = 3
const SHOWN = 80
const SAID_HOLDS = 2000
const MARK = "…"

const A_RUN_OF_SPACE = /\s+/g

type Paging = {
  readonly gameSlug: string
  readonly folder: string
  readonly run: MechanicRun
  readonly at: number
}

export function shortOf(said: string, holds: number): string {
  const flat = said.replace(A_RUN_OF_SPACE, " ").trim()
  if (flat.length <= holds) return flat
  return `${flat.slice(0, holds - MARK.length).trimEnd()}${MARK}`
}

export function countedAt(at: number): string {
  return String(at).padStart(PADDED, "0")
}

export function runSlugIn(gameSlug: string, word: string, at: number): string {
  return `${gameSlug}-${word}-${countedAt(at)}`
}

export function pathOf(folder: string, slug: string, pageTypeSlug: string): string {
  return `${folder}${PARTED}${slug}.${pageTypeSlug}.${TS}`
}

export function pagedRun({ gameSlug, folder, run, at }: Paging): Naming {
  const slug = runSlugIn(gameSlug, RUN, at)
  return {
    pageTypeSlug: gameMechanicRun.slug,
    slug,
    path: pathOf(folder, slug, gameMechanicRun.slug),
    values: {
      title: shortOf(run.said ?? `${run.mechanic} at turn ${run.turn}`, SHOWN),
      game: namedAs(storyGame.slug, gameSlug, null),
      turn: run.turn,
      mechanic: run.mechanic,
      ...(run.said === null ? {} : { said: shortOf(run.said, SAID_HOLDS) }),
      ...(run.seed === null ? {} : { seed: run.seed }),
      ...(run.follows === null ? {} : { follows: run.follows }),
      workings: JSON_HELD,
    },
    bodies: { workings: lineOf(run) },
  }
}
