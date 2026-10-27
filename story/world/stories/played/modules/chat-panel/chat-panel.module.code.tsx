"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { cn } from "akasha/design/interface/primitive/modules/cn/cn.module.code.ts"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import {
  sendsNow,
  Textarea,
  useReturnSends,
} from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import {
  ToggleGroup,
  ToggleGroupItem,
} from "akasha/design/interface/primitive/modules/toggle-group/toggle-group.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import { isOutOfCharacterFeedback } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import { chat } from "akasha/story/ui/played-panel/panel-place/pages/chat.panel-place.ts"
import {
  readWaiting,
  sendAction,
} from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"
import type { PendingAction } from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"
import { feedbackTo } from "akasha/story/world/stories/played/turns/modules/turn-lifecycle/turn-lifecycle.module.code.ts"
import { ArrowUp } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

export type ChatFrom = "alan" | "game-master"

export type ChatLine = {
  readonly key: string
  readonly from: ChatFrom
  readonly text: string
  readonly said: string | null
}

export type ChatSent = {
  readonly key: string
  readonly text: string
  readonly id: string | null
  readonly refused: string | null
}

const ASSISTANT = "assistant"

const ASSISTANT_LABEL = "Assistant"

const POLL_MS = 5000

const FEEDBACK = "feedback"

const SENDING = "Sending…"

const PANEL =
  "flex h-[calc(100dvh-var(--safe-area-top)-6rem)] min-h-80 flex-col gap-3 max-[583px]:h-[calc(100dvh-var(--safe-area-top)-var(--safe-area-bottom)-8.5rem)]"

const HISTORY = "flex min-h-0 flex-1 flex-col gap-3 overflow-y-auto overscroll-contain"

const NOTE_LINE = "font-mono text-[12px] text-tertiary"

const ALAN_SAID = "ml-6 flex flex-col gap-1 self-end rounded-lg px-3 py-2"

const ALAN_TEXT = "whitespace-pre-wrap break-words text-primary text-sm"

const ANSWER_TEXT = "whitespace-pre-wrap break-words font-read text-[15px] text-primary"

const BOX = "flex items-end gap-2 rounded-[1.25rem] border border-primary/10 p-1.5"

const BOX_TEXT =
  "max-h-40 min-h-9 flex-1 resize-none rounded-none bg-transparent px-2 py-1.5 shadow-none focus-visible:[outline:none]"

export function askedOf(answerer: string): string {
  return `Ask ${answerer}…`
}

export function emptySaid(answerer: string): string {
  return `Ask ${answerer} anything out of character. The answer opens the next turn.`
}

function waitingSaid(answerer: string): string {
  return `Waiting for ${answerer}`
}

function readSaid(answerer: string): string {
  return `Read by ${answerer}`
}

export function unbracketed(text: string): string {
  const trimmed = text.trim()
  return isOutOfCharacterFeedback(trimmed) ? trimmed.slice(1, -1).trim() : trimmed
}

export function bracketed(text: string): string {
  const trimmed = text.trim()
  return isOutOfCharacterFeedback(trimmed) ? trimmed : `[${trimmed}]`
}

function sentSaid(one: ChatSent, waiting: ReadonlySet<string>, answerer: string): string {
  if (one.refused !== null) return `Not sent: ${one.refused}`
  if (one.id === null) return SENDING
  return waiting.has(one.id) ? waitingSaid(answerer) : readSaid(answerer)
}

export function chatLinesOf(
  sent: readonly ChatSent[],
  pending: readonly PendingAction[],
  answerer: string
): readonly ChatLine[] {
  const asked = pending.filter((one) => one.kind === FEEDBACK)
  const waiting: ReadonlySet<string> = new Set(asked.map((one) => one.id))
  const mine: ReadonlySet<string | null> = new Set(sent.map((one) => one.id))
  const before: ChatLine[] = asked
    .filter((one) => !mine.has(one.id))
    .map((one) => ({
      key: one.id,
      from: "alan",
      text: unbracketed(one.text),
      said: waitingSaid(answerer),
    }))
  const after: ChatLine[] = sent.map((one) => ({
    key: one.key,
    from: "alan",
    text: one.text,
    said: sentSaid(one, waiting, answerer),
  }))
  return [...before, ...after]
}

function LineDrawn({ line }: { line: ChatLine }) {
  if (line.from === "game-master") {
    return (
      <li className="flex flex-col gap-1">
        <p className={ANSWER_TEXT}>{line.text}</p>
      </li>
    )
  }
  return (
    <li className={cn(ALAN_SAID, surfaceClass(2))}>
      <p className={ALAN_TEXT}>{line.text}</p>
      {line.said === null ? null : <span className={NOTE_LINE}>{line.said}</span>}
    </li>
  )
}

