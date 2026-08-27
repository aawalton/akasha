import { describe, expect, it } from "bun:test"
import {
  type CachedChapter,
  type CacheIndex,
  CacheIndexPersistedSchema,
  CompletionQueuePersistedSchema,
  chunk,
  completionPatches,
  EMPTY_CACHE_INDEX,
  EMPTY_COMPLETION_QUEUE,
  EMPTY_POSITION_STORE,
  enqueueCompletion,
  localPositionFor,
  markChapterCompletedLocally,
  migrateCacheIndex,
  migrateCompletionQueue,
  migratePositionStore,
  offlineReadingList,
  PositionStorePersistedSchema,
  positionPatches,
  removeQueuedCompletions,
  removeSyncedPositions,
  setLocalPosition,
  upsertCachedChapter,
} from "./offline-text-cache"

function chapter(overrides: Partial<CachedChapter> = {}): CachedChapter {
  return {
    pageId: "p1",
    storyId: "s1",
    chapterNumber: 1,
    title: "Chapter 1",
    length: 100,
    fileName: "p1.txt",
    cachedAt: "2026-07-06T00:00:00.000Z",
    completedLocally: null,
    ...overrides,
  }
}

describe("upsertCachedChapter", () => {
  it("appends a new chapter", () => {
    const next = upsertCachedChapter(EMPTY_CACHE_INDEX, chapter())
    expect(next.chapters).toHaveLength(1)
    expect(next.chapters[0]?.pageId).toBe("p1")
  })

  it("replaces an existing chapter by pageId (no duplicates)", () => {
    const one = upsertCachedChapter(EMPTY_CACHE_INDEX, chapter({ title: "old" }))
    const two = upsertCachedChapter(one, chapter({ title: "new" }))
    expect(two.chapters).toHaveLength(1)
    expect(two.chapters[0]?.title).toBe("new")
  })

  it("preserves an existing local completion when re-caching (down-sync refresh must not clobber it)", () => {
    const completed = upsertCachedChapter(
      EMPTY_CACHE_INDEX,
      chapter({ completedLocally: "2026-07-06T10:00:00.000Z" })
    )
    const recached = upsertCachedChapter(
      completed,
      chapter({ completedLocally: null, title: "refreshed" })
    )
    expect(recached.chapters[0]?.completedLocally).toBe("2026-07-06T10:00:00.000Z")
    expect(recached.chapters[0]?.title).toBe("refreshed")
  })
})

describe("markChapterCompletedLocally", () => {
  it("stamps completedLocally on the matching chapter only", () => {
    const idx = upsertCachedChapter(
      upsertCachedChapter(EMPTY_CACHE_INDEX, chapter({ pageId: "p1" })),
      chapter({ pageId: "p2", fileName: "p2.txt" })
    )
    const marked = markChapterCompletedLocally(idx, "p1", "2026-07-06T12:00:00.000Z")
    expect(marked.chapters.find((c) => c.pageId === "p1")?.completedLocally).toBe(
      "2026-07-06T12:00:00.000Z"
    )
    expect(marked.chapters.find((c) => c.pageId === "p2")?.completedLocally).toBeNull()
  })
})

describe("enqueueCompletion", () => {
  it("appends a queued completion", () => {
    const q = enqueueCompletion(EMPTY_COMPLETION_QUEUE, {
      pageId: "p1",
      completedAt: "2026-07-06T09:00:00.000Z",
      length: 100,
      queuedAt: "2026-07-06T09:00:00.000Z",
    })
    expect(q.entries).toHaveLength(1)
  })

  it("dedups by pageId — last write wins (offline toggle re-queues, not duplicates)", () => {
    const first = enqueueCompletion(EMPTY_COMPLETION_QUEUE, {
      pageId: "p1",
      completedAt: "2026-07-06T09:00:00.000Z",
      length: 100,
      queuedAt: "2026-07-06T09:00:00.000Z",
    })
    const second = enqueueCompletion(first, {
      pageId: "p1",
      completedAt: "2026-07-06T11:00:00.000Z",
      length: 100,
      queuedAt: "2026-07-06T11:00:00.000Z",
    })
    expect(second.entries).toHaveLength(1)
    expect(second.entries[0]?.completedAt).toBe("2026-07-06T11:00:00.000Z")
  })
})

describe("completionPatches", () => {
  it("projects the queue to {pageId, completedAt, length} patch inputs", () => {
    const q = enqueueCompletion(EMPTY_COMPLETION_QUEUE, {
      pageId: "p1",
      completedAt: "2026-07-06T09:00:00.000Z",
      length: 100,
      queuedAt: "2026-07-06T09:00:00.000Z",
    })
    expect(completionPatches(q)).toEqual([
      { pageId: "p1", completedAt: "2026-07-06T09:00:00.000Z", length: 100 },
    ])
  })
})

