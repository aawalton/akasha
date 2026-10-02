"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import {
  type SendCause,
  sendsNow,
  Textarea,
  useReturnSends,
} from "akasha/design/interface/primitive/modules/textarea/textarea.module.code.tsx"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import {
  type ActionBarMessageKind,
  classifyActionBarMessage,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import {
  fireContentNotification,
  notificationPermission,
  requestNotificationPermission,
} from "akasha/story/ui/modules/alert-notification/alert-notification.module.code.ts"
import {
  readWaiting,
  sendAction,
} from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"
import {
  armedAfterTyping,
  awaitsTurn,
  draftFilled,
  type Echo,
  echoDropped,
  echoesSettled,
  echoesShown,
  echoOf,
  echoWritten,
  type PendingAction,
  sendingFor,
  type TurnAwaited,
  turnAwaited,
  turnReadyNews,
  turnReadySaid,
} from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"
import type { Making } from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"

const POLL_MS = 5000

const PLACEHOLDER = "What do you do?"

const ALREADY_SENT = "You already sent this — Send again to repeat."

const SIGNED_OUT = "Sign in to send the game an action."

const SIGN_IN_AT = "/sign-in"

const FEEDBACK = "feedback"

const ACTION = "action"

const STILL_MAKING = "The turn is still being made. Feedback in [brackets] reaches the game master."

const MAKING_PLACEHOLDER = "[Feedback for the game master]"

const NOTE_LINE = "font-mono text-[12px] text-tertiary"

const ERROR_LINE = "font-mono text-[12px] text-red"

const ROW = "flex items-baseline justify-between gap-2 font-read text-[15px] text-tertiary italic"

const TAG = "shrink-0 font-mono text-[10px] text-tertiary uppercase not-italic tracking-[0.28em]"

function ActionRow({ text, kind }: { text: string; kind: ActionBarMessageKind }) {
  return (
    <p className={ROW}>
      <span>{text}</span>
      {kind === FEEDBACK ? <span className={TAG}>{FEEDBACK}</span> : null}
    </p>
  )
}

const SEND_BUTTON: SendCause = { trigger: "button", inputType: null, isComposing: false }

const SENT_UNSEEN: SendCause = { trigger: "unknown", inputType: null, isComposing: false }

function causeOfSubmit(held: SendCause | null, event: FormEvent): SendCause {
  if (held !== null) return held
  const submitted = event.nativeEvent
  const pressed = submitted instanceof SubmitEvent && submitted.submitter !== null
  return pressed ? SEND_BUTTON : SENT_UNSEEN
}

const FIRST_READ_GIVEN_MS = 3000

export function useFirstRead(): readonly [boolean, () => void] {
  const [read, setRead] = useState(false)
  const onRead = useCallback(() => setRead(true), [])
  useEffect(() => {
    const given = window.setTimeout(onRead, FIRST_READ_GIVEN_MS)
    return () => window.clearTimeout(given)
  }, [onRead])
  return [read, onRead]
}

function SignedOutNotice() {
  return (
    <p className={NOTE_LINE}>
      <a href={SIGN_IN_AT} className="underline underline-offset-2 hover:text-accent">
        {SIGNED_OUT}
      </a>
    </p>
  )
}

export function ActionBar({
  gameExternalId,
  storyTitle,
  turnsSeen,
  lastTurn,
  making,
  undoneAt = 0,
  onWaiting,
  onRead,
}: {
  gameExternalId: string
  storyTitle: string
  turnsSeen: number
  lastTurn: number | null
  making: Making | null
  undoneAt?: number
  onWaiting?: (waiting: boolean) => void
  onRead?: () => void
}) {
  const userId = useUserId()
  const [pending, setPending] = useState<readonly PendingAction[]>([])
  const [echoes, setEchoes] = useState<readonly Echo[]>([])
  const [text, setText] = useState("")
  const lineNow = useRef(text)
  lineNow.current = text
  const drafted = useRef<string | null>(null)
  const [armed, setArmed] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)
  const awaited = useRef<TurnAwaited>(null)
  const lastAskedAt = useRef(0)
  const turns = useRef(turnsSeen)
  turns.current = turnsSeen
  const toldAt = useRef(turnsSeen)
  const formAt = useRef<HTMLFormElement | null>(null)
  const sentBy = useRef<SendCause | null>(null)
  const lastInput = useRef<{ inputType: string; at: number } | null>(null)
  const sentAt = useRef<number | null>(null)
  const startedAfterSend = useRef<{ inputType: string; ms: number } | null>(null)
  const returnSends = useReturnSends((cause) => {
    sentBy.current = cause
    formAt.current?.requestSubmit()
  })

  const settle = useCallback((waiting: boolean, askedAt: number) => {
    awaited.current = turnAwaited(awaited.current, turns.current, Date.now(), waiting)
    const awaiting = awaited.current !== null
    setEchoes((held) => echoesSettled(held, askedAt, awaiting))
  }, [])

  const refresh = useCallback(async () => {
    const askedAt = Date.now()
    const read = await readWaiting(gameExternalId)
    if (read === null) return
    lastAskedAt.current = askedAt
    setPending(read.pending)
    settle(awaitsTurn(read.pending), askedAt)
    const filled = draftFilled(lineNow.current, read.draft, drafted.current)
    drafted.current = filled.filled
    if (filled.text !== null) setText(filled.text)
  }, [gameExternalId, settle])

  useEffect(() => {
    if (userId === null) {
      onRead?.()
      return
    }
    void refresh().finally(() => onRead?.())
    const every = window.setInterval(() => {
      void refresh()
    }, POLL_MS)
    return () => window.clearInterval(every)
  }, [userId, refresh, onRead])

  useEffect(() => {
    void turnsSeen
    settle(false, lastAskedAt.current)
  }, [turnsSeen, settle])

  useEffect(() => {
    if (undoneAt === 0) return
    void refresh()
  }, [undoneAt, refresh])

  useEffect(() => {
    if (turnReadyNews(toldAt.current, turnsSeen)) {
      fireContentNotification(storyTitle, turnReadySaid(lastTurn), gameExternalId)
    }
    toldAt.current = turnsSeen
  }, [turnsSeen, lastTurn, storyTitle, gameExternalId])

  function onType(typed: string) {
    setText(typed)
    setArmed((held) => armedAfterTyping(held, typed))
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    const cause = causeOfSubmit(sentBy.current, event)
    sentBy.current = null
    const boxLength = formAt.current?.querySelector("textarea")?.value.length ?? null
    if (sending) return
    const next = sendingFor(text, pending, echoes, armed)
    if (next === "none") return
    const typed = text.trim()
    if (making !== null && classifyActionBarMessage(typed) === ACTION) {
      setError(STILL_MAKING)
      return
    }
    if (next === "arm") {
      setArmed(typed)
      setError(null)
      return
    }
    setArmed(null)
    if (notificationPermission() === "default") void requestNotificationPermission()
    const key = crypto.randomUUID()
    setSending(true)
    setError(null)
    setSignedOut(false)
    setText("")
    const echo = echoOf(key, typed, Date.now())
    setEchoes((held) => [...held, echo])
    const now = Date.now()
    const seen = lastInput.current
    const before = seen === null ? null : { inputType: seen.inputType, ms: now - seen.at }
    const started = startedAfterSend.current
    startedAfterSend.current = null
    sentAt.current = now
    const sent = await sendAction({
      gameExternalId,
      text: typed,
      sentBy: {
        ...cause,
        length: typed.length,
        boxLength,
        lastInput: before,
        startedAfterSend: started,
      },
    })
    if (sent.ok) {
      setEchoes((held) => echoWritten(held, key, sent.id, Date.now()))
      if (awaitsTurn([echo])) {
        awaited.current = turnAwaited(awaited.current, turns.current, Date.now(), true)
      }
      void refresh()
    } else {
      setEchoes((held) => echoDropped(held, key))
      setSignedOut(sent.signedOut === true)
      setError(sent.error)
      setText((held) => (held === "" ? typed : held))
    }
    setSending(false)
  }

  const listed: readonly PendingAction[] =
    making === null ? pending : [...pending, { id: making.slug, text: making.action, kind: ACTION }]
  const shown = echoesShown(echoes, listed)
  const anyWaiting = listed.length + shown.length > 0

  useEffect(() => {
    onWaiting?.(anyWaiting)
  }, [anyWaiting, onWaiting])

  if (userId === null) return <SignedOutNotice />

  return (
    <div className="flex flex-col gap-3">
      {!anyWaiting ? null : (
        <div className="flex flex-col gap-1">
          {listed.map((one) => (
            <ActionRow key={one.id} text={one.text} kind={one.kind} />
          ))}
          {shown.map((echo) => (
            <ActionRow key={echo.key} text={echo.text} kind={echo.kind} />
          ))}
        </div>
      )}
      {making === null || making.said === null ? null : <p className={NOTE_LINE}>{making.said}</p>}
      <form ref={formAt} onSubmit={onSubmit} className="flex flex-col gap-2">
        {armed === null ? null : <p className={NOTE_LINE}>{ALREADY_SENT}</p>}
        {signedOut ? (
          <SignedOutNotice />
        ) : error === null ? null : (
          <p className={ERROR_LINE}>{error}</p>
        )}
        <div className="flex items-end gap-2">
          <Textarea
            ref={returnSends}
            value={text}
            onChange={(event) => onType(event.target.value)}
            onInput={(event) => {
              const typed = event.nativeEvent
              const inputType = typed instanceof InputEvent ? typed.inputType : "unknown"
              const at = Date.now()
              const since = sentAt.current
              if (since !== null && startedAfterSend.current === null) {
                startedAfterSend.current = { inputType, ms: at - since }
              }
              lastInput.current = { inputType, at }
            }}
            onKeyDown={(event) => {
              if (!sendsNow(event)) return
              event.preventDefault()
              sentBy.current = {
                trigger: "enter-keydown",
                inputType: null,
                isComposing: event.nativeEvent.isComposing,
              }
              event.currentTarget.form?.requestSubmit()
            }}
            rows={1}
            enterKeyHint="send"
            placeholder={making === null ? PLACEHOLDER : MAKING_PLACEHOLDER}
            aria-label="Your action"
            className={`${surfaceClass(1)} max-h-48 min-h-9 flex-1 resize-none`}
          />
          <Button type="submit" disabled={sending} className="hidden min-[584px]:inline-flex">
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}