function useEndFollowed(count: number): (at: HTMLDivElement | null) => void {
  const [at, setAt] = useState<HTMLDivElement | null>(null)
  useLayoutEffect(() => {
    void count
    if (at !== null) at.scrollTop = at.scrollHeight
  }, [at, count])
  return setAt
}

export function ChatPanel({
  lines,
  answerer,
  onSend,
}: {
  lines: readonly ChatLine[]
  answerer: string
  onSend: (text: string) => void
}) {
  const box = useRef<HTMLTextAreaElement | null>(null)
  const send = useCallback(() => {
    const at = box.current
    const typed = at?.value.trim() ?? ""
    if (at === null || typed === "") return
    at.value = ""
    onSend(typed)
  }, [onSend])
  const returnSends = useReturnSends(send)
  const boxed = useCallback(
    (textarea: HTMLTextAreaElement | null) => {
      box.current = textarea
      return returnSends(textarea)
    },
    [returnSends]
  )
  const historyAt = useEndFollowed(lines.length)
  return (
    <section className={PANEL} aria-label="Chat">
      <ToggleGroup type="single" variant="elevation" size="sm" value={ASSISTANT}>
        <ToggleGroupItem value={ASSISTANT} className="px-3">
          {ASSISTANT_LABEL}
        </ToggleGroupItem>
      </ToggleGroup>
      <div ref={historyAt} className={HISTORY}>
        {lines.length === 0 ? (
          <p className={NOTE_LINE}>{emptySaid(answerer)}</p>
        ) : (
          <ol className="flex flex-col gap-3">
            {lines.map((line) => (
              <LineDrawn key={line.key} line={line} />
            ))}
          </ol>
        )}
      </div>
      <form
        className={cn(BOX, surfaceClass(1))}
        onSubmit={(event) => {
          event.preventDefault()
          send()
        }}
      >
        <Textarea
          ref={boxed}
          onKeyDown={(event) => {
            if (!sendsNow(event)) return
            event.preventDefault()
            send()
          }}
          rows={1}
          enterKeyHint="send"
          placeholder={askedOf(answerer)}
          aria-label={`Message to ${answerer}`}
          className={BOX_TEXT}
        />
        <Button
          type="submit"
          variant="accent"
          size="icon"
          className="shrink-0 rounded-full bg-accent text-surface-0"
          aria-label="Send"
        >
          <ArrowUp className="size-4" />
        </Button>
      </form>
    </section>
  )
}

function useAssistantChat(gameExternalId: string, answerer: string) {
  const userId = useUserId()
  const [pending, setPending] = useState<readonly PendingAction[]>([])
  const [sent, setSent] = useState<readonly ChatSent[]>([])
  const refresh = useCallback(async () => {
    const read = await readWaiting(gameExternalId)
    if (read !== null) setPending(read.pending)
  }, [gameExternalId])
  useEffect(() => {
    if (userId === null) return
    void refresh()
    const every = window.setInterval(() => {
      void refresh()
    }, POLL_MS)
    return () => window.clearInterval(every)
  }, [userId, refresh])
  const send = useCallback(
    (text: string) => {
      const key = crypto.randomUUID()
      setSent((held) => [...held, { key, text, id: null, refused: null }])
      void sendAction({ gameExternalId, text: bracketed(text) }).then((answered) => {
        setSent((held) =>
          held.map((one) =>
            one.key !== key
              ? one
              : answered.ok
                ? { ...one, id: answered.id }
                : { ...one, refused: answered.error }
          )
        )
        if (answered.ok) void refresh()
      })
    },
    [gameExternalId, refresh]
  )
  return { lines: chatLinesOf(sent, pending, answerer), send }
}

export function AssistantChat({
  gameExternalId,
  answerer,
}: {
  gameExternalId: string
  answerer: string
}) {
  const { lines, send } = useAssistantChat(gameExternalId, answerer)
  return <ChatPanel lines={lines} answerer={answerer} onSend={send} />
}

export function chatPlaced(
  placed: ReadonlyMap<string, ReactNode>,
  gameExternalId: string | undefined,
  narrator: string | null
): ReadonlyMap<string, ReactNode> {
  if (gameExternalId === undefined) return placed
  const drawn = (
    <AssistantChat
      key={chat.slug}
      gameExternalId={gameExternalId}
      answerer={feedbackTo(narrator)}
    />
  )
  return new Map<string, ReactNode>([...placed, [chat.slug, drawn]])
}
