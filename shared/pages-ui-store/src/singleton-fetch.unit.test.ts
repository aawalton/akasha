import { afterAll, describe, expect, mock, test } from "bun:test"
import type { FetchImpl } from "./collection/fetch-attach"
import type { FileBackingOptions } from "./collection/store"

type Captured = { fileBacking: FileBackingOptions | undefined }

const captured: Captured[] = []

const realStore = await import("./collection/store")
const realCreatePagesStore = realStore.createPagesStore

let currentCreatePagesStore = realCreatePagesStore

afterAll(() => {
  currentCreatePagesStore = realCreatePagesStore
})

mock.module("./collection/store", () => ({
  createPagesStore: (...args: Parameters<typeof realCreatePagesStore>) =>
    currentCreatePagesStore(...args),
}))

const { configurePagesStoreFetch, getPagesStore } = await import("./singleton")

describe("the pages store singleton takes a fetch of its own", () => {
  test("a fetch configured before the store is built is the one the store reads files with", async () => {
    currentCreatePagesStore = (...args: Parameters<typeof realCreatePagesStore>) => {
      captured.push({ fileBacking: args[3] })
      return realCreatePagesStore(...args)
    }

    const mine: FetchImpl = async () => new Response("{}")
    configurePagesStoreFetch(mine)

    await getPagesStore()

    expect(captured.length).toBe(1)
    expect(captured[0]?.fileBacking?.fetchImpl).toBe(mine)
  })

  test("configuring a fetch after the store is built says so rather than passing silently", async () => {
    const warned: string[] = []
    const realWarn = console.warn
    console.warn = (...args: readonly unknown[]) => {
      warned.push(args.map(String).join(" "))
    }
    try {
      configurePagesStoreFetch(async () => new Response("{}"))
    } finally {
      console.warn = realWarn
    }
    expect(warned.length).toBe(1)
    expect(warned[0]).toContain("after store creation")
  })
})
