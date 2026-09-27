import { expect, test } from "bun:test"
import { createCollection } from "@tanstack/db"
import {
  asPageRow,
  type PageRow,
  pageRowKey,
} from "akasha/page/ui-store/collection/modules/page-row/page-row.module.code.ts"
import { createPagesSyncController } from "akasha/page/ui-store/collection/modules/sync-controller/sync-controller.module.code.ts"

function pageNamed(id: string, title: string): PageRow {
  return asPageRow({ id, title, slug: id, page_type_slug: "note", attributes: {} })
}

function unsyncedCollection() {
  const controller = createPagesSyncController()
  const collection = createCollection<PageRow, string>({
    getKey: pageRowKey,
    sync: { sync: controller.sync },
  })
  return { controller, collection }
}

test("a row pushed before the collection syncs lands when it syncs", () => {
  const { controller, collection } = unsyncedCollection()
  expect(controller.isReady()).toBe(false)
  controller.seed([pageNamed("one", "One"), pageNamed("two", "Two")])
  controller.applyUpserts([pageNamed("one", "One, changed")])
  controller.applyDeletes(["two"])
  collection.startSyncImmediate()
  expect(controller.isReady()).toBe(true)
  expect(collection.get("one")?.title).toBe("One, changed")
  expect(collection.has("two")).toBe(false)
})

test("a reset pushed before the collection syncs drops what was held", () => {
  const { controller, collection } = unsyncedCollection()
  controller.seed([pageNamed("one", "One")])
  controller.resetAll()
  collection.startSyncImmediate()
  expect(collection.size).toBe(0)
})

test("a row pushed once the collection syncs lands at once", () => {
  const { controller, collection } = unsyncedCollection()
  collection.startSyncImmediate()
  controller.seed([pageNamed("one", "One")])
  controller.applyUpserts([pageNamed("one", "One, changed")])
  expect(collection.get("one")?.title).toBe("One, changed")
})
