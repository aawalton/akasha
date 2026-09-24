"use client"

import { Button } from "akasha/design/interface/primitive/modules/button/button.module.code.tsx"
import { Input } from "akasha/design/interface/primitive/modules/input/input.module.code.tsx"
import { surfaceClass } from "akasha/design/interface/primitive/modules/surface-class/surface-class.module.code.ts"
import { useKeyboardInset } from "akasha/page/ui/block-editor/modules/use-keyboard-inset/use-keyboard-inset.module.code.ts"
import { useUserId } from "akasha/page/ui/modules/use-user-id/use-user-id.module.code.tsx"
import type { ActionBarMessageKind } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"
import {
  readPending,
  sendAction,
} from "akasha/story/world/stories/played/modules/action-bar-sending/action-bar-sending.module.code.ts"
import {
  armedAfterTyping,
  awaitsTurn,
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
} from "akasha/story/world/stories/played/modules/action-bar-state/action-bar-state.module.code.ts"
import { type FormEvent, useCallback, useEffect, useRef, useState } from "react"

const POLL_MS = 5000

const PLACEHOLDER = "What do you do?"

const ALREADY_SENT = "You already sent this — Send again to repeat."

const SIGNED_OUT = "Sign in to send the game an action."

const SIGN_IN_AT = "/sign-in"

const FEEDBACK = "feedback"

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
  turnsSeen,
}: {
  gameExternalId: string
  turnsSeen: number
}) {
  const userId = useUserId()
  const keyboardInset = useKeyboardInset()
  const [pending, setPending] = useState<readonly PendingAction[]>([])
  const [echoes, setEchoes] = useState<readonly Echo[]>([])
  const [text, setText] = useState("")
  const [armed, setArmed] = useState<string | null>(null)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)
  const awaited = useRef<TurnAwaited>(null)
  const lastAskedAt = useRef(0)
  const turns = useRef(turnsSeen)
  turns.current = turnsSeen

  const settle = useCallback((waiting: boolean, askedAt: number) => {
    awaited.current = turnAwaited(awaited.current, turns.current, Date.now(), waiting)
    const awaiting = awaited.current !== null
    setEchoes((held) => echoesSettled(held, askedAt, awaiting))
  }, [])

  const refresh = useCallback(async () => {
    const askedAt = Date.now()
    const read = await readPending(gameExternalId)
    if (read === null) return
    lastAskedAt.current = askedAt
    setPending(read)
    settle(awaitsTurn(read), askedAt)
  }, [gameExternalId, settle])

  useEffect(() => {
    if (userId === null) return
    void refresh()
    const every = window.setInterval(() => {
      void refresh()
    }, POLL_MS)
    return () => window.clearInterval(every)
  }, [userId, refresh])

  useEffect(() => {
    void turnsSeen
    settle(false, lastAskedAt.current)
  }, [turnsSeen, settle])

  function onType(typed: string) {
    setText(typed)
    setArmed((held) => armedAfterTyping(held, typed))
  }

  async function onSubmit(event: FormEvent) {
    event.preventDefault()
    if (sending) return
    const next = sendingFor(text, pending, echoes, armed)
    if (next === "none") return
    const typed = text.trim()
    if (next === "arm") {
      setArmed(typed)
      setError(null)
      return
    }
    setArmed(null)
    const key = crypto.randomUUID()
    setSending(true)
    setError(null)
    setSignedOut(false)
    setText("")
    const echo = echoOf(key, typed, Date.now())
    setEchoes((held) => [...held, echo])
    const sent = await sendAction({ gameExternalId, text: typed })
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

  if (userId === null) return <SignedOutNotice />

  const shown = echoesShown(echoes, pending)
  const inset = keyboardInset > 0 ? { paddingBottom: `${keyboardInset}px` } : undefined

  return (
    <div className="flex flex-col gap-3" style={inset}>
      {pending.length + shown.length === 0 ? null : (
        <div className="flex flex-col gap-1">
          {pending.map((one) => (
            <ActionRow key={one.id} text={one.text} kind={one.kind} />
          ))}
          {shown.map((echo) => (
            <ActionRow key={echo.key} text={echo.text} kind={echo.kind} />
          ))}
        </div>
      )}
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        {armed === null ? null : <p className={NOTE_LINE}>{ALREADY_SENT}</p>}
        {signedOut ? (
          <SignedOutNotice />
        ) : error === null ? null : (
          <p className={ERROR_LINE}>{error}</p>
        )}
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(event) => onType(event.target.value)}
            placeholder={PLACEHOLDER}
            aria-label="Your action"
            className={surfaceClass(1)}
          />
          <Button type="submit" disabled={sending}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}
