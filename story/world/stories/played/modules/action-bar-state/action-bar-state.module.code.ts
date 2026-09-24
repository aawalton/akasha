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

export type Sending = "none" | "arm" | "send"

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

export function echoesSettled(echoes: readonly Echo[], askedAt: number): readonly Echo[] {
  const kept = echoes.filter((echo) => echo.id === null || echo.sentAt > askedAt)
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
