import { afterEach, expect, mock, spyOn, test } from "bun:test"
import {
  type Following,
  reloadedFirst,
  stale,
} from "akasha/infrastructure/service/akasha-service/browser-extension/modules/build-following/build-following.module.code.ts"

afterEach(() => {
  mock.restore()
})

function areaOf(): Following["storage"]["local"] {
  const kept: Record<string, unknown> = {}
  return {
    get: (key) => Promise.resolve(key in kept ? { [key]: kept[key] } : {}),
    set: (items) => {
      Object.assign(kept, items)
      return Promise.resolve()
    },
    remove: (key) => {
      delete kept[key]
      return Promise.resolve()
    },
  }
}

function chromeOn(reloads: string[]): Following {
  return {
    alarms: { create: () => Promise.resolve(), onAlarm: { addListener: () => {} } },
    runtime: {
      getURL: (path: string) => `chrome-extension://here/${path}`,
      reload: () => {
        reloads.push("reloaded")
      },
    },
    storage: { local: areaOf(), session: areaOf() },
  }
}

function onDisk(stamp: string | null): undefined {
  const answer = () =>
    Promise.resolve(stamp === null ? new Response("", { status: 404 }) : new Response(`${stamp}\n`))
  spyOn(globalThis, "fetch").mockImplementation(Object.assign(answer, { preconnect: () => {} }))
}

test("the build started on is not stale", async () => {
  const chrome = chromeOn([])
  onDisk("one")
  expect(await stale(chrome)).toBe(false)
})

test("a newer stamp on disk is stale", async () => {
  const chrome = chromeOn([])
  onDisk("one")
  await stale(chrome)
  onDisk("two")
  expect(await stale(chrome)).toBe(true)
})

test("a stamp that cannot be read reloads nothing", async () => {
  const reloads: string[] = []
  const chrome = chromeOn(reloads)
  onDisk("one")
  await stale(chrome)
  onDisk(null)
  expect(await reloadedFirst(chrome)).toBe(false)
  expect(reloads).toEqual([])
})

test("a press on a stale build reloads first", async () => {
  const reloads: string[] = []
  const chrome = chromeOn(reloads)
  onDisk("one")
  await stale(chrome)
  onDisk("two")
  expect(await reloadedFirst(chrome)).toBe(true)
  expect(reloads).toEqual(["reloaded"])
})