describe("offlineReadingList", () => {
  it("orders chapters oldest→newest, nulls last, and flags completion", () => {
    const index = {
      version: 2 as const,
      chapters: [
        chapter({ pageId: "c3", chapterNumber: 3, title: "Three" }),
        chapter({ pageId: "c1", chapterNumber: 1, title: "One" }),
        chapter({ pageId: "cN", chapterNumber: null, title: "Appendix" }),
        chapter({
          pageId: "c2",
          chapterNumber: 2,
          title: "Two",
          completedLocally: "2026-07-06T00:00:00.000Z",
        }),
      ],
    }
    const list = offlineReadingList(index)
    expect(list.map((c) => c.pageId)).toEqual(["c1", "c2", "c3", "cN"])
    expect(list.map((c) => c.completed)).toEqual([false, true, false, false])
  })

  it("is empty for an empty index", () => {
    expect(offlineReadingList(EMPTY_CACHE_INDEX)).toEqual([])
  })
})

describe("removeQueuedCompletions", () => {
  it("drops only the entries that synced successfully", () => {
    let q = enqueueCompletion(EMPTY_COMPLETION_QUEUE, {
      pageId: "p1",
      completedAt: "t1",
      length: 100,
      queuedAt: "t1",
    })
    q = enqueueCompletion(q, { pageId: "p2", completedAt: "t2", length: 100, queuedAt: "t2" })
    const remaining = removeQueuedCompletions(q, ["p1"])
    expect(remaining.entries).toHaveLength(1)
    expect(remaining.entries[0]?.pageId).toBe("p2")
  })
})

describe("chunk", () => {
  it("splits into consecutive batches of at most size, preserving order", () => {
    expect(chunk([1, 2, 3, 4, 5], 2)).toEqual([[1, 2], [3, 4], [5]])
  })

  it("returns one batch when size exceeds length", () => {
    expect(chunk([1, 2], 5)).toEqual([[1, 2]])
  })

  it("is empty for an empty input", () => {
    expect(chunk([], 3)).toEqual([])
  })

  it("coerces a non-positive size to 1 (never an infinite/empty batch)", () => {
    expect(chunk([1, 2], 0)).toEqual([[1], [2]])
  })
})

describe("setLocalPosition — offline position store", () => {
  it("appends a new entry", () => {
    const store = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 400,
      updatedAt: "2026-07-09T00:00:00.000Z",
    })
    expect(store.entries).toEqual([
      { pageId: "p1", progress: 400, updatedAt: "2026-07-09T00:00:00.000Z" },
    ])
  })

  it("overwrites the same pageId last-write-wins", () => {
    const first = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 600,
      updatedAt: "2026-07-09T00:00:00.000Z",
    })
    const second = setLocalPosition(first, {
      pageId: "p1",
      progress: 200,
      updatedAt: "2026-07-09T00:01:00.000Z",
    })
    expect(second.entries).toHaveLength(1)
    expect(second.entries[0]?.progress).toBe(200)
  })
})

describe("localPositionFor", () => {
  it("returns the stored progress or undefined", () => {
    const store = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 400,
      updatedAt: "2026-07-09T00:00:00.000Z",
    })
    expect(localPositionFor(store, "p1")).toBe(400)
    expect(localPositionFor(store, "missing")).toBeUndefined()
  })
})

describe("positionPatches", () => {
  it("maps entries to replay patches carrying the stamp", () => {
    const store = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 400,
      updatedAt: "2026-07-09T00:00:00.000Z",
    })
    expect(positionPatches(store)).toEqual([
      { pageId: "p1", progress: 400, updatedAt: "2026-07-09T00:00:00.000Z" },
    ])
  })
})

describe("removeSyncedPositions — race-safe clear-on-drain", () => {
  const t0 = "2026-07-09T00:00:00.000Z"
  const t1 = "2026-07-09T00:05:00.000Z"

  it("drops an entry whose stamp is unchanged since it synced", () => {
    const store = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 400,
      updatedAt: t0,
    })
    const cleared = removeSyncedPositions(store, [{ pageId: "p1", updatedAt: t0 }])
    expect(cleared.entries).toHaveLength(0)
  })

  it("KEEPS an entry re-written since replay (a newer offline write, different stamp)", () => {
    const store = setLocalPosition(EMPTY_POSITION_STORE, {
      pageId: "p1",
      progress: 700,
      updatedAt: t1,
    })
    const cleared = removeSyncedPositions(store, [{ pageId: "p1", updatedAt: t0 }])
    expect(cleared.entries).toHaveLength(1)
    expect(cleared.entries[0]?.progress).toBe(700)
  })

  it("keeps entries that never synced", () => {
    const store = setLocalPosition(
      setLocalPosition(EMPTY_POSITION_STORE, { pageId: "p1", progress: 400, updatedAt: t0 }),
      { pageId: "p2", progress: 500, updatedAt: t0 }
    )
    const cleared = removeSyncedPositions(store, [{ pageId: "p1", updatedAt: t0 }])
    expect(cleared.entries.map((e) => e.pageId)).toEqual(["p2"])
  })
})

