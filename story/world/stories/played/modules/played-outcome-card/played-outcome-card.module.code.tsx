"use client"

import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { colorTextClass } from "akasha/page/ui/component/modules/title-color/title-color.module.code.ts"
import { outcomeTier } from "akasha/story/world/mechanics/checks/outcome-tiers/outcome-tier.page-type.ts"
import { basicSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/basic-success.outcome-tier.ts"
import { criticalFailure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-failure.outcome-tier.ts"
import { criticalSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/critical-success.outcome-tier.ts"
import { failure } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/failure.outcome-tier.ts"
import { greatSuccess } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/great-success.outcome-tier.ts"
import { mixedResults } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/mixed-results.outcome-tier.ts"
import { success } from "akasha/story/world/mechanics/checks/outcome-tiers/pages/success.outcome-tier.ts"
import { useEffect, useState } from "react"

export type Actor = { readonly name: string; readonly color: string | null }

export type OutcomeCard = {
  readonly actor: Actor | null
  readonly action: string | null
  readonly skill: string
  readonly actionDifficulty: string
  readonly outcome: string
  readonly tier: string
  readonly terms: string
  readonly rollKey: string | null
}

type Tier = { readonly slug: string; readonly title: string; readonly color: string }

const TIERS: readonly Tier[] = [
  criticalFailure,
  failure,
  mixedResults,
  basicSuccess,
  success,
  greatSuccess,
  criticalSuccess,
]

const PARTED = "/"

const FRAMES = 18

const FIRST_MS = 35

const SLOWING_MS = 7

const SEEN_KEY = "played-outcomes-seen"

const SEEN_KEPT = 200

const STILL = "(prefers-reduced-motion: reduce)"

const SPIN_MS = 90

const DECIDING = "Deciding…"

const CARD = `rounded-lg border border-surface-3 px-4 py-3 ${surfaceClass(1)}`

export type Keeping = Pick<Storage, "getItem" | "setItem">

export type Frame = { readonly place: number; readonly at: number }

export function tierAt(address: string): number {
  return TIERS.findIndex((one) => `${outcomeTier.slug}${PARTED}${one.slug}` === address)
}

export function tierClass(place: number): string | null {
  const tier = TIERS[place]
  return tier === undefined ? null : colorTextClass(tier.color)
}

export function rollingFrames(landing: number): readonly Frame[] {
  const frames: Frame[] = []
  let at = 0
  for (let step = 0; step < FRAMES; step += 1) {
    frames.push({ place: (landing + 1 + step) % TIERS.length, at })
    at += FIRST_MS + SLOWING_MS * step
  }
  return [...frames, { place: landing, at }]
}

function seenKeys(keeping: Keeping): readonly string[] {
  try {
    const kept: unknown = JSON.parse(keeping.getItem(SEEN_KEY) ?? "[]")
    return Array.isArray(kept) ? kept.filter((one) => typeof one === "string") : []
  } catch {
    return []
  }
}

export function seenIn(keeping: Keeping, key: string): boolean {
  return seenKeys(keeping).includes(key)
}

export function seenNow(keeping: Keeping, key: string): undefined {
  const kept = seenKeys(keeping).filter((one) => one !== key)
  try {
    keeping.setItem(SEEN_KEY, JSON.stringify([...kept, key].slice(-SEEN_KEPT)))
  } catch {
    return undefined
  }
  return undefined
}

type Here = {
  readonly localStorage?: Keeping
  readonly matchMedia?: (query: string) => { readonly matches: boolean }
}

const HERE: Here = globalThis

function rollsNow(key: string | null, landing: number): boolean {
  if (key === null || landing < 0) return false
  try {
    const kept = HERE.localStorage
    const still = HERE.matchMedia?.(STILL).matches ?? true
    return kept !== undefined && !seenIn(kept, key) && !still
  } catch {
    return false
  }
}

function RolledOutcome({ card }: { readonly card: OutcomeCard }) {
  const landing = tierAt(card.tier)
  const [rolls] = useState(() => rollsNow(card.rollKey, landing))
  const [place, setPlace] = useState(() => (rolls ? landing + 1 : landing) % TIERS.length)
  useEffect(() => {
    const kept = HERE.localStorage
    if (card.rollKey !== null && kept !== undefined) seenNow(kept, card.rollKey)
    if (!rolls) return undefined
    const timers = rollingFrames(landing).map((frame) =>
      setTimeout(() => setPlace(frame.place), frame.at)
    )
    return () => {
      for (const one of timers) clearTimeout(one)
    }
  }, [card.rollKey, landing, rolls])
  const shown = place === landing ? card.outcome : (TIERS[place]?.title ?? card.outcome)
  return (
    <p className={`font-semibold text-sm ${tierClass(place) ?? ""}`}>
      <span className="sr-only">{card.outcome}</span>
      <span aria-hidden="true">{shown}</span>
    </p>
  )
}

export function PendingCard({ action }: { readonly action: string }) {
  const [still] = useState(() => HERE.matchMedia?.(STILL).matches ?? true)
  const [place, setPlace] = useState(0)
  useEffect(() => {
    if (still) return undefined
    const every = setInterval(() => setPlace((at) => (at + 1) % TIERS.length), SPIN_MS)
    return () => clearInterval(every)
  }, [still])
  const shown = still ? DECIDING : (TIERS[place]?.title ?? DECIDING)
  const tint = still ? "text-tertiary" : (tierClass(place) ?? "")
  return (
    <div className={CARD}>
      <p className="text-sm">{action}</p>
      <p className={`mt-1 pl-4 font-semibold text-sm ${tint}`}>
        <span className="sr-only">{DECIDING}</span>
        <span aria-hidden="true">{shown}</span>
      </p>
    </div>
  )
}

function ActedLine({ card }: { readonly card: OutcomeCard }) {
  const { actor, action } = card
  if (actor === null && action === null) return null
  return (
    <p className="text-sm">
      {actor === null ? null : (
        <span className={`font-semibold ${colorTextClass(actor.color) ?? "text-primary"}`}>
          {actor.name}
        </span>
      )}
      {actor === null || action === null ? null : <span className="text-secondary">: </span>}
      {action}
    </p>
  )
}

export function OutcomeCards({ cards }: { readonly cards: readonly OutcomeCard[] | undefined }) {
  if (cards === undefined || cards.length === 0) return null
  return (
    <div className="flex flex-col gap-2">
      {cards.map((card, place) => (
        <div key={card.rollKey ?? `${place}:${card.outcome}`} className={CARD}>
          <ActedLine card={card} />
          <div className={card.actor === null && card.action === null ? "" : "mt-1 pl-4"}>
            <p className="text-tertiary text-xs">
              ({card.skill === "" ? "" : `${card.skill} · `}
              {card.actionDifficulty})
            </p>
            <RolledOutcome card={card} />
            {card.terms === "" ? null : <p className="text-tertiary text-xs">{card.terms}</p>}
          </div>
        </div>
      ))}
    </div>
  )
}
