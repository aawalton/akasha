import { expect, jest, test } from "bun:test"
import { asPageRow } from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { createPagesCollection } from "akasha/page/ui-store/collection/modules/pages-collection/pages-collection.module.code.ts"

const TEN_MINUTES_MS = 600_000

test("the collection keeps its rows and its sync long after its last subscriber leaves", async () => {
  jest.useFakeTimers()
  try {
    const { collection, controller } = createPagesCollection()
    collection.startSyncImmediate()
    controller.seed([
      asPageRow({ id: "one", title: "One", page_type_slug: "note", attributes: {} }),
    ])
    collection.subscribeChanges(() => undefined).unsubscribe()
    jest.advanceTimersByTime(TEN_MINUTES_MS)
    await new Promise((settled) => setImmediate(settled))
    jest.advanceTimersByTime(TEN_MINUTES_MS)
    expect(collection.status).toBe("ready")
    expect(controller.isReady()).toBe(true)
    expect(collection.get("one")?.title).toBe("One")
    controller.applyUpserts([
      asPageRow({ id: "one", title: "One, changed", page_type_slug: "note", attributes: {} }),
    ])
    expect(collection.get("one")?.title).toBe("One, changed")
  } finally {
    jest.useRealTimers()
  }
})
