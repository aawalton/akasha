import { BasicIndex, type Collection, type CollectionConfig, createCollection } from "@tanstack/db"
import { type PageRow, pageRowKey } from "./page-row"
import { createPagesSyncController, type PagesSyncController } from "./sync-controller"

export interface PagesCollectionHandle {
  readonly collection: Collection<PageRow, string>
  readonly controller: PagesSyncController
  readonly cleanup: () => void
}

export function createPagesCollection(onMutation?: () => void): PagesCollectionHandle {
  const controller = createPagesSyncController(onMutation)
  const config: CollectionConfig<PageRow, string> = {
    getKey: pageRowKey,
    sync: { sync: controller.sync },
  }
  const collection = createCollection(config)
  collection.createIndex((row) => row.page_type_slug, { indexType: BasicIndex })
  return {
    collection,
    controller,
    cleanup: () => {
      collection.cleanup()
    },
  }
}
