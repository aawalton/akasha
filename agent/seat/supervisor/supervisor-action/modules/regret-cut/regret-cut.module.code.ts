import { closeSync, openSync, readSync, statSync, truncateSync } from "node:fs"
import { readDeliveryRecords } from "akasha/agent/message/modules/channel-delivery/agent-message-channel-delivery.module.code.ts"
import {
  lastCompactionAt,
  shapedLine,
} from "akasha/agent/seat/observation/modules/conversation-shaping/conversation-shaping.computed-property-module.code.ts"
import {
  scanRecords,
  turnEnded,
} from "akasha/agent/seat/observation/seat-turn/modules/turn-working/turn-working.module.code.ts"
import type { Filed } from "akasha/page/computed-property/computed-property.page-type.ts"

const LINE_END = 10

export type RegretRefusal = "absent" | "mid-turn" | "overtaken" | "finished"

export type RegretCut = { readonly cut: number } | { readonly refused: RegretRefusal }

export const REFUSAL_SAID: Readonly<Record<RegretRefusal, string>> = {
  absent: "the seat's transcript holds that message nowhere since its last compaction",
  "mid-turn": "that message is already part of the reply in progress",
  overtaken: "something else was said to the seat after that message",
  finished: "the reply to that message has finished",
}

const everyone = (): boolean => true

function carries(line: string, messageId: string): boolean {
  if (!line.includes(messageId)) return false
  return readDeliveryRecords(line).some(
    (one) => (one.kind === "enqueue" || one.kind === "injection") && one.messageId === messageId
  )
}

function saidByAnother(line: string, messageId: string): boolean {
  const shaped = shapedLine(line, everyone)
  if ("compacted" in shaped) return false
  return shaped.entries.some((one) => one.kind === "person" && one.message !== messageId)
}

export function regretCutIn(bytes: Uint8Array, messageId: string, base = 0): RegretCut {
  const decoder = new TextDecoder()
  let idle = true
  let cut: number | null = null
  let foldedIn = false
  let from = 0
  while (from < bytes.length) {
    const end = bytes.indexOf(LINE_END, from)
    const upTo = end < 0 ? bytes.length : end
    const at = from
    const line = decoder.decode(bytes.subarray(at, upTo))
    from = upTo + 1
    if (line.trim() === "") continue
    if (cut === null && carries(line, messageId)) {
      if (idle) cut = base + at
      else foldedIn = true
    } else if (cut !== null && saidByAnother(line, messageId)) {
      return { refused: "overtaken" }
    }
    const answer = scanRecords(line, {}).answer
    if (answer === null) continue
    idle = turnEnded(answer)
    if (cut !== null && idle) return { refused: "finished" }
  }
  if (cut !== null) return { cut }
  return { refused: foldedIn ? "mid-turn" : "absent" }
}

function filedAt(path: string): Filed | null {
  let size: number
  try {
    size = statSync(path).size
  } catch {
    return null
  }
  return {
    size,
    read: (from, upTo) => {
      const held = openSync(path, "r")
      try {
        const into = new Uint8Array(Math.max(0, Math.min(upTo, size) - from))
        const read = readSync(held, into, 0, into.length, from)
        return into.subarray(0, read)
      } finally {
        closeSync(held)
      }
    },
  }
}

export function regretCutOf(path: string, messageId: string): RegretCut {
  const filed = filedAt(path)
  if (filed === null) return { refused: "absent" }
  const from = lastCompactionAt(filed)
  return regretCutIn(filed.read(from, filed.size), messageId, from)
}

export function cutTranscript(path: string, at: number): undefined {
  truncateSync(path, at)
}
