"use client"

import {
  SeatComposer,
  sentToSeat,
  type Unsent,
} from "akasha/agent/seat/modules/composer/seat-composer.module.code.tsx"
import {
  type Entry,
  type Heard,
  useConversation,
} from "akasha/agent/seat/modules/conversation-hearing/seat-conversation-hearing.module.code.ts"
import {
  ReplyNotifyingControl,
  useReplyNotifying,
} from "akasha/agent/seat/modules/reply-notifying/seat-reply-notifying.module.code.tsx"
import { useSeatVoice } from "akasha/agent/seat/voice/modules/live/seat-voice-live.module.code.ts"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { pageName } from "akasha/page/core/modules/page-name/page-name.module.code.ts"
import { titledAs } from "akasha/page/core/modules/titled-as/titled-as.module.code.ts"
import { uuidVersion7 } from "akasha/page/id/modules/uuid-version-7/uuid-version-7.module.code.ts"

import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { titleColorClass } from "akasha/page/ui/component/modules/title-color/title-color.module.code.ts"
import { usePageDefaultContent } from "akasha/page/ui/component/modules/use-page-default-content/use-page-default-content.module.code.ts"
import { DisplayFrame } from "akasha/page/ui/frame/modules/display-frame/display-frame.module.code.tsx"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import { useEffect, useRef, useState } from "react"

type Pending = {
  readonly key: number
  readonly id: string
  readonly text: string
  readonly files: readonly File[]
  readonly seen: number
  readonly state: "sending" | "sent" | "refused" | "unanswered"
  readonly why?: string
}

const FRAME = { autoScroll: { loadScroll: "end" as const } }

const SUBDUED = "font-mono text-secondary text-xs"

const NOTHING_SAID: readonly Entry[] = []

function timesSaid(heard: Heard, text: string): number {
  if (heard.state !== "heard") return 0
  return heard.entries.filter((one) => one.kind === "person" && one.text?.trim() === text).length
}

function useSending(id: string) {
  const [pending, setPending] = useState<readonly Pending[]>([])
  const keyed = useRef(0)
  const told = useRef(new Map<number, (sent: boolean) => void>())
  const tell = (key: number, sent: boolean) => {
    told.current.get(key)?.(sent)
    told.current.delete(key)
  }
  const [heard, again] = useConversation(id)
  const settle = (key: number, unsent: Unsent | null) => {
    if (unsent === null || !unsent.unanswered) tell(key, unsent === null)
    setPending((held) =>
      held.map((one) =>
        one.key !== key
          ? one
          : unsent === null
            ? { ...one, state: "sent" }
            : { ...one, state: unsent.unanswered ? "unanswered" : "refused", why: unsent.why }
      )
    )
    if (unsent === null) again()
  }
  const sending = (one: Pending) => {
    void sentToSeat(id, one.text, one.files, one.id).then((unsent) => settle(one.key, unsent))
  }
  const send = (text: string, files: readonly File[]): Promise<boolean> => {
    keyed.current += 1
    const one: Pending = {
      key: keyed.current,
      id: uuidVersion7(),
      text,
      files,
      seen: timesSaid(heard, text),
      state: "sending",
    }
    const sent = new Promise<boolean>((answer) => told.current.set(one.key, answer))
    setPending((held) => [...held, one])
    sending(one)
    return sent
  }
  const resend = (one: Pending) => {
    setPending((held) =>
      held.map((that) => (that.key === one.key ? { ...that, state: "sending" } : that))
    )
    sending(one)
  }
  const dismiss = (key: number) => {
    tell(key, false)
    setPending((held) => held.filter((one) => one.key !== key))
  }
  useEffect(() => {
    setPending((held) => {
      const kept = held.filter(
        (one) =>
          (one.state !== "sent" && one.state !== "unanswered") ||
          timesSaid(heard, one.text) <= one.seen
      )
      return kept.length === held.length ? held : kept
    })
  }, [heard])
  return { heard, pending, send, resend, dismiss }
}

function clockOf(at: string | undefined): string | null {
  if (at === undefined) return null
  const when = new Date(at)
  if (Number.isNaN(when.getTime())) return null
  return when.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" })
}

function imagesSaid(images: number): string {
  return images === 1 ? "1 image" : `${images} images`
}

function PersonSaid({ entry, named }: { entry: Entry; named: boolean }) {
  const images = entry.images ?? 0
  return (
    <div className={cn("flex flex-col gap-1 rounded-lg px-3 py-2", surfaceClass(2))}>
      {named && entry.sender !== undefined && (
        <span className={SUBDUED}>{titledAs(entry.sender)}</span>
      )}
      {images > 0 && <span className={SUBDUED}>[{imagesSaid(images)}]</span>}
      {entry.text !== undefined && entry.text !== "" && (
        <p className="whitespace-pre-wrap break-words text-primary text-sm">{entry.text}</p>
      )}
    </div>
  )
}

function AgentSaid({ entry }: { entry: Entry }) {
  return (
    <div className="flex gap-2">
      <div className="flex min-w-0 flex-1 flex-col gap-2 break-words">
        <MarkdownRenderer content={entry.text ?? ""} />
      </div>
    </div>
  )
}

