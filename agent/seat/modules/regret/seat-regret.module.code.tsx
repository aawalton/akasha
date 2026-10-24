"use client"

import { messageNamed } from "akasha/agent/message/modules/naming/agent-message-naming.module.code.ts"
import type { Returned } from "akasha/agent/seat/modules/composer/seat-composer.module.code.tsx"
import type {
  Entry,
  Heard,
} from "akasha/agent/seat/modules/conversation-hearing/seat-conversation-hearing.module.code.ts"
import { personSlug } from "akasha/agent/seat/modules/typing/seat-typing.module.code.tsx"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { type ReactNode, useEffect, useRef, useState } from "react"

export type Cancellable = {
  readonly message: string
  readonly text: string
  readonly files: readonly File[]
}

type Regretting = {
  readonly message: string
  readonly key: number
  readonly state: "asking" | "taken" | "refused"
  readonly why?: string
}

export type Regret = {
  readonly shown: (entries: readonly Entry[]) => readonly Entry[]
  readonly hides: (message: string) => boolean
  readonly offeredOn: (entry: Entry) => boolean
  readonly control: (one: Cancellable, offered: boolean) => ReactNode
  readonly returned: Returned | null
}

type Answered = { readonly ok: true } | { readonly why: string; readonly taken: boolean }

const REGRET_AT = "/api/seat/regret"

const WORKING = `${seatTurnState.slug}/${working.slug}`

const SUBDUED = "font-mono text-secondary text-xs"

const HIDDEN_MS = 60_000

const SAID_MS = 6_000

const sentHere = new Set<string>()

export function mineOf(me: string | null, sent: ReadonlySet<string>): (entry: Entry) => boolean {
  return (entry) =>
    (entry.message !== undefined && sent.has(entry.message)) ||
    (me !== null && entry.sender !== undefined && personSlug(entry.sender) === personSlug(me))
}

export function regrettableIn(heard: Heard, mine: (entry: Entry) => boolean): string | null {
  if (heard.state !== "heard" || heard.turnState !== WORKING) return null
  for (let back = heard.entries.length - 1; back >= 0; back -= 1) {
    const one = heard.entries[back]
    if (one?.kind !== "person") continue
    return one.message !== undefined && mine(one) ? one.message : null
  }
  return null
}

export function shownOf(entries: readonly Entry[], hidden: string | null): readonly Entry[] {
  if (hidden === null) return entries
  const at = entries.findIndex((one) => one.message === hidden)
  return at < 0 ? entries : entries.slice(0, at)
}

async function regretted(seat: string, message: string): Promise<Answered> {
  let answered: Response
  try {
    answered = await fetch(REGRET_AT, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ seat, message }),
    })
  } catch (cause) {
    return { why: `${REGRET_AT} gave no answer (${String(cause)})`, taken: false }
  }
  if (answered.ok) return { ok: true }
  const said = (await answered.json().catch(() => null)) as {
    readonly error?: unknown
    readonly taken?: unknown
  } | null
  const error = said?.error
  const why =
    typeof error === "string" && error !== "" ? error : `${REGRET_AT} answered ${answered.status}`
  return { why, taken: said?.taken === true }
}

function Control({
  one,
  mine,
  regret,
}: {
  one: Cancellable
  mine: Regretting | null
  regret: (one: Cancellable) => void
}) {
  if (mine?.state === "asking") return <span className={SUBDUED}>Cancelling…</span>
  if (mine?.state === "refused") return <span className={SUBDUED}>Not cancelled: {mine.why}</span>
  return (
    <button
      type="button"
      className={cn("self-start underline", SUBDUED)}
      onClick={() => regret(one)}
    >
      Cancel
    </button>
  )
}

export type Regretted = {
  readonly seat: string
  readonly seatName: string
  readonly heard: Heard
  readonly again: () => void
  readonly sent: readonly { readonly id: string }[]
  readonly me: string | null
  readonly forget: (message: string) => void
}

export function useRegret(given: Regretted): Regret {
  const { seat, seatName, heard, again, sent, me, forget } = given
  const [regretting, setRegretting] = useState<Regretting | null>(null)
  const [returned, setReturned] = useState<Returned | null>(null)
  const keyed = useRef(0)
  useEffect(() => {
    for (const one of sent) sentHere.add(messageNamed(one.id))
  }, [sent])
  useEffect(() => {
    if (regretting === null || regretting.state === "asking") return undefined
    const held = regretting
    const timer = setTimeout(
      () => setRegretting((now) => (now === held ? null : now)),
      held.state === "taken" ? HIDDEN_MS : SAID_MS
    )
    return () => clearTimeout(timer)
  }, [regretting])
  const regret = (one: Cancellable) => {
    keyed.current += 1
    const key = keyed.current
    const message = one.message
    setRegretting({ message, key, state: "asking" })
    setReturned({ key, text: one.text, files: one.files })
    void regretted(seat, message).then((said) => {
      if ("ok" in said) {
        sentHere.delete(message)
        forget(message)
        setRegretting({ message, key, state: "taken" })
        again()
        return
      }
      setReturned({ key, text: one.text, revoked: true })
      const why = said.taken ? `${seatName} already has it` : said.why
      setRegretting({ message, key, state: "refused", why })
    })
  }
  const hidden = regretting !== null && regretting.state !== "refused" ? regretting.message : null
  const regrettable = regrettableIn(heard, mineOf(me, sentHere))
  const control = (one: Cancellable, offered: boolean): ReactNode => {
    if (one.message === hidden) return null
    const mine = regretting?.message === one.message ? regretting : null
    if (mine === null && !offered) return null
    return <Control one={one} mine={mine} regret={regret} />
  }
  return {
    shown: (entries) => shownOf(entries, hidden),
    hides: (message) => message === hidden,
    offeredOn: (entry) => entry.message !== undefined && entry.message === regrettable,
    control,
    returned,
  }
}
