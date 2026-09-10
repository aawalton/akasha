import { expect, test } from "bun:test"
import { mkdtempSync, rmSync } from "node:fs"
import { join } from "node:path"
import { uncommittedIn } from "akasha/pages/uncommitted/page-uncommitted.module.code.ts"
import {
  bindsFor,
  boundAgain,
  LOOPBACK,
  portFor,
  saying,
  serversFor,
  UNBOUND,
  unboundIn,
} from "./page-listening.module.code.ts"

const ROOT = join(import.meta.dir, "..", "..", "..")

const NOWHERE = "this-name-is-nowhere.invalid"

const PAGE = "held/a.workstation-service.ts"

function onlyOne() {
  const bound = serversFor({ root: ROOT, port: 0, binds: [LOOPBACK] })
  const one = bound.servers[0]
  if (one === undefined) throw new Error("nothing was bound")
  return { server: one, at: `http://localhost:${one.port}/` }
}

test("what is bound answers a question", async () => {
  const { server, at } = onlyOne()
  try {
    const answered = await fetch(`${at}ask`, {
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
  const { server, at } = onlyOne()
  try {
    const answered = await fetch(`${at}elsewhere`, { method: "POST", body: "{}" })
    expect(answered.status).toBe(404)
  } finally {
    server.stop(true)
  }
})

test("the port is read from the page rather than written here", () => {
  const held = portFor(ROOT)
  expect(held === null || typeof held === "number").toBe(true)
})

test("the host names bound are read from the page rather than written here", () => {
  const held = bindsFor(ROOT)
  expect(held).toContain(LOOPBACK)
  expect(held).not.toContain("0.0.0.0")
})

test("what is bound is at the host name it was given and at no other", () => {
  const bound = serversFor({ root: ROOT, port: 0, binds: [LOOPBACK] })
  try {
    expect(bound.servers.length).toBe(1)
    expect(bound.servers[0]?.hostname).toBe(LOOPBACK)
  } finally {
    for (const one of bound.servers) one.stop(true)
  }
})

test("a host name that will not bind leaves the rest of the host names bound", () => {
  const bound = serversFor({ root: ROOT, port: 0, binds: [NOWHERE, LOOPBACK] })
  try {
    expect(bound.refused.length).toBe(1)
    expect(bound.refused[0]?.hostname).toBe(NOWHERE)
    expect(unboundIn(bound)).toEqual([NOWHERE])
    expect(bound.servers.length).toBe(1)
  } finally {
    for (const one of bound.servers) one.stop(true)
  }
})

test("a host name that will not bind is published beside the page", () => {
  const root = mkdtempSync("/var/tmp/page-listening-unbound-")
  try {
    saying(root, PAGE, [NOWHERE])
    expect(uncommittedIn(root, PAGE)?.[UNBOUND]).toEqual([NOWHERE])
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a service listening on every host name it states publishes none unbound", () => {
  const root = mkdtempSync("/var/tmp/page-listening-bound-")
  try {
    saying(root, PAGE, [NOWHERE])
    saying(root, PAGE, [])
    expect(uncommittedIn(root, PAGE)?.[UNBOUND]).toBe(undefined)
  } finally {
    rmSync(root, { recursive: true, force: true })
  }
})

test("a host name that would not bind is tried again and binds once it can", () => {
  const given = { root: ROOT, port: 0, binds: [] }
  const empty = serversFor(given)
  const mended = boundAgain(given, {
    ...empty,
    refused: [{ hostname: LOOPBACK, why: "nothing was listening" }],
  })
  try {
    expect(unboundIn(mended)).toEqual([])
    expect(mended.servers.length).toBe(1)
  } finally {
    for (const one of mended.servers) one.stop(true)
  }
})

test("a host name that will not bind is unbound again after another try", () => {
  const given = { root: ROOT, port: 0, binds: [NOWHERE] }
  const again = boundAgain(given, serversFor(given))
  expect(unboundIn(again)).toEqual([NOWHERE])
  expect(again.servers.length).toBe(0)
})

test("a question is answered while another is still being answered", async () => {
  const { server, at } = onlyOne()
  try {
    const order: string[] = []
    const ask = (body: unknown, name: string) =>
      fetch(`${at}ask`, { method: "POST", body: JSON.stringify(body) })
        .then((one) => one.json())
        .then(() => {
          order.push(name)
        })
    const wide = Array.from({ length: 20 }, (_, one) =>
      ask({ pageTypeSlug: "module" }, `wide${one}`)
    )
    const narrow = ask({ pageTypeSlug: "invariant-kind", keys: ["slug"] }, "narrow")
    await Promise.all([...wide, narrow])
    expect(order.length).toBe(wide.length + 1)
    expect(order.indexOf("narrow")).toBeLessThan(wide.length)
  } finally {
    server.stop(true)
  }
})
