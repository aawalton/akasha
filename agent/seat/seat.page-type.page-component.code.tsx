"use client"

import {
  SeatComposer,
  sentToSeat,
} from "akasha/agent/seat/modules/composer/seat-composer.module.code.tsx"
import { PageLayout } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { PAGE_TITLE_CLASSES } from "akasha/design/interface/layout/modules/page-layout-data/page-layout-data.module.code.ts"
import { simplePageSkeleton } from "akasha/design/interface/layout/modules/skeleton-presets/skeleton-presets.module.code.ts"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { pageName } from "akasha/page/core/modules/page-name/page-name.module.code.ts"
import { askComposed } from "akasha/page/query/modules/store-spelled-asking/store-spelled-asking.module.code.ts"
import type { PageDrawingProps } from "akasha/page/ui/component/modules/page-detail-content/page-detail-content.module.code.tsx"
import { titleColorClass } from "akasha/page/ui/component/modules/title-color/title-color.module.code.ts"
import { usePageDefaultContent } from "akasha/page/ui/component/modules/use-page-default-content/use-page-default-content.module.code.ts"
import { DisplayFrame } from "akasha/page/ui/frame/modules/display-frame/display-frame.module.code.tsx"
import { MarkdownRenderer } from "akasha/page/ui/markdown/modules/markdown-renderer/markdown-renderer.module.code.tsx"
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { useCallback, useEffect, useRef, useState } from "react"

type Entry = {
  readonly kind: "person" | "agent" | "tool" | "turn-end" | "message"
  readonly text?: string
  readonly images?: number
  readonly line?: string
  readonly sender?: string
  readonly at?: string
}

type Heard =
  | { readonly state: "asking" }
  | { readonly state: "heard"; readonly entries: readonly Entry[] }
  | { readonly state: "refused"; readonly why: string }

type Pending = {
  readonly key: number
  readonly text: string
  readonly images: number
  readonly seen: number
  readonly state: "sending" | "sent" | "refused"
  readonly why?: string
}

const SEAT = "seat"

const CONVERSATION = "conversation"

const KINDS: ReadonlySet<string> = new Set(["person", "agent", "tool", "turn-end", "message"])

const FRAME = { autoScroll: { loadScroll: "end" as const } }

const SUBDUED = "font-mono text-secondary text-xs"

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
  }
}

async function conversationOf(id: string): Promise<Heard> {
  const asked = await askComposed({
    "page-type": SEAT,
    where: { id: { is: id } },
    keys: [CONVERSATION],
    limit: 1,
  })
  if (!asked.ok) return { state: "refused", why: asked.why }
  const held = asked.answer.rows[0]?.values[CONVERSATION]
  if (!Array.isArray(held)) return { state: "heard", entries: [] }
  const entries: Entry[] = []
  for (const one of held) {
    const entry = entryIn(one)
    if (entry !== null) entries.push(entry)
  }
  return { state: "heard", entries }
}

function keptOver(held: Heard, said: Heard): Heard {
  return said.state === "refused" && held.state === "heard" ? held : said
}

