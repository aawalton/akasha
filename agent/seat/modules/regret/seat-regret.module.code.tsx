"use client"

import { messageNamed } from "akasha/agent/message/modules/naming/agent-message-naming.module.code.ts"
import type { Returned } from "akasha/agent/seat/modules/composer/seat-composer.module.code.tsx"
import type {
  Entry,
  Heard,
} from "akasha/agent/seat/modules/conversation-hearing/seat-conversation-hearing.module.code.ts"
import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { type ReactNode, useEffect, useState } from "react"

type Regretting = {
  readonly message: string
  readonly state: "asking" | "taken" | "refused"
  readonly why?: string
}

export type Regret = {
  readonly shown: (entries: readonly Entry[]) => readonly Entry[]
  readonly control: (entry: Entry) => ReactNode
  readonly returned: Returned | null
}

const REGRET_AT = "/api/seat/regret"

const WORKING = `${seatTurnState.slug}/${working.slug}`

const SUBDUED = "font-mono text-secondary text-xs"

const sentHere = new Set<string>()

export function regrettableIn(heard: Heard, sent: ReadonlySet<string>): string | null {
  if (heard.state !== "heard" || heard.turnState !== WORKING) return null
  for (let back = heard.entries.length - 1; back >= 0; back -= 1) {
    const one = heard.entries[back]
    if (one?.kind !== "person") continue
    return one.message !== undefined && sent.has(one.message) ? one.message : null
  }
  return null
}

export function shownOf(entries: readonly Entry[], hidden: string | null): readonly Entry[] {
  if (hidden === null) return entries
  const at = entries.findIndex((one) => one.message === hidden)
  return at < 0 ? entries : entries.slice(0, at)
}

async function regretted(seat: string, message: string): Promise<string | null> {
  let answered: Response
  try {
    answered = await fetch(REGRET_AT, {
      method: "POST",
      headers: { accept: "application/json", "content-type": "application/json" },
      body: JSON.stringify({ seat, message }),
    })
  } catch (cause) {
    return `${REGRET_AT} gave no answer (${String(cause)})`
  }
  if (answered.ok) return null
  const said = (await answered.json().catch(() => null)) as { readonly error?: unknown } | null
  const error = said?.error
  return typeof error === "string" && error !== ""
    ? error
    : `${REGRET_AT} answered ${answered.status}`
}

function Control({
  entry,
  mine,
  regret,
}: {
  entry: Entry
  mine: Regretting | null
  regret: (entry: Entry) => void
}) {
  if (mine?.state === "asking") return <span className={SUBDUED}>Cancelling…</span>
  if (mine?.state === "refused") return <span className={SUBDUED}>Not cancelled: {mine.why}</span>
  return (
    <button
      type="button"
      className={cn("self-start underline", SUBDUED)}
      onClick={() => regret(entry)}
    >
      Cancel
    </button>
  )
}

export function useRegret(
  seat: string,
  heard: Heard,
  again: () => void,
  sent: readonly { readonly id: string }[]
): Regret {
  const [regretting, setRegretting] = useState<Regretting | null>(null)
  const [returned, setReturned] = useState<Returned | null>(null)
  useEffect(() => {
    for (const one of sent) sentHere.add(messageNamed(one.id))
  }, [sent])
  const regret = (entry: Entry) => {
    const message = entry.message
    if (message === undefined) return
    setRegretting({ message, state: "asking" })
    void regretted(seat, message).then((why) => {
      if (why !== null) {
        setRegretting({ message, state: "refused", why })
        return
      }
      sentHere.delete(message)
      setRegretting({ message, state: "taken" })
      setReturned({ key: Date.now(), text: entry.text ?? "" })
      again()
    })
  }
  const regrettable = regrettableIn(heard, sentHere)
  const hidden = regretting?.state === "taken" ? regretting.message : null
  const control = (entry: Entry): ReactNode => {
    if (entry.message === undefined || entry.message === hidden) return null
    const mine = regretting?.message === entry.message ? regretting : null
    if (mine === null && entry.message !== regrettable) return null
    return <Control entry={entry} mine={mine} regret={regret} />
  }
  return { shown: (entries) => shownOf(entries, hidden), control, returned }
}
