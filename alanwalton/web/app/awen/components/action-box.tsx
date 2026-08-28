"use client"

import { type ActionBarMessageKind, classifyActionBarMessage } from "@alanwalton/awen-core/action-bar-message"
import { Button } from "@shared/design-primitives/components/button"
import { Input } from "@shared/design-primitives/components/input"
import { surfaceClass } from "@shared/design-primitives/components/surface-class"
import { type FormEvent, useEffect, useState } from "react"
import { SignedOutNotice } from "~/components/signed-out-notice"
import { useKeyboardInset } from "../hooks/use-keyboard-inset"
import type { ClientPendingAction } from "../lib/client-envelope"
import { submitPlayerAction } from "../lib/submit-player-action"

type Echo = { key: string; text: string; kind: ActionBarMessageKind }

export interface ActionBoxState {
  readonly gameExternalId: string
  readonly pendingActions: readonly ClientPendingAction[]
  readonly visibleEchoes: readonly Echo[]
  readonly text: string
  readonly setText: (v: string) => void
  readonly onSubmit: (e: FormEvent) => Promise<void>
  readonly pending: boolean
  readonly error: string | null
  readonly signedOut: boolean
  readonly armedDuplicate: string | null
}

export function useActionBox({
  gameExternalId,
  pendingActions,
}: {
  gameExternalId: string
  pendingActions: readonly ClientPendingAction[]
}): ActionBoxState {
  const [text, setTextState] = useState("")
  const [echoes, setEchoes] = useState<readonly Echo[]>([])
  const [error, setError] = useState<string | null>(null)
  const [signedOut, setSignedOut] = useState(false)
  const [pending, setPending] = useState(false)
  const [armedDuplicate, setArmedDuplicate] = useState<string | null>(null)

  function setText(v: string) {
    setTextState(v)
    if (armedDuplicate !== null && v.trim() !== armedDuplicate) setArmedDuplicate(null)
  }

  useEffect(() => {
    setEchoes((prev) => {
      const next = prev.filter((echo) => !pendingActions.some((a) => a.text === echo.text))
      return next.length === prev.length ? prev : next
    })
  }, [pendingActions])

  function isPendingText(candidate: string): boolean {
    return (
      pendingActions.some((a) => a.text === candidate) || echoes.some((e) => e.text === candidate)
    )
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault()
    const trimmed = text.trim()
    if (trimmed === "" || pending) return

    if (isPendingText(trimmed) && armedDuplicate !== trimmed) {
      setArmedDuplicate(trimmed)
      setError(null)
      return
    }
    setArmedDuplicate(null)

    const key = crypto.randomUUID()
    setPending(true)
    setError(null)
    setSignedOut(false)
    setText("")
    setEchoes((prev) => [...prev, { key, text: trimmed, kind: classifyActionBarMessage(trimmed) }])
    const result = await submitPlayerAction({ gameExternalId, text: trimmed })
    if (!result.ok) {
      setEchoes((prev) => prev.filter((echo) => echo.key !== key))
      setSignedOut(result.signedOut === true)
      setError(result.error)
    }
    setPending(false)
  }

  const visibleEchoes = echoes.filter((echo) => !pendingActions.some((a) => a.text === echo.text))

  return {
    gameExternalId,
    pendingActions,
    visibleEchoes,
    text,
    setText,
    onSubmit,
    pending,
    error,
    signedOut,
    armedDuplicate,
  }
}

export function ActionRows({
  pendingActions,
  visibleEchoes,
}: Pick<ActionBoxState, "pendingActions" | "visibleEchoes">) {
  const hasRows = pendingActions.length > 0 || visibleEchoes.length > 0
  if (!hasRows) return null
  return (
    <div className="flex flex-col gap-1">
      {pendingActions.map((action, i) => (
        <ActionRow
          key={`server-${action.submittedAt}-${i}`}
          text={action.text}
          kind={action.kind}
        />
      ))}
      {visibleEchoes.map((echo) => (
        <ActionRow key={echo.key} text={echo.text} kind={echo.kind} />
      ))}
    </div>
  )
}

export function ActionComposer({ state }: { state: ActionBoxState }) {
  const keyboardInset = useKeyboardInset()
  const { text, setText, onSubmit, pending, error, signedOut, armedDuplicate } = state
  return (
    <div style={keyboardInset > 0 ? { paddingBottom: `${keyboardInset}px` } : undefined}>
      <form onSubmit={onSubmit} className="flex flex-col gap-2">
        {armedDuplicate !== null ? (
          <p className="font-mono text-[12px] text-tertiary">
            You already sent this — Send again to repeat.
          </p>
        ) : null}
        {signedOut ? (
          <SignedOutNotice />
        ) : error != null ? (
          <p className="font-mono text-[12px] text-red">⚠ {error}</p>
        ) : null}
        <div className="flex gap-2">
          <Input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="What do you do?"
            aria-label="Your action"
            className={surfaceClass(1)}
          />
          <Button type="submit" disabled={pending}>
            Send
          </Button>
        </div>
      </form>
    </div>
  )
}

function ActionRow({ text, kind }: { text: string; kind: ActionBarMessageKind }) {
  return (
    <p className="flex items-baseline justify-between gap-2 font-read text-[15px] text-tertiary italic">
      <span>{text}</span>
      {kind === "feedback" ? (
        <span className="shrink-0 font-mono text-[10px] text-tertiary uppercase not-italic tracking-[0.28em]">
          feedback
        </span>
      ) : null}
    </p>
  )
}
