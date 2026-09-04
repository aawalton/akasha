import { appendFile, mkdir } from "node:fs/promises"
import { shape } from "@akasha/utils-narrow/shape"
import type { Infer } from "@akasha/utils-narrow/shape-core"
import { seatNameForSupervisorPid } from "../seat-presence-read/seat-presence-read.module.code.ts"

const MS_PER_MINUTE = 60_000

export const TypingMinuteRecordSchema = shape.object({
  minute: shape.number().finite(),
  seat: shape.string().min(1),
})

export type TypingMinuteRecord = Infer<typeof TypingMinuteRecordSchema>

export function typingSpoolDir(): string {
  const home = shape.string().default("/home/walton").parse(process.env.HOME)
  return `${home}/.cache/alan-typing-minutes`
}

export function minuteIndex(ms: number): number {
  return Math.floor(ms / MS_PER_MINUTE)
}

function dayKeyForMinute(index: number): string {
  const d = new Date(index * MS_PER_MINUTE)
  const year = String(d.getFullYear()).padStart(4, "0")
  const month = String(d.getMonth() + 1).padStart(2, "0")
  const day = String(d.getDate()).padStart(2, "0")
  return `${year}-${month}-${day}`
}

export function spoolFileForMinute(index: number): string {
  return `${typingSpoolDir()}/${dayKeyForMinute(index)}.jsonl`
}

export function spoolLine(record: TypingMinuteRecord): string {
  return `${JSON.stringify(record)}\n`
}

function readSeatName(pid: number): Promise<string | undefined> {
  return Promise.resolve(seatNameForSupervisorPid(pid) ?? undefined)
}

export interface TypingMinuteRecorder {
  readonly note: (ms: number) => undefined
}

export interface TypingMinuteRecorderOptions {
  readonly pid: number
  readonly append?: (index: number, line: string) => Promise<void>
  readonly resolveSeat?: (pid: number) => Promise<string | undefined>
}

const defaultAppend = async (index: number, line: string): Promise<void> => {
  await mkdir(typingSpoolDir(), { recursive: true })
  await appendFile(spoolFileForMinute(index), line, "utf8")
}

export function createTypingMinuteRecorder(
  options: TypingMinuteRecorderOptions
): TypingMinuteRecorder {
  const append = options.append ?? defaultAppend
  const resolveSeat = options.resolveSeat ?? readSeatName
  let lastMinute = Number.NEGATIVE_INFINITY

  return {
    note(ms: number): undefined {
      const index = minuteIndex(ms)
      if (index === lastMinute) return
      lastMinute = index
      void (async (): Promise<void> => {
        try {
          const seat = await resolveSeat(options.pid)
          if (seat === undefined) return
          await append(index, spoolLine({ minute: index, seat }))
        } catch {}
      })()
    },
  }
}
