"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { storyGame } from "akasha/story/game/story-game.page-type.ts"
import { useEffect, useState } from "react"

const GAME_PAGE_TYPE_SLUG = storyGame.slug

const SLUG_KEY = "slug"

const EXTERNAL_ID_KEY = "externalId"

const COORDINATOR_AGENT_KEY = "coordinatorAgent"

interface GameBeside {
  readonly externalId: string | undefined
  readonly coordinatorAgent: string | undefined
}

type GameBesideRead =
  | { readonly kind: "waiting" }
  | { readonly kind: "read"; readonly beside: GameBeside }
  | { readonly kind: "none" }
  | { readonly kind: "unread"; readonly why: string }

const WAITING: GameBesideRead = { kind: "waiting" }

function textIn(values: Record<string, unknown>, key: string): string | undefined {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : undefined
}

async function readGameBeside(slug: string): Promise<GameBesideRead> {
  const asked = await askComposed({
    "page-type": GAME_PAGE_TYPE_SLUG,
    where: { slug: { is: slug } },
    keys: [SLUG_KEY, EXTERNAL_ID_KEY, COORDINATOR_AGENT_KEY],
  })
  if (!asked.ok) return { kind: "unread", why: asked.why }
  const values = asked.answer.rows[0]?.values
  if (values === undefined) return { kind: "none" }
  return {
    kind: "read",
    beside: {
      externalId: textIn(values, EXTERNAL_ID_KEY),
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
