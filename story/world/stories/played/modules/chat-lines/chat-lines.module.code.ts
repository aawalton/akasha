import { ACTION_BAR_PLAYER } from "akasha/story/engine/core/modules/action-bar-message/action-bar-message.module.code.ts"

export const CHAT_PLAYER = ACTION_BAR_PLAYER

export type ChatSaid = {
  readonly at: string
  readonly from: string
  readonly body: string
}

const BREAK = "\n"

export function chatLine(from: string, body: string, at: string): string {
  return `${JSON.stringify({ at, from, body })}${BREAK}`
}

function saidIn(line: string): ChatSaid | null {
  try {
    const held: unknown = JSON.parse(line)
    if (typeof held !== "object" || held === null) return null
    const at: unknown = Reflect.get(held, "at")
    const from: unknown = Reflect.get(held, "from")
    const body: unknown = Reflect.get(held, "body")
    if (typeof at !== "string" || typeof from !== "string" || typeof body !== "string") return null
    return { at, from, body }
  } catch {
    return null
  }
}

export function chatSaidIn(text: string | null): readonly ChatSaid[] {
  if (text === null) return []
  return text.split(BREAK).flatMap((line) => {
    if (line.trim() === "") return []
    const said = saidIn(line)
    return said === null ? [] : [said]
  })
}