function useConversation(id: string): readonly [Heard, () => void] {
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

function timesSaid(heard: Heard, text: string): number {
  if (heard.state !== "heard") return 0
  return heard.entries.filter((one) => one.kind === "person" && one.text?.trim() === text).length
}

function useSending(id: string) {
  const [pending, setPending] = useState<readonly Pending[]>([])
  const keyed = useRef(0)
  const [heard, again] = useConversation(id)
  const settle = (key: number, why: string | null) => {
    setPending((held) =>
      held.map((one) =>
        one.key !== key
          ? one
          : why === null
            ? { ...one, state: "sent" }
            : { ...one, state: "refused", why }
      )
    )
    if (why === null) again()
  }
  const send = (text: string, images: readonly File[]) => {
    keyed.current += 1
    const key = keyed.current
    setPending((held) => [
      ...held,
      { key, text, images: images.length, seen: timesSaid(heard, text), state: "sending" },
    ])
    void sentToSeat(id, text, images).then((why) => settle(key, why))
  }
  const dismiss = (key: number) => setPending((held) => held.filter((one) => one.key !== key))
  useEffect(() => {
    setPending((held) => {
      const kept = held.filter(
        (one) => one.state !== "sent" || timesSaid(heard, one.text) <= one.seen
      )
      return kept.length === held.length ? held : kept
    })
  }, [heard])
  return { heard, pending, send, dismiss }
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

function PersonSaid({ entry }: { entry: Entry }) {
  const images = entry.images ?? 0
  return (
    <div className={cn("flex flex-col gap-1 rounded-lg px-3 py-2", surfaceClass(2))}>
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
      <span className="select-none pt-0.5 text-primary text-xs" aria-hidden>
        ⏺
      </span>
      <div className="flex min-w-0 flex-1 flex-col gap-2 break-words">
        <MarkdownRenderer content={entry.text ?? ""} />
      </div>
    </div>
  )
}

function ToolCalled({ entry }: { entry: Entry }) {
  return (
    <div className={cn("flex gap-2", SUBDUED)}>
      <span className="select-none" aria-hidden>
        ⏺
      </span>
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

function EntryDrawn({ entry }: { entry: Entry }) {
  if (entry.kind === "person") return <PersonSaid entry={entry} />
  if (entry.kind === "agent") return <AgentSaid entry={entry} />
  if (entry.kind === "tool") return <ToolCalled entry={entry} />
  if (entry.kind === "message") return <MessageSent entry={entry} />
  return <TurnEnded entry={entry} />
}

function pendingSaid(one: Pending): string {
  if (one.state === "sending") return "Sending…"
  if (one.state === "sent") return "Sent, waiting for the seat to take it"
  return `Not sent: ${one.why ?? "the send was refused"}`
}

function PendingDrawn({ one, dismiss }: { one: Pending; dismiss: (key: number) => void }) {
  return (
    <div className="flex flex-col gap-1 opacity-60">
      <PersonSaid entry={{ kind: "person", text: one.text, images: one.images }} />
      <span className={cn("flex gap-2", SUBDUED)}>
        {pendingSaid(one)}
        {one.state === "refused" && (
          <button type="button" className="underline" onClick={() => dismiss(one.key)}>
            Dismiss
          </button>
        )}
      </span>
    </div>
  )
}

function Conversation({ heard }: { heard: Heard }) {
  if (heard.state === "asking") return <p className={SUBDUED}>Reading the conversation…</p>
  if (heard.state === "refused") return <p className={SUBDUED}>{heard.why}</p>
  if (heard.entries.length === 0)
    return <p className={SUBDUED}>Nothing said since the last compaction.</p>
  return (
    <ol className="flex flex-col gap-3">
      {heard.entries.map((entry, at) => (
        <li key={`${at}-${entry.kind}`}>
          <EntryDrawn entry={entry} />
        </li>
      ))}
    </ol>
  )
}

export function Drawing({ pageTypeSlug, id }: PageDrawingProps) {
  const { page, isLoading, data, allDefinitions } = usePageDefaultContent({ pageTypeSlug, id })
  const { heard, pending, send, dismiss } = useSending(id)
  const endRef = useRef<HTMLDivElement | null>(null)
  const shown = heard.state === "heard" ? heard.entries.length + pending.length : -1
  const titleClasses = cn(PAGE_TITLE_CLASSES, titleColorClass(allDefinitions, data))
  return (
    <DisplayFrame
      config={FRAME}
      followAnchor={{ ref: endRef, renderTrigger: shown }}
      footer={<SeatComposer onSend={send} />}
    >
      <PageLayout loading={isLoading} skeleton={simplePageSkeleton({ titleWidth: 160 })}>
        {page != null && <title>{pageName(data)}</title>}
        <PageLayout.Content className="max-w-[710px]!">
          <div className="flex flex-col gap-4 pb-6">
            <h1 className={titleClasses}>{pageName(data)}</h1>
            <Conversation heard={heard} />
            {pending.map((one) => (
              <PendingDrawn key={one.key} one={one} dismiss={dismiss} />
            ))}
            <div ref={endRef} />
          </div>
        </PageLayout.Content>
      </PageLayout>
    </DisplayFrame>
  )
}
