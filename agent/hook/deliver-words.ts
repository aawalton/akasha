import { closeSync, openSync, readSync, statSync } from "node:fs"
import { refusalText } from "../../checks/refusal/refusal.ts"
import { loadedFrom, unreadWordsIn, vocabularyOf, type Word } from "../../page/vocabulary/vocabulary.ts"
import { INSTRUCTIONS, rootsHere } from "../../repo/roots/roots.ts"
import { readLogFor } from "../read-log.ts"
import { writerIn } from "../writer.ts"
import { recordTold, toldOf } from "./word-notice.ts"

const TAIL = 400_000

const TURNS = 5

const MOST = 12

function spelled(words: readonly Word[]): string {
  const terms = words.map((word) => `\`${word.term}\``)
  if (terms.length === 1) return terms[0] as string
  return `${terms.slice(0, -1).join(", ")} and ${terms[terms.length - 1] as string}`
}

function named(words: readonly Word[]): string {
  return words.map((word) => `--file-path ${word.relPath}`).join(" ")
}

export function notice(words: readonly Word[]): string {
  return refusalText("coined-words-unread", { words: spelled(words), named: named(words) })
}

export function saidIn(lines: readonly string[], turns: number): string {
  const said: string[] = []
  for (let i = lines.length - 1; i >= 0 && said.length < turns; i -= 1) {
    let entry: unknown
    try {
      entry = JSON.parse(lines[i] as string)
    } catch {
      continue
    }
    if (entry === null || typeof entry !== "object") continue
    const fields = entry as Record<string, unknown>
    if (fields.type !== "assistant") continue
    const message = fields.message
    if (message === null || typeof message !== "object") continue
    const content = (message as Record<string, unknown>).content
    if (!Array.isArray(content)) continue
    const text = content
      .flatMap((block) => {
        if (block === null || typeof block !== "object") return []
        const one = block as Record<string, unknown>
        return one.type === "text" && typeof one.text === "string" ? [one.text] : []
      })
      .join("\n")
    if (text !== "") said.push(text)
  }
  return said.join("\n\n")
}

function tailOf(path: string): readonly string[] {
  let fd: number | null = null
  try {
    const size = statSync(path).size
    const span = Math.min(size, TAIL)
    const buffer = Buffer.allocUnsafe(span)
    fd = openSync(path, "r")
    readSync(fd, buffer, 0, span, size - span)
    const lines = buffer.toString("utf8").split("\n")
    return span < size ? lines.slice(1) : lines
  } catch {
    return []
  } finally {
    if (fd !== null) closeSync(fd)
  }
}

export async function deliverWords(): Promise<void> {
  let payload: unknown
  try {
    payload = JSON.parse(await Bun.stdin.text())
  } catch {
    return
  }
  if (payload === null || typeof payload !== "object") return
  const fields = payload as Record<string, unknown>
  const writer = writerIn(fields)
  if (writer === null) return
  const log = readLogFor(writer)
  if (log === null) return
  const transcript = fields.transcript_path
  if (typeof transcript !== "string" || transcript === "") return

  const said = saidIn(tailOf(transcript), TURNS)
  if (said === "") return

  const root = rootsHere()[INSTRUCTIONS]
  if (root === undefined) return
  const vocabulary = vocabularyOf(root)
  const loaded = loadedFrom(log.paths(), root, vocabulary)
  const told = toldOf(writer)
  const fresh = unreadWordsIn(said, loaded, vocabulary).filter((word) => !told.has(word.slug))
  if (fresh.length === 0) return

  const sending = fresh.slice(0, MOST)
  process.stdout.write(
    JSON.stringify({
      hookSpecificOutput: { hookEventName: "PreToolUse", additionalContext: notice(sending) },
    })
  )
  recordTold(
    writer,
    sending.map((word) => word.slug)
  )
}

if (import.meta.main) await deliverWords()
