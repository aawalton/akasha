"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import {
  GameDisplayConfigSchema,
  type ResolvedGameDisplay,
  resolveGameDisplay,
} from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import { useEffect, useState } from "react"

const GAME_PAGE_TYPE_SLUG = "game"

const SLUG_KEY = "slug"

const EXTERNAL_ID_KEY = "externalId"

const GAME_ENGINE_KEY = "gameEngine"

const DISPLAY_CONFIG_KEY = "displayConfig"

const PLAYER_KEY = "player"

const PANELS_KEY = "panels"

const COORDINATOR_AGENT_KEY = "coordinatorAgent"

const DISPLAY_CONFIG_ENDING = "json"

export interface GameBeside {
  readonly externalId: string | undefined
  readonly display: ResolvedGameDisplay | null
  readonly player: string | undefined
  readonly panels: readonly string[]
  readonly coordinatorAgent: string | undefined
}

export type GameBesideRead =
  | { readonly kind: "waiting" }
  | { readonly kind: "read"; readonly beside: GameBeside }
  | { readonly kind: "none" }
  | { readonly kind: "unread"; readonly why: string }

const WAITING: GameBesideRead = { kind: "waiting" }

function textIn(values: Record<string, unknown>, key: string): string | undefined {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : undefined
}

function namesIn(values: Record<string, unknown>, key: string): readonly string[] {
  const held = values[key]
  if (typeof held === "string") return [held]
  if (!Array.isArray(held)) return []
  return held.filter((one): one is string => typeof one === "string")
}

function bodyIn(values: Record<string, unknown>, key: string, ending: string): string | null {
  const held = textIn(values, key)
  return held === undefined || held === ending ? null : held
}

function jsonIn(body: string | null): unknown {
  if (body === null) return null
  try {
    return JSON.parse(body)
  } catch {
    return null
  }
}

function displayIn(
  body: string | null,
  gameEngine: string | undefined
): ResolvedGameDisplay | null {
  const read = GameDisplayConfigSchema.safeParse(jsonIn(body))
  return read.success ? resolveGameDisplay(read.data, gameEngine) : null
}

async function readGameBeside(slug: string): Promise<GameBesideRead> {
  const asked = await askComposed({
    "page-type": GAME_PAGE_TYPE_SLUG,
    where: { slug: { is: slug } },
    keys: [
      SLUG_KEY,
      EXTERNAL_ID_KEY,
      GAME_ENGINE_KEY,
      DISPLAY_CONFIG_KEY,
      PLAYER_KEY,
      PANELS_KEY,
      COORDINATOR_AGENT_KEY,
    ],
    files: [DISPLAY_CONFIG_KEY],
  })
  if (!asked.ok) return { kind: "unread", why: asked.why }
  const values = asked.answer.rows[0]?.values
  if (values === undefined) return { kind: "none" }
  const gameEngine = textIn(values, GAME_ENGINE_KEY)
  return {
    kind: "read",
    beside: {
      externalId: textIn(values, EXTERNAL_ID_KEY),
      display: displayIn(bodyIn(values, DISPLAY_CONFIG_KEY, DISPLAY_CONFIG_ENDING), gameEngine),
      player: textIn(values, PLAYER_KEY),
      panels: namesIn(values, PANELS_KEY),
      coordinatorAgent: textIn(values, COORDINATOR_AGENT_KEY),
    },
  }
}

export function useGameBeside(slug: string): GameBesideRead {
  const [read, setRead] = useState<GameBesideRead>(WAITING)

  useEffect(() => {
    if (slug === "") return
    let alive = true
    setRead(WAITING)
    void (async () => {
      try {
        const held = await readGameBeside(slug)
        if (alive) setRead(held)
      } catch (thrown) {
        if (alive) setRead({ kind: "unread", why: saidBy(thrown) })
      }
    })()
    return () => {
      alive = false
    }
  }, [slug])

  return read
}
