"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import {
  GameDisplayConfigSchema,
  type ResolvedGameDisplay,
  resolveGameDisplay,
} from "akasha/story/engine/core/modules/game-schema/game-schema.module.code.ts"
import {
  type GameState,
  GameStateSchema,
} from "akasha/story/engine/core/modules/state-schema/state-schema.module.code.ts"
import { useEffect, useState } from "react"

const GAME_PAGE_TYPE_SLUG = "game"

const SLUG_KEY = "slug"

const EXTERNAL_ID_KEY = "externalId"

const GAME_ENGINE_KEY = "gameEngine"

const DISPLAY_CONFIG_KEY = "displayConfig"

const STATES_KEY = "states"

const DISPLAY_CONFIG_ENDING = "json"

const STATES_ENDING = "jsonl"

export interface GameBeside {
  readonly externalId: string | undefined
  readonly display: ResolvedGameDisplay | null
  readonly state: GameState | null
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

function lastRowIn(body: string | null): string | null {
  if (body === null) return null
  const rows = body.split("\n").filter((row) => row.trim() !== "")
  return rows.at(-1) ?? null
}

function displayIn(
  body: string | null,
  gameEngine: string | undefined
): ResolvedGameDisplay | null {
  const read = GameDisplayConfigSchema.safeParse(jsonIn(body))
  return read.success ? resolveGameDisplay(read.data, gameEngine) : null
}

function stateIn(body: string | null): GameState | null {
  const read = GameStateSchema.safeParse(jsonIn(lastRowIn(body)))
  return read.success ? read.data : null
}

async function readGameBeside(slug: string): Promise<GameBesideRead> {
  const asked = await askComposed({
    "page-type": GAME_PAGE_TYPE_SLUG,
    where: { slug: { is: slug } },
    keys: [SLUG_KEY, EXTERNAL_ID_KEY, GAME_ENGINE_KEY, DISPLAY_CONFIG_KEY, STATES_KEY],
    files: [DISPLAY_CONFIG_KEY, STATES_KEY],
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
      state: stateIn(bodyIn(values, STATES_KEY, STATES_ENDING)),
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