describe("CacheIndex versioned read (#15415)", () => {
  const v1Chapter = {
    pageId: "p1",
    storyId: "s1",
    chapterNumber: 1,
    title: "Chapter 1",
    wordCount: 100,
    fileName: "p1.txt",
    cachedAt: "2026-07-06T00:00:00.000Z",
    completedLocally: null,
  }

  it("migrates a parsed v1 payload — wordCount→length, every row preserved", () => {
    const parsed = CacheIndexPersistedSchema.safeParse({
      version: 1,
      chapters: [v1Chapter, { ...v1Chapter, pageId: "p2", fileName: "p2.txt", wordCount: null }],
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const v2 = migrateCacheIndex(parsed.data)
    expect(v2.version).toBe(2)
    expect(v2.chapters).toHaveLength(2)
    expect(v2.chapters[0]?.length).toBe(100)
    expect(v2.chapters[1]?.length).toBeNull()
    expect(v2.chapters[0]).not.toHaveProperty("wordCount")
  })

  it("passes a parsed v2 payload through unchanged", () => {
    const parsed = CacheIndexPersistedSchema.safeParse({ version: 2, chapters: [chapter()] })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    expect(migrateCacheIndex(parsed.data)).toEqual({ version: 2, chapters: [chapter()] })
  })

  it("rejects garbage so the read boundary falls back to EMPTY", () => {
    for (const garbage of [
      null,
      42,
      {},
      { version: 1, chapters: [{ nope: true }] },
      { version: 3, chapters: [] },
    ]) {
      expect(CacheIndexPersistedSchema.safeParse(garbage).success).toBe(false)
    }
  })
})

describe("PositionStore versioned read (#15415)", () => {
  const t0 = "2026-07-09T00:00:00.000Z"
  const index: CacheIndex = {
    version: 2,
    chapters: [chapter({ pageId: "p1", length: 200 })],
  }

  it("scales a v1 fraction to round(fraction * length) when the pageId is cached", () => {
    const parsed = PositionStorePersistedSchema.safeParse({
      version: 1,
      entries: [{ pageId: "p1", fraction: 0.5, updatedAt: t0 }],
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const v2 = migratePositionStore(parsed.data, index)
    expect(v2.version).toBe(2)
    expect(v2.entries[0]?.progress).toBe(100)
    expect(v2.entries[0]).not.toHaveProperty("fraction")
  })

  it("copies a v1 fraction as-is when the pageId has no length in the index", () => {
    const parsed = PositionStorePersistedSchema.safeParse({
      version: 1,
      entries: [{ pageId: "absent", fraction: 0.9, updatedAt: t0 }],
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const v2 = migratePositionStore(parsed.data, index)
    expect(v2.entries[0]?.progress).toBe(0.9)
  })

  it("passes a parsed v2 payload through unchanged", () => {
    const entry = { pageId: "p1", progress: 400, updatedAt: t0 }
    const parsed = PositionStorePersistedSchema.safeParse({ version: 2, entries: [entry] })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    expect(migratePositionStore(parsed.data, index)).toEqual({ version: 2, entries: [entry] })
  })

  it("rejects garbage so the read boundary falls back to EMPTY", () => {
    for (const garbage of [null, "x", { version: 1, entries: [{ nope: true }] }, { version: 9 }]) {
      expect(PositionStorePersistedSchema.safeParse(garbage).success).toBe(false)
    }
  })
})

describe("CompletionQueue versioned read (#15415)", () => {
  const t0 = "2026-07-09T00:00:00.000Z"
  const index: CacheIndex = {
    version: 2,
    chapters: [chapter({ pageId: "p1", length: 320 })],
  }

  it("recovers a v1 entry's length from the CacheIndex by pageId", () => {
    const parsed = CompletionQueuePersistedSchema.safeParse({
      version: 1,
      entries: [{ pageId: "p1", completedAt: t0, queuedAt: t0 }],
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const v2 = migrateCompletionQueue(parsed.data, index)
    expect(v2.version).toBe(2)
    expect(v2.entries).toHaveLength(1)
    expect(v2.entries[0]?.length).toBe(320)
  })

  it("drops a v1 entry whose pageId is absent from the index", () => {
    const parsed = CompletionQueuePersistedSchema.safeParse({
      version: 1,
      entries: [
        { pageId: "p1", completedAt: t0, queuedAt: t0 },
        { pageId: "absent", completedAt: t0, queuedAt: t0 },
      ],
    })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    const v2 = migrateCompletionQueue(parsed.data, index)
    expect(v2.entries).toHaveLength(1)
    expect(v2.entries[0]?.pageId).toBe("p1")
  })

  it("passes a parsed v2 payload through unchanged", () => {
    const entry = { pageId: "p1", completedAt: t0, length: 320, queuedAt: t0 }
    const parsed = CompletionQueuePersistedSchema.safeParse({ version: 2, entries: [entry] })
    expect(parsed.success).toBe(true)
    if (!parsed.success) return
    expect(migrateCompletionQueue(parsed.data, index)).toEqual({ version: 2, entries: [entry] })
  })

  it("rejects garbage so the read boundary falls back to EMPTY", () => {
    for (const garbage of [null, "x", { version: 1, entries: [{ nope: true }] }, { version: 9 }]) {
      expect(CompletionQueuePersistedSchema.safeParse(garbage).success).toBe(false)
    }
  })
})
