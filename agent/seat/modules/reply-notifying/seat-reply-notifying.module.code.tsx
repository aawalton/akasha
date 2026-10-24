"use client"

import { working } from "akasha/agent/seat/turn-state/pages/working/working.seat-turn-state.ts"
import { seatTurnState } from "akasha/agent/seat/turn-state/seat-turn-state.page-type.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Bell, BellOff } from "lucide-react"
import { useCallback, useEffect, useState } from "react"

export type Said = {
  readonly kind: string
  readonly text?: string
  readonly line?: string
  readonly at?: string
}

export type Ended = { readonly key: string; readonly excerpt: string; readonly at: number | null }

export type Noticed = { readonly settled: string | null; readonly reply: Ended | null }

export type Heard = { readonly entries: readonly Said[]; readonly turnState: string | null }

type Permission = "unsupported" | NotificationPermission

export type Notifying = {
  readonly offered: boolean
  readonly permission: Permission
  readonly ask: () => undefined
}

const EXCERPT_LENGTH = 140

const KEY_LENGTH = 64

const WORKING = `${seatTurnState.slug}/${working.slug}`

const openedAt = new Map<string, number>()

const settledFor = new Map<string, string | null>()

const STILL_MS = 120_000

const STIRS = ["pointermove", "pointerdown", "keydown", "wheel", "touchstart"] as const

let stirred = Date.now()

const SUBDUED = "font-mono text-secondary text-xs"

export function excerptOf(text: string): string {
  const plain = text
    .replace(/!?\[([^\]]*)\]\([^)]*\)/g, "$1")
    .replace(/[`*_#>~|]+/g, "")
    .replace(/\s+/g, " ")
    .trim()
  if (plain.length <= EXCERPT_LENGTH) return plain
  return `${plain.slice(0, EXCERPT_LENGTH - 1).trimEnd()}…`
}

function instantOf(at: string | undefined): number | null {
  if (at === undefined) return null
  const when = Date.parse(at)
  return Number.isNaN(when) ? null : when
}

export function lastReply(heard: Heard): Ended | null {
  if (heard.turnState === null || heard.turnState === WORKING) return null
  for (let back = heard.entries.length - 1; back >= 0; back -= 1) {
    const said = heard.entries[back]
    if (said === undefined || said.kind === "person") return null
    const text = said.text ?? ""
    if (said.kind !== "agent" || text.trim() === "") continue
    return {
      key: `${said.at ?? ""}|${text.slice(0, KEY_LENGTH)}`,
      excerpt: excerptOf(text),
      at: instantOf(said.at),
    }
  }
  return null
}

export function noticed(settled: string | null, opened: number, reply: Ended | null): Noticed {
  if (reply === null || reply.key === settled) return { settled, reply: null }
  if (reply.at === null || reply.at < opened) return { settled: reply.key, reply: null }
  return { settled: reply.key, reply }
}

function permissionNow(): Permission {
  return typeof window !== "undefined" && "Notification" in window
    ? Notification.permission
    : "unsupported"
}

export function awayIn(hidden: boolean, focused: boolean, stillFor: number): boolean {
  return hidden || !focused || stillFor >= STILL_MS
}

function away(): boolean {
  return awayIn(document.visibilityState === "hidden", document.hasFocus(), Date.now() - stirred)
}

function stir(): undefined {
  stirred = Date.now()
  return undefined
}

function shown(seat: string, title: string, reply: Ended): undefined {
  try {
    const options = { body: reply.excerpt, tag: `seat-reply-${seat}`, renotify: true }
    const notice = new Notification(title, options)
    notice.onclick = () => {
      window.focus()
      notice.close()
    }
  } catch {
    return undefined
  }
  return undefined
}

export function useReplyNotifying(
  seat: string,
  title: string,
  heard: Heard | null,
  persons: number
): Notifying {
  const several = persons > 1
  const [permission, setPermission] = useState<Permission>("unsupported")
  useEffect(() => {
    setPermission(permissionNow())
  }, [])
  useEffect(() => {
    if (!openedAt.has(seat)) openedAt.set(seat, Date.now())
  }, [seat])
  useEffect(() => {
    for (const one of STIRS) window.addEventListener(one, stir, { passive: true })
    return () => {
      for (const one of STIRS) window.removeEventListener(one, stir)
    }
  }, [])
  useEffect(() => {
    if (heard === null) return
    const opened = openedAt.get(seat) ?? Date.now()
    const now = noticed(settledFor.get(seat) ?? null, opened, lastReply(heard))
    settledFor.set(seat, now.settled)
    if (now.reply === null || !several || permission !== "granted" || !away()) return
    shown(seat, title, now.reply)
  }, [heard, several, permission, seat, title])
  const ask = useCallback((): undefined => {
    if (permissionNow() === "unsupported") return
    void Notification.requestPermission().then(setPermission)
  }, [])
  return { offered: several && permission !== "unsupported", permission, ask }
}

export function ReplyNotifyingControl({ notifying }: { notifying: Notifying }) {
  if (!notifying.offered) return null
  if (notifying.permission === "default")
    return (
      <button
        type="button"
        onClick={notifying.ask}
        className={cn(SUBDUED, "flex items-center gap-1.5 self-start underline")}
      >
        <Bell className="size-3.5" />
        Notify me when a reply ends while I am away
      </button>
    )
  if (notifying.permission === "granted")
    return (
      <p className={cn(SUBDUED, "flex items-center gap-1.5")}>
        <Bell className="size-3.5" />
        Notifying you when a reply ends while you are away
      </p>
    )
  return (
    <p className={cn(SUBDUED, "flex items-center gap-1.5")}>
      <BellOff className="size-3.5" />
      This browser blocks notifications from this site
    </p>
  )
}
