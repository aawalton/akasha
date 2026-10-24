"use client"

import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"

export type Entry = {
  readonly kind: "person" | "agent" | "tool" | "turn-end" | "message"
  readonly text?: string
  readonly images?: number
  readonly line?: string
  readonly sender?: string
  readonly at?: string
  readonly message?: string
}

export type Heard =
  | { readonly state: "asking" }
  | {
      readonly state: "heard"
      readonly entries: readonly Entry[]
      readonly turnState: string | null
    }
  | { readonly state: "refused"; readonly why: string }

const SEAT = "seat"

const CONVERSATION = "conversation"

const TURN_STATE = "turnState"

const KINDS: ReadonlySet<string> = new Set(["person", "agent", "tool", "turn-end", "message"])

function entryIn(held: unknown): Entry | null {
  if (typeof held !== "object" || held === null) return null
  const one = held as Readonly<Record<string, unknown>>
  if (typeof one.kind !== "string" || !KINDS.has(one.kind)) return null
  return {
    kind: one.kind as Entry["kind"],
    ...(typeof one.text === "string" ? { text: one.text } : {}),
    ...(typeof one.images === "number" ? { images: one.images } : {}),
    ...(typeof one.line === "string" ? { line: one.line } : {}),
    ...(typeof one.sender === "string" ? { sender: one.sender } : {}),
    ...(typeof one.at === "string" ? { at: one.at } : {}),
    ...(typeof one.message === "string" ? { message: one.message } : {}),
  }
}

async function conversationOf(id: string): Promise<Heard> {
  const asked = await askComposed({
    "page-type": SEAT,
    where: { id: { is: id } },
    keys: [CONVERSATION, TURN_STATE],
    limit: 1,
  })
  if (!asked.ok) return { state: "refused", why: asked.why }
  const values = asked.answer.rows[0]?.values
  const stated = values?.[TURN_STATE]
  const turnState = typeof stated === "string" ? stated : null
  const held = values?.[CONVERSATION]
  if (!Array.isArray(held)) return { state: "heard", entries: [], turnState }
  const entries: Entry[] = []
  for (const one of held) {
    const entry = entryIn(one)
    if (entry !== null) entries.push(entry)
  }
  return { state: "heard", entries, turnState }
}

function keptOver(held: Heard, said: Heard): Heard {
  return said.state === "refused" && held.state === "heard" ? held : said
}

export function useConversation(id: string): readonly [Heard, () => void] {
  const [heard, setHeard] = useState<Heard>({ state: "asking" })
  const asked = useRef<() => undefined>(() => undefined)
  const again = useCallback(() => {
    asked.current()
  }, [])
  useEffect(() => {
    setHeard({ state: "asking" })
    let dropped = false
    let asking = false
    let owed = false
    const ask = (): undefined => {
      if (asking) {
        owed = true
        return undefined
      }
      asking = true
      void conversationOf(id).then((said) => {
        asking = false
        if (dropped) return
        setHeard((held) => keptOver(held, said))
        if (owed) {
          owed = false
          ask()
        }
      })
      return undefined
    }
    asked.current = ask
    ask()
    let watch: PageWatch | null = null
    void getPagesStore().then((store) => {
      if (!dropped) watch = store.watchPage(SEAT, id, ask)
    })
    const timer = setInterval(() => {
      if (watch?.live() !== true) ask()
    }, FILE_BACKING_POLL_MS)
    return () => {
      dropped = true
      clearInterval(timer)
      watch?.release()
    }
  }, [id])
  return [heard, again]
}
