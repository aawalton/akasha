import {
  readDocumentsFile,
  writeDocumentsFile,
} from "akasha/alan/web/modules/offline-cache-fs/offline-cache-fs.module.code.ts"
import {
  EMPTY_POSITION_STORE,
  migratePositionStore,
  type PositionStore,
  PositionStorePersistedSchema,
  setLocalPosition,
} from "akasha/alan/web/modules/offline-text-cache/offline-text-cache.module.code.ts"

const POSITION_STORE_PATH = "position-store.json"

async function readPositionStore(): Promise<PositionStore> {
  const raw = await readDocumentsFile(POSITION_STORE_PATH)
  if (raw == null) return EMPTY_POSITION_STORE
  try {
    const parsed = PositionStorePersistedSchema.safeParse(JSON.parse(raw))
    if (!parsed.success) return EMPTY_POSITION_STORE
    return migratePositionStore(parsed.data)
  } catch {
    return EMPTY_POSITION_STORE
  }
}

async function writePositionStore(store: PositionStore): Promise<void> {
  await writeDocumentsFile(POSITION_STORE_PATH, JSON.stringify(store))
}

export async function writeLocalPosition(pageId: string, progress: number): Promise<void> {
  const store = await readPositionStore()
  const updatedAt = new Date().toISOString()
  await writePositionStore(setLocalPosition(store, { pageId, progress, updatedAt }))
}

export async function readLocalPosition(pageId: string): Promise<number | undefined> {
  const store = await readPositionStore()
  return store.entries.find((e) => e.pageId === pageId)?.progress
}
