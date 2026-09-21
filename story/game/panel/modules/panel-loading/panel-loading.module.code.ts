"use client"

import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import { gamePanel } from "akasha/story/game/panel/game-panel.page-type.ts"
import type { PanelDrawing } from "akasha/story/game/panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { offerDrawing } from "akasha/story/game/panel/modules/panel-offering/panel-offering.module.code.tsx"
import { type ReactElement, useEffect, useState } from "react"

const SLUG_KEY = "slug"

const DRAWN_KEY = "drawn"

const DRAWN_ENDING = "js"

const SHOWN = "Panel"

const SCRIPT = "text/javascript"

export type Drawn = (drawing: PanelDrawing) => ReactElement

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

async function bodiesFor(): Promise<ReadonlyMap<string, string>> {
  const asked = await askComposed({
    "page-type": gamePanel.slug,
    keys: [SLUG_KEY, DRAWN_KEY],
    files: [DRAWN_KEY],
  })
  const held = new Map<string, string>()
  if (!asked.ok) return held
  for (const row of asked.answer.rows) {
    const slug = row.values[SLUG_KEY]
    const body = bodyIn(row.values)
    if (typeof slug === "string" && body !== null) held.set(slug, body)
  }
  return held
}

async function panelsFor(named: readonly string[]): Promise<readonly Drawn[]> {
  const slugs = slugsIn(named)
  if (slugs.length === 0) return []
  offerDrawing()
  const bodies = await bodiesFor()
  const held: Drawn[] = []
  for (const slug of slugs) {
    const body = bodies.get(slug)
    if (body === undefined) continue
    const drawn = await drawnFrom(body)
    if (drawn !== null) held.push(drawn)
  }
  return held
}

const NONE: readonly Drawn[] = []

export function usePanelsDrawn(named: readonly string[]): readonly Drawn[] {
  const [held, setHeld] = useState<readonly Drawn[]>(NONE)
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
