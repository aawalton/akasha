import {
  type ActionBarMessageKind,
  classifyActionBarMessage,
} from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

export type PendingAction = {
  readonly id: string
  readonly text: string
  readonly kind: ActionBarMessageKind
}

export type Echo = {
  readonly key: string
  readonly text: string
  readonly kind: ActionBarMessageKind
  readonly id: string | null
  readonly sentAt: number
}

type Sending = "none" | "arm" | "send"

export type TurnAwaited = { readonly turnsAt: number; readonly at: number } | null

export const TURN_AWAITED_MS = 600_000

const ACTION = "action"

export function awaitsTurn(sent: readonly { readonly kind: ActionBarMessageKind }[]): boolean {
  return sent.some((one) => one.kind === ACTION)
}

export function turnAwaited(
  awaited: TurnAwaited,
  turnsSeen: number,
  now: number,
  waiting: boolean
): TurnAwaited {
  if (waiting) return { turnsAt: turnsSeen, at: now }
  if (awaited === null) return null
  return turnsSeen > awaited.turnsAt || now - awaited.at > TURN_AWAITED_MS ? null : awaited
}

export function echoOf(key: string, text: string, sentAt: number): Echo {
  return { key, text, kind: classifyActionBarMessage(text), id: null, sentAt }
}

export function echoWritten(
  echoes: readonly Echo[],
  key: string,
  id: string,
  at: number
): readonly Echo[] {
  return echoes.map((echo) => (echo.key === key ? { ...echo, id, sentAt: at } : echo))
}

export function echoDropped(echoes: readonly Echo[], key: string): readonly Echo[] {
  return echoes.filter((echo) => echo.key !== key)
}

export function echoesSettled(
  echoes: readonly Echo[],
  askedAt: number,
  awaiting: boolean
): readonly Echo[] {
  const kept = echoes.filter(
    (echo) => echo.id === null || echo.sentAt > askedAt || (awaiting && echo.kind === ACTION)
  )
  return kept.length === echoes.length ? echoes : kept
}

export function echoesShown(
  echoes: readonly Echo[],
  pending: readonly PendingAction[]
): readonly Echo[] {
  return echoes.filter((echo) => echo.id === null || !pending.some((one) => one.id === echo.id))
}

export function sendingFor(
  typed: string,
  pending: readonly PendingAction[],
  echoes: readonly Echo[],
  armed: string | null
): Sending {
  const text = typed.trim()
  if (text === "") return "none"
  const already =
    pending.some((one) => one.text === text) || echoes.some((echo) => echo.text === text)
  return already && armed !== text ? "arm" : "send"
}

export function armedAfterTyping(armed: string | null, typed: string): string | null {
  return armed !== null && typed.trim() !== armed ? null : armed
}
