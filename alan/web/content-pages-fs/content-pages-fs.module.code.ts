import type { Page } from "@akasha/pages-core/page-types"
import type { ContentPagePersistencePort } from "@akasha/pages-ui-store/collection/content-persistence"
import { z } from "zod"
import { getFilesystem } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  addContentPageIds,
  addPinnedIds,
  type ContentPageIndex,
  computeEvictableIds,
  EMPTY_CONTENT_PAGE_INDEX,
  MAX_UNPINNED_CACHED_BODIES,
  mergeContentPage,
  parseContentPageIndex,
  parsePersistedContentPage,
  removeContentPageIds,
  serializeContentPage,
  serializeContentPageIndex,
  touchRecency,
} from "../content-pages-cache-core/content-pages-cache-core.module.code.ts"
import {
  deleteDocumentsFile,
  listDocumentsFiles,
} from "../offline-cache-fs/offline-cache-fs.module.code.ts"
import { namespacedPath } from "../offline-cache-namespace/offline-cache-namespace.module.code.ts"

const INDEX_BASENAME = "content-pages-index.json"

function pageBaseName(id: string): string {
  return `content-page-${id}.json`
}

function indexPath(): string | null {
  return namespacedPath(INDEX_BASENAME)
}

function pageFilePath(id: string): string | null {
  return namespacedPath(pageBaseName(id))
}

function isContentCacheFile(name: string): boolean {
  const isIndex = name === INDEX_BASENAME || name.endsWith(`--${INDEX_BASENAME}`)
  const isBody = name.startsWith("content-page-") || name.includes("--content-page-")
  return isIndex || isBody
}

const ReadFileResultSchema = z.object({ data: z.string() })

async function readRawFile(path: string): Promise<string | null> {
  const fs = getFilesystem()
  if (fs == null) return null
  try {
    const result = await fs.readFile({ path, directory: "DOCUMENTS", encoding: "utf8" })
    const file = ReadFileResultSchema.safeParse(result)
    return file.success ? file.data.data : null
  } catch {
    return null
  }
}

async function writeRawFile(path: string, data: string): Promise<void> {
  const fs = getFilesystem()
  if (fs == null) return
  await fs.writeFile({ path, data, directory: "DOCUMENTS", encoding: "utf8" })
}

async function readIndex(): Promise<ContentPageIndex> {
  const path = indexPath()
  if (path === null) return EMPTY_CONTENT_PAGE_INDEX
  const raw = await readRawFile(path)
  return raw === null ? EMPTY_CONTENT_PAGE_INDEX : parseContentPageIndex(raw)
}

async function writeIndex(index: ContentPageIndex): Promise<void> {
  const path = indexPath()
  if (path === null) return
  await writeRawFile(path, serializeContentPageIndex(index))
}

async function readCachedPage(id: string): Promise<Page | null> {
  const path = pageFilePath(id)
  if (path === null) return null
  const raw = await readRawFile(path)
  return raw === null ? null : parsePersistedContentPage(raw)
}

export function createNativeFsContentPersistence(): ContentPagePersistencePort {
  let chain: Promise<unknown> = Promise.resolve()
  function enqueue<T>(op: () => Promise<T>): Promise<T> {
    const run = chain.then(op, op)
    chain = run.catch(() => undefined)
    return run
  }

  const doSave = async (pages: readonly Page[]): Promise<void> => {
    if (getFilesystem() == null || indexPath() === null || pages.length === 0) return
    const index = await readIndex()
    for (const page of pages) {
      const existing = index.ids.includes(page.id) ? await readCachedPage(page.id) : null
      const merged = mergeContentPage(existing, page)
      const path = pageFilePath(page.id)
      if (path !== null) await writeRawFile(path, serializeContentPage(merged))
    }
    const savedIds = pages.map((p) => p.id)
    const withIds = addContentPageIds(index, savedIds)
    const withRecency = touchRecency(withIds, savedIds)
    const victims = computeEvictableIds(withRecency, MAX_UNPINNED_CACHED_BODIES)
    for (const victimId of victims) {
      const path = pageFilePath(victimId)
      if (path !== null) await deleteDocumentsFile(path)
    }
    const nextIndex = removeContentPageIds(withRecency, victims)
    if (nextIndex !== index) await writeIndex(nextIndex)
  }

  const doLoad = async (ids: readonly string[]): Promise<readonly Page[]> => {
    if (getFilesystem() == null || indexPath() === null || ids.length === 0) return []
    const index = await readIndex()
    const cached = new Set(index.ids)
    const out: Page[] = []
    const hydrated: string[] = []
    for (const id of ids) {
      if (!cached.has(id)) continue
      const page = await readCachedPage(id)
      if (page !== null) {
        out.push(page)
        hydrated.push(id)
      }
    }
    const nextIndex = touchRecency(index, hydrated)
    if (nextIndex !== index) await writeIndex(nextIndex)
    return out
  }

  const doPin = async (ids: readonly string[]): Promise<void> => {
    if (getFilesystem() == null || indexPath() === null || ids.length === 0) return
    const index = await readIndex()
    const nextIndex = addPinnedIds(index, ids)
    if (nextIndex !== index) await writeIndex(nextIndex)
  }

  const doCachedIds = async (): Promise<readonly string[]> => {
    if (getFilesystem() == null || indexPath() === null) return []
    return (await readIndex()).ids
  }

  const doClear = async (): Promise<void> => {
    if (getFilesystem() == null) return
    const files = await listDocumentsFiles()
    for (const name of files) {
      if (isContentCacheFile(name)) await deleteDocumentsFile(name)
    }
  }

  return {
    loadPages: (ids) => enqueue(() => doLoad(ids)),
    savePages: (pages) => {
      void enqueue(() => doSave(pages)).catch((err: unknown) => {
        console.warn("[content-pages] save failed", err)
      })
    },
    pinPages: (ids) => {
      void enqueue(() => doPin(ids)).catch((err: unknown) => {
        console.warn("[content-pages] pin failed", err)
      })
    },
    cachedIds: () => enqueue(() => doCachedIds()),
    clear: () => {
      void enqueue(() => doClear()).catch((err: unknown) => {
        console.warn("[content-pages] clear failed", err)
      })
    },
  }
}
