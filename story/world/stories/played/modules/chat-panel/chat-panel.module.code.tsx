"use client"

import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
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
import type { PageWatch } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"
import { FILE_BACKING_POLL_MS } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { getPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import { chat } from "akasha/story/ui/played-panel/panel-place/pages/chat.panel-place.ts"
import {
  CHAT_PLAYER,
  type ChatSaid,
  chatSaidIn,
} from "akasha/story/world/stories/played/modules/chat-lines/chat-lines.module.code.ts"
import {
  askedLoudly,
  reportThrown,
} from "akasha/story/world/stories/played/modules/played-asking/played-asking.module.code.ts"
import { chat as chatFile } from "akasha/story/world/stories/played/properties/chat.file-property.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { ArrowUp } from "lucide-react"
import { type ReactNode, useCallback, useEffect, useLayoutEffect, useRef, useState } from "react"

const THE_ASSISTANT = "the assistant"

export type ChatFrom = "alan" | "game-master"

export type ChatLine = {
  readonly key: string
  readonly from: ChatFrom
  readonly text: string
  readonly said: string | null
}

export type ChatPending = {
  readonly key: string
  readonly text: string
  readonly refused: string | null
}

const ASSISTANT = "assistant"

const ASSISTANT_LABEL = "Assistant"

const CHAT_AT = "/api/story-chat"

const ID_KEY = "id"

const CHAT_KEY = chatFile.propertySlug

const HELD = "jsonl"

const SENDING = "Sending…"

const NO_ANSWER = "the chat did not answer. Try again."

const SIGNED_OUT = "sign in to send a message."

const UNAUTHORIZED = 401

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
  return `Ask ${answerer} anything out of character.`
}

export function linesOf(
  said: readonly ChatSaid[],
  pending: readonly ChatPending[]
): readonly ChatLine[] {
  const kept: ChatLine[] = said.map((one, at) => ({
    key: `${at}:${one.at}`,
    from: one.from === CHAT_PLAYER ? "alan" : "game-master",
    text: one.body,
    said: null,
  }))
  const waiting: ChatLine[] = pending.map((one) => ({
    key: one.key,
    from: "alan",
    text: one.text,
    said: one.refused === null ? SENDING : `Not sent: ${one.refused}`,
  }))
  return [...kept, ...waiting]
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

async function chatRead(storyId: string): Promise<readonly ChatSaid[] | null> {
  const asked = await askedLoudly({
    "page-type": storyPlayed.slug,
    where: { id: { is: storyId } },
    keys: [ID_KEY, CHAT_KEY],
    files: [CHAT_KEY],
  })
  if (!asked.ok) return null
  const text = asked.answer.rows[0]?.values[CHAT_KEY]
  return chatSaidIn(typeof text === "string" && text !== HELD ? text : null)
}

async function chatSent(gameExternalId: string, text: string): Promise<string | null> {
  try {
    const answered = await apiFetch(CHAT_AT, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ gameExternalId, text }),
    })
    if (answered.status === UNAUTHORIZED) return SIGNED_OUT
    const said: unknown = await answered.json().catch(() => null)
    if (typeof said !== "object" || said === null) return NO_ANSWER
    if (Reflect.get(said, "ok") === true) return null
    const error: unknown = Reflect.get(said, "error")
    return typeof error === "string" ? error : NO_ANSWER
  } catch {
    return NO_ANSWER
  }
}

function useChatSaid(storyId: string): readonly [readonly ChatSaid[], () => Promise<void>] {
  const [said, setSaid] = useState<readonly ChatSaid[]>([])
  const asking = useRef<Promise<void> | null>(null)
  const ask = useCallback((): Promise<void> => {
    const running = asking.current
    if (running !== null) return running.then(() => ask())
    const made = chatRead(storyId)
      .catch((thrown: unknown) => {
        reportThrown(`reading the chat of ${storyId}`, thrown)
        return null
      })
      .then((read) => {
        asking.current = null
        if (read !== null) setSaid(read)
      })
    asking.current = made
    return made
  }, [storyId])
  useEffect(() => {
    let alive = true
    let watch: PageWatch | null = null
    void ask()
    void getPagesStore().then((store) => {
      if (alive) {
        watch = store.watchPage(storyPlayed.slug, storyId, () => {
          void ask()
          return undefined
        })
      }
    })
    const timer = setInterval(() => {
      if (watch === null || !watch.live()) void ask()
    }, FILE_BACKING_POLL_MS)
    return () => {
      alive = false
      clearInterval(timer)
      watch?.release()
    }
  }, [storyId, ask])
  return [said, ask]
}

function useStoryChat(storyId: string, gameExternalId: string) {
  const [said, ask] = useChatSaid(storyId)
  const [pending, setPending] = useState<readonly ChatPending[]>([])
  const send = useCallback(
    (text: string) => {
      const key = crypto.randomUUID()
      setPending((held) => [...held, { key, text, refused: null }])
      void chatSent(gameExternalId, text).then(async (refused) => {
        if (refused === null) await ask()
        setPending((held) =>
          refused === null
            ? held.filter((one) => one.key !== key)
            : held.map((one) => (one.key === key ? { ...one, refused } : one))
        )
      })
    },
    [gameExternalId, ask]
  )
  return { lines: linesOf(said, pending), send }
}

function StoryChat({ storyId, gameExternalId }: { storyId: string; gameExternalId: string }) {
  const { lines, send } = useStoryChat(storyId, gameExternalId)
  return <ChatPanel lines={lines} answerer={THE_ASSISTANT} onSend={send} />
}

export function chatPlaced(
  placed: ReadonlyMap<string, ReactNode>,
  gameExternalId: string | undefined,
  storyId: string
): ReadonlyMap<string, ReactNode> {
  if (gameExternalId === undefined) return placed
  const drawn = <StoryChat key={chat.slug} storyId={storyId} gameExternalId={gameExternalId} />
  return new Map<string, ReactNode>([...placed, [chat.slug, drawn]])
}
