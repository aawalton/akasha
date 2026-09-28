"use client"

import { saidBy } from "akasha/code/type/narrowing/modules/said-by/said-by.module.code.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { useEffect, useState } from "react"

const PLAYED_PAGE_TYPE_SLUG = storyPlayed.slug

const SLUG_KEY = "slug"

const EXTERNAL_ID_KEY = "externalId"

const COORDINATOR_AGENT_KEY = "coordinatorAgent"

interface PlayedBeside {
  readonly externalId: string | undefined
  readonly coordinatorAgent: string | undefined
}

type PlayedBesideRead =
  | { readonly kind: "waiting" }
  | { readonly kind: "read"; readonly beside: PlayedBeside }
  | { readonly kind: "none" }
  | { readonly kind: "unread"; readonly why: string }

const WAITING: PlayedBesideRead = { kind: "waiting" }

function textIn(values: Record<string, unknown>, key: string): string | undefined {
  const held = values[key]
  return typeof held === "string" && held !== "" ? held : undefined
}

async function readPlayedBeside(slug: string): Promise<PlayedBesideRead> {
  const asked = await askedLoudly({
    "page-type": PLAYED_PAGE_TYPE_SLUG,
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

export function usePlayedBeside(slug: string): PlayedBesideRead {
  const [read, setRead] = useState<PlayedBesideRead>(WAITING)

  useEffect(() => {
    if (slug === "") return
    let alive = true
    setRead(WAITING)
    void (async () => {
      try {
        const held = await readPlayedBeside(slug)
        if (alive) setRead(held)
      } catch (thrown) {
        reportThrown(`reading the story played ${slug}`, thrown)
        if (alive) setRead({ kind: "unread", why: saidBy(thrown) })
      }
    })()
    return () => {
      alive = false
    }
  }, [slug])

  return read
}
