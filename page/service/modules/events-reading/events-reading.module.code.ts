import type { StreamLike } from "akasha/page/ui-store/collection/modules/change-following/change-following.module.code.ts"

const APART = "\n\n"

const UNNAMED = "message"

const FAILED = "error"

export type Opening = (signal: AbortSignal) => Promise<Response>

export type Heard = { readonly name: string; readonly data: string }

export function eventIn(block: string): Heard | null {
  let name = UNNAMED
  const data: string[] = []
  for (const line of block.split("\n")) {
    if (line.startsWith("event:")) name = line.slice("event:".length).trim()
    if (line.startsWith("data:")) data.push(line.slice("data:".length).trimStart())
  }
  return data.length === 0 ? null : { name, data: data.join("\n") }
}

export function streamOver(opening: Opening): StreamLike {
  const aborting = new AbortController()
  const heard = new Map<string, ((data: unknown) => undefined)[]>()
  let closed = false

  const tell = (name: string, data: unknown): undefined => {
    for (const one of heard.get(name) ?? []) one(data)
    return undefined
  }

  const ended = (): undefined => {
    if (closed) return undefined
    closed = true
    aborting.abort()
    return tell(FAILED, undefined)
  }

  const read = async (): Promise<undefined> => {
    try {
      const answered = await opening(aborting.signal)
      if (!answered.ok || answered.body === null) return ended()
      const reader = answered.body.getReader()
      const decoder = new TextDecoder()
      let waiting = ""
      for (;;) {
        const { value, done } = await reader.read()
        if (done) break
        waiting += decoder.decode(value, { stream: true })
        const blocks = waiting.split(APART)
        waiting = blocks.pop() ?? ""
        for (const block of blocks) {
          const one = eventIn(block)
          if (one !== null && !closed) tell(one.name, one.data)
        }
      }
    } catch {}
    return ended()
  }

  void read()
  return {
    on: (name, listener) => {
      heard.set(name, [...(heard.get(name) ?? []), listener])
      return undefined
    },
    closed: () => closed,
    close: () => {
      if (closed) return undefined
      closed = true
      aborting.abort()
      return undefined
    },
  }
}
