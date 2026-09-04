import { BasicIndex, type Collection, type CollectionConfig, createCollection } from "@tanstack/db"
import { type PageRow, pageRowKey } from "../page-row/page-row.module.code.ts"
import {
  createPagesSyncController,
  type PagesSyncController,
} from "../sync-controller/sync-controller.module.code.ts"

export interface PagesCollectionHandle {
  readonly collection: Collection<PageRow, string>
  readonly controller: PagesSyncController
  readonly cleanup: () => undefined
}

export function createPagesCollection(onMutation?: () => undefined): PagesCollectionHandle {
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
