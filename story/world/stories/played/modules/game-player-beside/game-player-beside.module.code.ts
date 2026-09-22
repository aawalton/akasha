"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"

const GAME_TYPE = "game"

const EXTERNAL_KEY = "externalId"

const PLAYER_KEY = "player"

export type Played = { readonly values: Record<string, unknown> }

export function playerIn(rows: readonly Played[]): string | null {
  for (const row of rows) {
    const named = row.values[PLAYER_KEY]
    if (typeof named === "string" && named !== "") return named
  }
  return null
}

export async function playerOf(game: string): Promise<string | null> {
  const asked = await askComposed({
    "page-type": GAME_TYPE,
    where: { externalId: { is: game } },
    keys: [EXTERNAL_KEY, PLAYER_KEY],
  })
  return asked.ok ? playerIn(asked.answer.rows) : null
}
