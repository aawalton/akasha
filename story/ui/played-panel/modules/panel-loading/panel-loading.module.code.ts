"use client"

import { addressIn } from "akasha/page/modules/address/page-address.module.code.ts"
import type { PanelDrawing } from "akasha/story/ui/played-panel/modules/panel-drawing/panel-drawing.module.code.ts"
import { offerDrawing } from "akasha/story/ui/played-panel/modules/panel-offering/panel-offering.module.code.tsx"
import { playedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { type ReactElement, useEffect, useState } from "react"

const SLUG_KEY = "slug"

const DRAWN_KEY = "drawn"

const PLACE_KEY = "place"

const POSITION_KEY = "position"

const DRAWN_ENDING = "js"

const SHOWN = "Panel"

const SCRIPT = "text/javascript"

type Drawn = (drawing: PanelDrawing) => ReactElement

export type Shown = {
  readonly slug: string
  readonly place: string
  readonly drawn: Drawn
}

type Held = {
  readonly place: string
  readonly position: number
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

export async function drawnFrom(body: string): Promise<Drawn | null> {
  const at = URL.createObjectURL(new Blob([body], { type: SCRIPT }))
  try {
    const held = (await import(at)) as Record<string, unknown>
    const shown = held[SHOWN]
    return typeof shown === "function" ? (shown as Drawn) : null
  } catch {
    return null
  } finally {
    URL.revokeObjectURL(at)
  }
}

async function bodiesFor(): Promise<ReadonlyMap<string, Held>> {
  const asked = await askedLoudly({
    "page-type": playedPanel.slug,
    keys: [SLUG_KEY, DRAWN_KEY, PLACE_KEY, POSITION_KEY],
    files: [DRAWN_KEY],
  })
  const held = new Map<string, Held>()
  if (!asked.ok) return held
  for (const row of asked.answer.rows) {
    const slug = row.values[SLUG_KEY]
    const place = row.values[PLACE_KEY]
    const position = row.values[POSITION_KEY]
    const body = bodyIn(row.values)
    if (typeof slug !== "string" || typeof place !== "string" || body === null) continue
    if (typeof position !== "number") continue
    held.set(slug, { place, position, body })
  }
  return held
}

function positionOf(bodies: ReadonlyMap<string, Held>, slug: string): number {
  return bodies.get(slug)?.position ?? Number.POSITIVE_INFINITY
}

async function panelsFor(named: readonly string[]): Promise<readonly Shown[]> {
  const slugs = slugsIn(named)
  if (slugs.length === 0) return []
  offerDrawing()
  const bodies = await bodiesFor()
  const ordered = slugs.toSorted(
    (one, other) => positionOf(bodies, one) - positionOf(bodies, other)
  )
  const held: Shown[] = []
  for (const slug of ordered) {
    const one = bodies.get(slug)
    if (one === undefined) continue
    const drawn = await drawnFrom(one.body)
    if (drawn !== null) held.push({ slug, place: one.place, drawn })
  }
  return held
}

const NONE: readonly Shown[] = []

type Loading = (named: readonly string[]) => Promise<readonly Shown[]>

export async function panelsSettled(
  named: readonly string[],
  load: Loading = panelsFor
): Promise<readonly Shown[]> {
  try {
    return await load(named)
  } catch (thrown) {
    reportThrown(`loading the panels ${named.join(", ")}`, thrown)
    return NONE
  }
}

export function usePanelsDrawn(named: readonly string[]): readonly Shown[] {
  return usePanelsHeld(named) ?? NONE
}

export function usePanelsHeld(named: readonly string[]): readonly Shown[] | null {
  const [held, setHeld] = useState<readonly Shown[] | null>(null)
  const keyed = named.join(" ")

  useEffect(() => {
    let alive = true
    void (async () => {
      const found = await panelsSettled(keyed === "" ? [] : keyed.split(" "))
      if (alive) setHeld(found)
    })()
    return () => {
      alive = false
    }
  }, [keyed])

  return held
}
