"use client"

import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { gamePanel } from "akasha/story/game/game-panel/game-panel.page-type.ts"
import type { PanelDrawing } from "akasha/story/game/game-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { offerDrawing } from "akasha/story/game/game-panel/modules/panel-offering/panel-offering.module.code.tsx"
import { type ReactElement, useEffect, useState } from "react"

const SLUG_KEY = "slug"

const DRAWN_KEY = "drawn"

const PLACE_KEY = "place"

const DRAWN_ENDING = "js"

const SHOWN = "Panel"

const SCRIPT = "text/javascript"

export type Drawn = (drawing: PanelDrawing) => ReactElement

export type Shown = {
  readonly slug: string
  readonly place: string
  readonly drawn: Drawn
}

type Held = {
  readonly place: string
  readonly body: string
}

export function shownIn(shown: readonly Shown[], place: string): readonly Shown[] {
  return shown.filter((one) => one.place === place)
}

function slugsIn(named: readonly string[]): readonly string[] {
  const held: string[] = []
  for (const one of named) {
    const address = addressIn(one)
    if (address.kind === "qualified") held.push(address.slug)
  }
  return held
}

function bodyIn(values: Record<string, unknown>): string | null {
  const held = values[DRAWN_KEY]
  if (typeof held !== "string" || held === "" || held === DRAWN_ENDING) return null
  return held
}

async function drawnFrom(body: string): Promise<Drawn | null> {
  const at = URL.createObjectURL(new Blob([body], { type: SCRIPT }))
  try {
    const held = (await import(at)) as Record<string, unknown>
    const shown = held[SHOWN]
    return typeof shown === "function" ? (shown as Drawn) : null
  } finally {
    URL.revokeObjectURL(at)
  }
}

async function bodiesFor(): Promise<ReadonlyMap<string, Held>> {
  const asked = await askComposed({
    "page-type": gamePanel.slug,
    keys: [SLUG_KEY, DRAWN_KEY, PLACE_KEY],
    files: [DRAWN_KEY],
  })
  const held = new Map<string, Held>()
  if (!asked.ok) return held
  for (const row of asked.answer.rows) {
    const slug = row.values[SLUG_KEY]
    const place = row.values[PLACE_KEY]
    const body = bodyIn(row.values)
    if (typeof slug !== "string" || typeof place !== "string" || body === null) continue
    held.set(slug, { place, body })
  }
  return held
}

async function panelsFor(named: readonly string[]): Promise<readonly Shown[]> {
  const slugs = slugsIn(named)
  if (slugs.length === 0) return []
  offerDrawing()
  const bodies = await bodiesFor()
  const held: Shown[] = []
  for (const slug of slugs) {
    const one = bodies.get(slug)
    if (one === undefined) continue
    const drawn = await drawnFrom(one.body)
    if (drawn !== null) held.push({ slug, place: one.place, drawn })
  }
  return held
}

const NONE: readonly Shown[] = []

export function usePanelsDrawn(named: readonly string[]): readonly Shown[] {
  const [held, setHeld] = useState<readonly Shown[]>(NONE)
  const keyed = named.join(" ")

  useEffect(() => {
    let alive = true
    void (async () => {
      const found = await panelsFor(keyed === "" ? [] : keyed.split(" "))
      if (alive) setHeld(found)
    })()
    return () => {
      alive = false
    }
  }, [keyed])

  return held
}
