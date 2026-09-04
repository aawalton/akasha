import { type FileHandle, open, stat } from "node:fs/promises"

const NEWLINE = 0x0a

const ANCHOR_BYTES = 64

const CHUNK_BYTES = 4 * 1024 * 1024

export interface Tail {
  offset: number
  anchor: string | null
}

export interface TailFold {
  readonly folded: number
  readonly bytesThere: number
  readonly refolded: boolean
  readonly missing: boolean
  readonly partial: string
}

export function emptyTail(): Tail {
  return { offset: 0, anchor: null }
}

async function anchorEnding(filePath: string, offset: number): Promise<string | null> {
  if (offset <= 0) {
    return null
  }
  const from = Math.max(0, offset - ANCHOR_BYTES)
  const wanted = offset - from
  const buffer = Buffer.allocUnsafe(wanted)
  let handle: FileHandle
  try {
    handle = await open(filePath, "r")
  } catch {
    return null
  }
  try {
    const { bytesRead } = await handle.read(buffer, 0, wanted, from)
    if (bytesRead !== wanted) {
      return null
    }
  } catch {
    return null
  } finally {
    await handle.close()
  }
  return buffer.toString("base64")
}

export interface TailSink {
  readonly line: (line: string) => undefined
  readonly reset: () => undefined
}

export async function foldTail(tail: Tail, filePath: string, sink: TailSink): Promise<TailFold> {
  let bytesThere: number
  try {
    bytesThere = (await stat(filePath)).size
  } catch {
    return { folded: 0, bytesThere: 0, refolded: false, missing: true, partial: "" }
  }

  let refolded = false
  const restart = (): undefined => {
    tail.offset = 0
    tail.anchor = null
    refolded = true
    sink.reset()
    return undefined
  }

  if (bytesThere < tail.offset) {
    restart()
  } else if (tail.offset > 0 && (await anchorEnding(filePath, tail.offset)) !== tail.anchor) {
    restart()
  }

  if (bytesThere === tail.offset) {
    return { folded: 0, bytesThere, refolded, missing: false, partial: "" }
  }

  const began = tail.offset
  let carry = Buffer.alloc(0)
  let read = tail.offset
  const handle = await open(filePath, "r")
  try {
    while (read < bytesThere) {
      const length = Math.min(CHUNK_BYTES, bytesThere - read)
      const buffer = Buffer.allocUnsafe(length)
      const { bytesRead } = await handle.read(buffer, 0, length, read)
      if (bytesRead === 0) {
        break
      }
      read += bytesRead
      const piece =
        carry.length === 0
          ? buffer.subarray(0, bytesRead)
          : Buffer.concat([carry, buffer.subarray(0, bytesRead)])
      const lastLineEnd = piece.lastIndexOf(NEWLINE, piece.length - 1)
      if (lastLineEnd < 0) {
        carry = Buffer.from(piece)
        continue
      }
      const whole = piece.subarray(0, lastLineEnd + 1).toString("utf8")
      carry = Buffer.from(piece.subarray(lastLineEnd + 1))
      tail.offset = read - carry.length
      for (const line of whole.split("\n")) {
        if (line === "") {
          continue
        }
        sink.line(line)
      }
      await Promise.resolve()
    }
  } finally {
    await handle.close()
  }

  const partial = carry.toString("utf8")
  tail.anchor = tail.offset > 0 ? await anchorEnding(filePath, tail.offset) : null

  return { folded: tail.offset - began, bytesThere, refolded, missing: false, partial }
}
