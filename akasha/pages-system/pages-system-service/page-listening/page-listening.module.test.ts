import { expect, test } from "bun:test"
import { join } from "node:path"
import { portFor, serverFor } from "./page-listening.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..", "..")

test("what is bound answers a question", async () => {
  const server = serverFor({ root: ROOT, port: 0 })
  try {
    const answered = await fetch(`${server.url}ask`, {
      method: "POST",
      body: JSON.stringify({ pageTypeSlug: "invariant-kind", keys: ["slug"] }),
    })
    expect(answered.status).toBe(200)
    const held = (await answered.json()) as { rows: readonly Record<string, unknown>[] }
    expect(held.rows.map((one) => one.slug)).toContain("departure")
  } finally {
    server.stop(true)
  }
})

test("what is bound refuses a path it does not answer at", async () => {
  const server = serverFor({ root: ROOT, port: 0 })
  try {
    const answered = await fetch(`${server.url}elsewhere`, { method: "POST", body: "{}" })
    expect(answered.status).toBe(404)
  } finally {
    server.stop(true)
  }
})

test("the port is read from the page rather than written here", () => {
  const held = portFor(ROOT)
  expect(held === null || typeof held === "number").toBe(true)
})

test("a question is answered while another is still being answered", async () => {
  const server = serverFor({ root: ROOT, port: 0 })
  try {
    const order: string[] = []
    const ask = (body: unknown, name: string) =>
      fetch(`${server.url}ask`, { method: "POST", body: JSON.stringify(body) })
        .then((one) => one.json())
        .then(() => {
          order.push(name)
        })
    const wide = Array.from({ length: 20 }, (_, one) =>
      ask({ pageTypeSlug: "module" }, `wide${one}`)
    )
    const narrow = ask({ pageTypeSlug: "invariant-kind", keys: ["slug"] }, "narrow")
    await Promise.all([...wide, narrow])
    expect(order.length).toBe(21)
    expect(order.indexOf("narrow")).toBeLessThan(10)
  } finally {
    server.stop(true)
  }
})
