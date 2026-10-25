"use client"

import {
  byDesktop,
  isNotice,
  type Notice,
  noticeFor,
} from "akasha/agent/seat/modules/notice-choosing/seat-notice-choosing.module.code.ts"
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

type Ended = { readonly key: string; readonly excerpt: string; readonly at: number | null }

type Noticed = { readonly settled: string | null; readonly reply: Ended | null }

export type Heard = { readonly entries: readonly Said[]; readonly turnState: string | null }

type Permission = "unsupported" | NotificationPermission

type Notifying = {
  readonly offered: boolean
  readonly notice: Notice
  readonly saved: "saved" | "saving" | "unsaved"
  readonly permission: Permission
  readonly choose: (notice: Notice) => undefined
  readonly ask: () => undefined
}

type Choice = { readonly notice: Notice; readonly label: string }

const NOTICE_AT = "/api/seat/notice"

const CHOICES: readonly Choice[] = [
  { notice: "phone", label: "Phone" },
  { notice: "desktop", label: "Desktop" },
  { notice: "both", label: "Both" },
  { notice: "none", label: "None" },
]

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

async function noticeAsked(seat: string): Promise<Notice | null> {
  try {
    const answered = await fetch(`${NOTICE_AT}?seat=${encodeURIComponent(seat)}`, {
      headers: { accept: "application/json" },
    })
    if (!answered.ok) return null
    const said = (await answered.json()) as { readonly notice?: unknown }
    return isNotice(said.notice) ? said.notice : null
  } catch {
    return null
  }
}

async function noticeSent(seat: string, notice: Notice): Promise<boolean> {
  try {
    const answered = await fetch(NOTICE_AT, {
      method: "POST",
      headers: { "content-type": "application/json", accept: "application/json" },
      body: JSON.stringify({ seat, notice }),
    })
    return answered.ok
  } catch {
    return false
  }
}

function useNoticeChoosing(seat: string, several: boolean, asked: () => undefined) {
  const [notice, setNotice] = useState<Notice>(() => noticeFor(undefined, seat))
  const [saved, setSaved] = useState<"saved" | "saving" | "unsaved">("saved")
  useEffect(() => {
    if (!several) return undefined
    let dropped = false
    void noticeAsked(seat).then((held) => {
      if (!dropped && held !== null) setNotice(held)
    })
    return () => {
      dropped = true
    }
  }, [seat, several])
  const choose = useCallback(
    (next: Notice): undefined => {
      if (byDesktop(next)) asked()
      setNotice(next)
      setSaved("saving")
      void noticeSent(seat, next).then((sent) => setSaved(sent ? "saved" : "unsaved"))
      return undefined
    },
    [seat, asked]
  )
  return { notice, saved, choose }
}

export function useReplyNotifying(
  seat: string,
  title: string,
  heard: Heard | null,
  persons: number
): Notifying {
  const several = persons > 1
  const [permission, setPermission] = useState<Permission>("unsupported")
  const ask = useCallback((): undefined => {
    if (permissionNow() !== "default") return
    void Notification.requestPermission().then(setPermission)
  }, [])
  const { notice, saved, choose } = useNoticeChoosing(seat, several, ask)
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
    if (now.reply === null || !several || !byDesktop(notice)) return
    if (permission !== "granted" || !away()) return
    shown(seat, title, now.reply)
  }, [heard, several, notice, permission, seat, title])
  return { offered: several, notice, saved, permission, choose, ask }
}

function desktopSaid(permission: Permission): string | null {
  if (permission === "denied") return "This browser blocks notifications from this site."
  if (permission === "unsupported") return "This browser shows no notifications."
  return null
}

function ChoiceDrawn({ notifying, one }: { notifying: Notifying; one: Choice }) {
  const chosen = notifying.notice === one.notice
  return (
    <button
      type="button"
      aria-pressed={chosen}
      onClick={() => notifying.choose(one.notice)}
      className={cn(
        "rounded px-2 py-0.5",
        chosen ? "bg-primary/10 text-primary" : "text-secondary hover:text-primary"
      )}
    >
      {one.label}
    </button>
  )
}

function NoticeStatus({ notifying }: { notifying: Notifying }) {
  if (notifying.saved === "unsaved") return <p className={SUBDUED}>Not saved. Choose again.</p>
  if (!byDesktop(notifying.notice)) return null
  const said = desktopSaid(notifying.permission)
  if (said !== null)
    return (
      <p className={cn(SUBDUED, "flex items-center gap-1.5")}>
        <BellOff className="size-3.5" />
        {said}
      </p>
    )
  if (notifying.permission === "granted") return null
  return (
    <button type="button" onClick={notifying.ask} className={cn(SUBDUED, "self-start underline")}>
      Allow this browser to show notifications
    </button>
  )
}

export function ReplyNotifyingControl({ notifying }: { notifying: Notifying }) {
  if (!notifying.offered) return null
  return (
    <div className="flex flex-col gap-1">
      <div className={cn(SUBDUED, "flex flex-wrap items-center gap-1.5")}>
        <Bell className="size-3.5" />
        <span>Tell me a reply is done by</span>
        <fieldset className="flex gap-0.5" aria-label="Tell me a reply is done by">
          {CHOICES.map((one) => (
            <ChoiceDrawn key={one.notice} notifying={notifying} one={one} />
          ))}
        </fieldset>
      </div>
      <NoticeStatus notifying={notifying} />
    </div>
  )
}
