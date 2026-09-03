import { shape } from "@tools/lib/shape"

export const PORT_READ_BUDGET_MS = 5_000

const PORT_LINE_DIGITS = shape.string().regex(/^\d+$/)
const PORT_NUMBER = shape.number().int().min(1).max(65535)

export function parsePortLine(line: string): number {
  return PORT_NUMBER.parse(Number.parseInt(PORT_LINE_DIGITS.parse(line), 10))
}

export async function readFirstLineAsPort(
  stream: ReadableStream<Uint8Array> | undefined,
  timeoutMs: number
): Promise<number> {
  if (stream == null) {
    throw new Error("oauth-proxy spawn: stdout stream is undefined")
  }
  const reader = stream.getReader()
  const decoder = new TextDecoder()
  let buffer = ""
  let timeoutHandle: ReturnType<typeof setTimeout> | undefined
  const timeoutPromise = new Promise<never>((_, reject) => {
    timeoutHandle = setTimeout(
      () => reject(new Error(`oauth-proxy spawn: timed out waiting for port (${timeoutMs}ms)`)),
      timeoutMs
    )
  })
  try {
    while (true) {
      const result = await Promise.race([reader.read(), timeoutPromise])
      if (result.done) {
        throw new Error("oauth-proxy spawn: stdout closed before port line")
      }
      buffer += decoder.decode(result.value, { stream: true })
      const newlineIdx = buffer.indexOf("\n")
      if (newlineIdx >= 0) {
        const line = buffer.slice(0, newlineIdx).trim()
        const port = parsePortLine(line)
        void drainRemaining(reader, buffer.slice(newlineIdx + 1))
        return port
      }
    }
  } finally {
    if (timeoutHandle) clearTimeout(timeoutHandle)
  }
}

async function drainRemaining(
  reader: ReadableStreamDefaultReader<Uint8Array>,
  carry: string
): Promise<void> {
  try {
    if (carry.length > 0) process.stdout.write(carry)
    while (true) {
      const { done, value } = await reader.read()
      if (done) return
      if (value != null) process.stdout.write(value)
    }
  } catch {}
}
