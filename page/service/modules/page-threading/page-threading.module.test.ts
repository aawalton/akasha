import { expect, test } from "bun:test"
import { join } from "node:path"
import { rootOf } from "akasha/command/modules/rooting/rooting.module.code.ts"
import {
  readAt,
  threadedAt,
  threadsFor,
} from "akasha/page/service/modules/page-threading/page-threading.module.code.ts"

const ROOT = rootOf(import.meta.dir)

const CODE_AT = join(import.meta.dir, "page-threading.module.code.ts")

const ENTRY = URL.createObjectURL(new Blob([`import ${JSON.stringify(CODE_AT)}\n`]))

const AT = "http://threads.invalid"

function asked(path: string, body: unknown): Request {
  return new Request(`${AT}${path}`, { method: "POST", body: JSON.stringify(body) })
}

test("a question, a read, a shape and a file are reads, and a write is not", () => {
  for (const one of ["/ask", "/read", "/shape", "/file"]) expect(readAt(`${AT}${one}`)).toBe(true)
  for (const one of ["/write", "/append", "/place", "/increment", "/events"]) {
    expect(readAt(`${AT}${one}`)).toBe(false)
  }
})

test("a stream and what it follows are answered where the service listens", () => {
  expect(threadedAt(`${AT}/events`)).toBe(false)
  expect(threadedAt(`${AT}/follow`)).toBe(false)
  expect(threadedAt(`${AT}/ask`)).toBe(true)
  expect(threadedAt(`${AT}/write`)).toBe(true)
})

test("a question asked on a thread is answered", async () => {
  const threads = threadsFor(ROOT, ENTRY, 1)
  try {
    const answered = await threads.answered(
      asked("/ask", { pageTypeSlug: "decision-kind", keys: ["slug"] })
    )
    expect(answered.status).toBe(200)
    const held = (await answered.json()) as { rows: readonly Record<string, unknown>[] }
    expect(held.rows.map((one) => one.slug)).toContain("departure")
  } finally {
    await threads.stopped()
  }
}, 60000)

test("a write refused for its shape is refused on the writing thread", async () => {
  const threads = threadsFor(ROOT, ENTRY, 1)
  try {
    const answered = await threads.answered(asked("/write", { puts: [] }))
    expect(answered.status).toBe(400)
    expect(((await answered.json()) as { refused: string }).refused).not.toBe("")
  } finally {
    await threads.stopped()
  }
}, 60000)

test("a narrow question is answered while wide ones are still being answered", async () => {
  const threads = threadsFor(ROOT, ENTRY, 3)
  try {
    const order: string[] = []
    const ask = (body: unknown, name: string) =>
      threads
        .answered(asked("/ask", body))
        .then((one) => one.json())
        .then(() => {
          order.push(name)
        })
    const wide = [0, 1].map((one) => ask({ pageTypeSlug: "module" }, `wide${one}`))
    const narrow = ask({ pageTypeSlug: "decision-kind", keys: ["slug"] }, "narrow")
    await Promise.all([...wide, narrow])
    expect(order.length).toBe(3)
    expect(order.indexOf("narrow")).toBeLessThan(2)
  } finally {
    await threads.stopped()
  }
}, 60000)
