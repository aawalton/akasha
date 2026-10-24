import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"

export const TYPING_AT = "/api/seat/typing"

export const TYPING_HELD_MS = 8_000

export const TYPING_BEAT_MS = 3_000

export const TYPING = "typing"

const SEAT = "seat"

const WORKING = `${seatTurnState.slug}/${working.slug}`

const PARTED_BY = "/"

export type Typing = { readonly person: string; readonly at: string }

function personSlug(person: string): string {
  return person.slice(person.lastIndexOf(PARTED_BY) + 1)
}

function instantOf(one: Typing): number {
  return Date.parse(one.at)
}

export function typingIn(held: unknown): readonly Typing[] {
  if (!Array.isArray(held)) return []
  const found: Typing[] = []
  for (const one of held) {
    if (typeof one !== "object" || one === null) continue
    const { person, at } = one as { readonly person?: unknown; readonly at?: unknown }
    if (typeof person !== "string" || typeof at !== "string") continue
    if (Number.isNaN(Date.parse(at))) continue
    found.push({ person, at })
  }
  return found
}

function live(one: Typing, now: number): boolean {
  const at = instantOf(one)
  return at <= now + TYPING_HELD_MS && now - at < TYPING_HELD_MS
}

export function typingAfter(
  held: readonly Typing[],
  person: string,
  typing: boolean,
  now: number
): readonly Typing[] {
  const slug = personSlug(person)
  const kept = held.filter((one) => personSlug(one.person) !== slug && live(one, now))
  return typing ? [...kept, { person, at: new Date(now).toISOString() }] : kept
}

export function othersTyping(
  held: readonly Typing[],
  me: string | null,
  now: number
): readonly string[] {
  if (me === null) return []
  const mine = personSlug(me)
  const named = new Set<string>()
  for (const one of held) {
    const slug = personSlug(one.person)
    if (slug !== mine && live(one, now)) named.add(slug)
  }
  return [...named]
}

export function nextLapse(held: readonly Typing[], now: number): number | null {
  let soonest: number | null = null
  for (const one of held) {
    if (!live(one, now)) continue
    const lapse = instantOf(one) + TYPING_HELD_MS
    if (soonest === null || lapse < soonest) soonest = lapse
  }
  return soonest
}

export function typingSaid(persons: readonly string[]): string | null {
  const names = persons.map(titledAs)
  if (names.length === 0) return null
  if (names.length === 1) return `${names[0]} is typing`
  return `${names.slice(0, -1).join(", ")} and ${names.at(-1)} are typing`
}

export function replyingSaid(turnState: string | null, persona: unknown): string | null {
  if (turnState !== WORKING || typeof persona !== "string" || persona === "") return null
  return `${titledAs(persona)} is replying`
}

export function beatDue(sent: number | null, now: number): boolean {
  return sent === null || now - sent >= TYPING_BEAT_MS
}

function told(seat: string, typing: boolean): undefined {
  void fetch(TYPING_AT, {
    method: "POST",
    headers: { accept: "application/json", "content-type": "application/json" },
    body: JSON.stringify({ seat, typing }),
    keepalive: true,
  }).catch(() => undefined)
  return undefined
}

export type TypingBeat = {
  readonly typed: (text: string) => undefined
  readonly stopped: () => undefined
}

export function useTypingBeat(seat: string): TypingBeat {
  const sent = useRef<number | null>(null)
  const stopped = useCallback((): undefined => {
    if (sent.current === null) return undefined
    sent.current = null
    return told(seat, false)
  }, [seat])
  const typed = useCallback(
    (text: string): undefined => {
      if (text.trim() === "") return stopped()
      const now = Date.now()
      if (!beatDue(sent.current, now)) return undefined
      sent.current = now
      return told(seat, true)
    },
    [seat, stopped]
  )
  useEffect(() => stopped, [stopped])
  return { typed, stopped }
}

function personIn(said: unknown): string | null {
  if (typeof said !== "object" || said === null) return null
  const person = (said as { readonly person?: unknown }).person
  return typeof person === "string" && person !== "" ? person : null
}

function useMe(): string | null {
  const [me, setMe] = useState<string | null>(null)
  useEffect(() => {
    let dropped = false
    void fetch(TYPING_AT, { headers: { accept: "application/json" } })
      .then((answered) => (answered.ok ? answered.json() : null))
      .then((said: unknown) => {
        if (!dropped) setMe(personIn(said))
      })
      .catch(() => undefined)
    return () => {
      dropped = true
    }
  }, [])
  return me
}

function useTypingHeld(seat: string): readonly Typing[] {
  const [held, setHeld] = useState<readonly Typing[]>([])
  useEffect(() => {
    setHeld([])
    let dropped = false
    let asking = false
    let owed = false
    const ask = (): undefined => {
      if (asking) {
        owed = true
        return undefined
      }
      asking = true
      void askComposed({ "page-type": SEAT, where: { id: { is: seat } }, keys: [TYPING], limit: 1 })
        .then((asked) => {
          if (!dropped && asked.ok) setHeld(typingIn(asked.answer.rows[0]?.values?.[TYPING]))
        })
        .catch(() => undefined)
        .finally(() => {
          asking = false
          if (owed && !dropped) {
            owed = false
            ask()
          }
        })
      return undefined
    }
    ask()
    let watch: PageWatch | null = null
    void getPagesStore().then((store) => {
      if (!dropped) watch = store.watchPage(SEAT, seat, ask)
    })
    const timer = setInterval(() => {
      if (watch?.live() !== true) ask()
    }, FILE_BACKING_POLL_MS)
    return () => {
      dropped = true
      clearInterval(timer)
      watch?.release()
    }
  }, [seat])
  return held
}

export function useOthersTyping(seat: string): readonly string[] {
  const me = useMe()
  const held = useTypingHeld(seat)
  const [now, setNow] = useState(() => Date.now())
  useEffect(() => {
    setNow(Date.now())
  }, [held])
  useEffect(() => {
    const lapse = nextLapse(held, now)
    if (lapse === null) return undefined
    const timer = setTimeout(() => setNow(Date.now()), Math.max(0, lapse - now) + 50)
    return () => clearTimeout(timer)
  }, [held, now])
  return othersTyping(held, me, now)
}

const DOTS = [0, 200, 400] as const

function Said({ said }: { said: string }) {
  return (
    <p className="flex items-baseline font-mono text-secondary text-xs" aria-live="polite">
      {said}
      {DOTS.map((delay) => (
        <span key={delay} className="animate-pulse" style={{ animationDelay: `${delay}ms` }}>
          .
        </span>
      ))}
    </p>
  )
}

export function SeatTyping({
  seat,
  turnState,
  persona,
}: {
  seat: string
  turnState: string | null
  persona: unknown
}) {
  const typing = typingSaid(useOthersTyping(seat))
  const replying = replyingSaid(turnState, persona)
  if (typing === null && replying === null) return null
  return (
    <div className="flex flex-col gap-1">
      {replying !== null && <Said said={replying} />}
      {typing !== null && <Said said={typing} />}
    </div>
  )
}
