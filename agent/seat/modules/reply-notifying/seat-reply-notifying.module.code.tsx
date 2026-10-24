"use client"

import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { Bell, BellOff } from "lucide-react"
import { useCallback, useEffect, useRef, useState } from "react"

export type Said = {
  readonly kind: string
  readonly text?: string
  readonly line?: string
  readonly at?: string
}

export type Ended = { readonly key: string; readonly excerpt: string }

export type Noticed = { readonly seen: string | null; readonly reply: Ended | null }

type Permission = "unsupported" | NotificationPermission

export type Notifying = {
  readonly offered: boolean
  readonly permission: Permission
  readonly ask: () => undefined
}

const EXCERPT_LENGTH = 140

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

export function lastEnded(entries: readonly Said[]): Ended | null {
  for (let at = entries.length - 1; at >= 0; at -= 1) {
    const one = entries[at]
    if (one?.kind !== "turn-end") continue
    let reply = ""
    for (let back = at - 1; back >= 0; back -= 1) {
      const said = entries[back]
      if (said === undefined || said.kind === "person" || said.kind === "turn-end") break
      if (said.kind === "agent" && (said.text ?? "").trim() !== "") {
        reply = said.text ?? ""
        break
      }
    }
    return { key: `${one.at ?? ""}|${one.line ?? ""}`, excerpt: excerptOf(reply) }
  }
  return null
}

export function noticed(seen: string | null | undefined, entries: readonly Said[]): Noticed {
  const ended = lastEnded(entries)
  const key = ended?.key ?? null
  if (seen === undefined || ended === null || ended.key === seen) return { seen: key, reply: null }
  return { seen: key, reply: ended }
}

function permissionNow(): Permission {
  return typeof window !== "undefined" && "Notification" in window
    ? Notification.permission
    : "unsupported"
}

function away(): boolean {
  return document.visibilityState === "hidden" || !document.hasFocus()
}

function shown(seat: string, title: string, reply: Ended): undefined {
  try {
    const notice = new Notification(title, {
      body: reply.excerpt === "" ? "The reply is done." : reply.excerpt,
      tag: `seat-reply-${seat}`,
    })
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
  entries: readonly Said[] | null,
  persons: number
): Notifying {
  const several = persons > 1
  const [permission, setPermission] = useState<Permission>("unsupported")
  const seen = useRef<string | null | undefined>(undefined)
  useEffect(() => {
    setPermission(permissionNow())
  }, [])
  useEffect(() => {
    seen.current = undefined
  }, [seat])
  useEffect(() => {
    if (entries === null) return
    const now = noticed(seen.current, entries)
    seen.current = now.seen
    if (now.reply === null || !several || permission !== "granted" || !away()) return
    shown(seat, title, now.reply)
  }, [entries, several, permission, seat, title])
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