function ToolCalled({ entry }: { entry: Entry }) {
  return (
    <div className={cn("flex gap-2", SUBDUED)}>
      <span className="min-w-0 flex-1 truncate">{entry.line ?? ""}</span>
    </div>
  )
}

function TurnEnded({ entry }: { entry: Entry }) {
  const clock = clockOf(entry.at)
  const said = clock === null ? (entry.line ?? "") : `${entry.line ?? ""} · done ${clock}`
  return <p className={cn("text-tertiary", SUBDUED)}>✻ {said}</p>
}

function MessageSent({ entry }: { entry: Entry }) {
  return (
    <div className="flex flex-col gap-1 rounded-lg border border-primary/10 px-3 py-2">
      <span className={SUBDUED}>from {entry.sender ?? "someone"}</span>
      <p className="whitespace-pre-wrap break-words text-secondary text-xs">{entry.text ?? ""}</p>
    </div>
  )
}

function EntryDrawn({ entry, named }: { entry: Entry; named: boolean }) {
  if (entry.kind === "person") return <PersonSaid entry={entry} named={named} />
  if (entry.kind === "agent") return <AgentSaid entry={entry} />
  if (entry.kind === "tool") return <ToolCalled entry={entry} />
  if (entry.kind === "message") return <MessageSent entry={entry} />
  return <TurnEnded entry={entry} />
}

function pendingSaid(one: Pending): string {
  if (one.state === "sending") return "Sending…"
  if (one.state === "sent") return "Sent, waiting for the seat to take it"
  if (one.state === "unanswered") return "No answer came, so it may or may not have been sent"
  return `Not sent: ${one.why ?? "the send was refused"}`
}

function PendingDrawn({
  one,
  resend,
  dismiss,
}: {
  one: Pending
  resend: (one: Pending) => void
  dismiss: (key: number) => void
}) {
  return (
    <div className="flex flex-col gap-1 opacity-60">
      <PersonSaid
        entry={{ kind: "person", text: one.text, images: one.files.length }}
        named={false}
      />
      <span className={cn("flex gap-2", SUBDUED)}>
        {pendingSaid(one)}
        {one.state === "unanswered" && (
          <button type="button" className="underline" onClick={() => resend(one)}>
            Send again
          </button>
        )}
        {(one.state === "refused" || one.state === "unanswered") && (
          <button type="button" className="underline" onClick={() => dismiss(one.key)}>
            Dismiss
          </button>
        )}
      </span>
    </div>
  )
}

function peopleIn(entries: readonly Entry[]): number {
  const senders = new Set<string>()
  for (const one of entries) {
    if (one.kind === "person" && one.sender !== undefined) senders.add(one.sender)
  }
  return senders.size
}

function personsStated(held: unknown): number {
  return Array.isArray(held) ? held.length : 0
}

function Conversation({ heard, persons }: { heard: Heard; persons: number }) {
  if (heard.state === "asking") return <p className={SUBDUED}>Reading the conversation…</p>
  if (heard.state === "refused") return <p className={SUBDUED}>{heard.why}</p>
  if (heard.entries.length === 0)
    return <p className={SUBDUED}>Nothing said since the last compaction.</p>
  const named = persons > 1 || peopleIn(heard.entries) > 1
  return (
    <ol className="flex flex-col gap-3">
      {heard.entries.map((entry, at) => (
        <li key={`${at}-${entry.kind}`}>
          <EntryDrawn entry={entry} named={named} />
        </li>
      ))}
    </ol>
  )
}

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page, pageIsLoading, data, allDefinitions } = usePageDefaultContent({ pageTypeSlug, id })
  const { heard, pending, send, resend, dismiss } = useSending(id)
  const voice = useSeatVoice(id, heard.state === "heard" ? heard.entries : NOTHING_SAID, (text) => {
    send(text, [])
  })
  const persons = personsStated(data.persons)
  const notifying = useReplyNotifying(
    id,
    pageName(data),
    heard.state === "heard" ? heard : null,
    persons
  )
  const endRef = useRef<HTMLDivElement | null>(null)
  const shown = heard.state === "heard" ? heard.entries.length + pending.length : -1
  const titleColor = titleColorClass(allDefinitions, data)
  const titleClasses = cn(PAGE_TITLE_CLASSES, "hidden min-[584px]:block", titleColor)
  return (
    <DisplayFrame
      config={FRAME}
      header={
        page != null
          ? { title: pageName(data), titleClassName: titleColor, showBack: true, mobileOnly: true }
          : null
      }
      followAnchor={{ ref: endRef, renderTrigger: shown }}
      footer={<SeatComposer seat={id} onSend={send} voice={voice} />}
    >
      <PageLayout loading={pageIsLoading} skeleton={simplePageSkeleton({ titleWidth: 160 })}>
        {page != null && <title>{pageName(data)}</title>}
        <PageLayout.Content className="max-w-[710px]! pt-3 min-[584px]:pt-6">
          <div className="flex flex-col gap-4 pb-6">
            <h1 className={titleClasses}>{pageName(data)}</h1>
            <ReplyNotifyingControl notifying={notifying} />
            <Conversation heard={heard} persons={persons} />
            {pending.map((one) => (
              <PendingDrawn key={one.key} one={one} resend={resend} dismiss={dismiss} />
            ))}
            <div ref={endRef} />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </DisplayFrame>
  )
}
