import { expect, test } from "bun:test"
import {
  eventIn,
  streamOver,
} from "akasha/page/service/modules/events-reading/events-reading.module.code.ts"

test("an event is named by its event line and carries its data", () => {
  expect(eventIn('event: page\ndata: {"slug":"seat"}')).toEqual({
    name: "page",
    data: '{"slug":"seat"}',
  })
  expect(eventIn(": beat")).toBeNull()
})

test("each event a stream carries is heard, and its end is heard once as a failure", async () => {
  const body = new Response(
    'event: stream\ndata: {"stream":"s"}\n\n: beat\n\nevent: page\ndata: 1\n\n'
  )
  const heard: string[] = []
  const ended = new Promise<undefined>((settle) => {
    const stream = streamOver(async () => body)
    stream.on("stream", (data) => {
      heard.push(`stream ${String(data)}`)
      return undefined
    })
    stream.on("page", (data) => {
      heard.push(`page ${String(data)}`)
      return undefined
    })
    stream.on("error", () => {
      heard.push("error")
      settle(undefined)
      return undefined
    })
  })
  await ended
  expect(heard).toEqual(['stream {"stream":"s"}', "page 1", "error"])
})

function heldOpen(beatEveryMs: number | null): Response {
  const encoder = new TextEncoder()
  let beating: ReturnType<typeof setInterval> | null = null
  return new Response(
    new ReadableStream<Uint8Array>({
      start: (control) => {
        control.enqueue(encoder.encode('event: stream\ndata: {"stream":"s"}\n\n'))
        if (beatEveryMs !== null) {
          beating = setInterval(() => control.enqueue(encoder.encode(": beat\n\n")), beatEveryMs)
        }
      },
      cancel: () => {
        if (beating !== null) clearInterval(beating)
      },
    })
  )
}

test("a stream held open that goes silent is heard as a failure", async () => {
  const failed = await new Promise<boolean>((settle) => {
    const stream = streamOver(async () => heldOpen(null), 40)
    stream.on("error", () => {
      settle(stream.closed())
      return undefined
    })
  })
  expect(failed).toBe(true)
})

test("a stream that beats is not heard as a failure however quiet its pages are", async () => {
  const heard: string[] = []
  const stream = streamOver(async () => heldOpen(10), 40)
  stream.on("error", () => {
    heard.push("error")
    return undefined
  })
  await Bun.sleep(200)
  expect(heard).toEqual([])
  expect(stream.closed()).toBe(false)
  stream.close()
})

test("a stream refused is heard as a failure", async () => {
  const failed = await new Promise<boolean>((settle) => {
    const stream = streamOver(async () => new Response("no", { status: 503 }))
    stream.on("error", () => {
      settle(stream.closed())
      return undefined
    })
  })
  expect(failed).toBe(true)
})
