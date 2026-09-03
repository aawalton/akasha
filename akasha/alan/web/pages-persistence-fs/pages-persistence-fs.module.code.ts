import type {
  PagesPersistencePort,
  PersistedPagesSnapshot,
} from "@akasha/pages-ui-store/collection/persistence"
import { z } from "zod"
import { getFilesystem } from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  deleteDocumentsFile,
  listDocumentsFiles,
} from "../offline-cache-fs/offline-cache-fs.module.code.ts"
import { namespacedPath } from "../offline-cache-namespace/offline-cache-namespace.module.code.ts"
import {
  parsePagesSnapshot,
  serializePagesSnapshot,
} from "../pages-persistence-core/pages-persistence-core.module.code.ts"

const SNAPSHOT_BASENAME = "pages-collection.json"

function snapshotPath(): string | null {
  return namespacedPath(SNAPSHOT_BASENAME)
}

function isSnapshotFile(name: string): boolean {
  return name === SNAPSHOT_BASENAME || name.endsWith(`--${SNAPSHOT_BASENAME}`)
}

const ReadFileResultSchema = z.object({ data: z.string() })

async function readSnapshotFile(): Promise<string | null> {
  const fs = getFilesystem()
  const path = snapshotPath()
  if (fs == null || path === null) return null
  try {
    const result = await fs.readFile({ path, directory: "DOCUMENTS", encoding: "utf8" })
    const file = ReadFileResultSchema.safeParse(result)
    return file.success ? file.data.data : null
  } catch {
    return null
  }
}

async function writeSnapshotFile(data: string): Promise<void> {
  const fs = getFilesystem()
  const path = snapshotPath()
  if (fs == null || path === null) return
  await fs.writeFile({ path, data, directory: "DOCUMENTS", encoding: "utf8" })
}

export function createNativeFsPagesPersistence(): PagesPersistencePort {
  let writing = false
  let queued: PersistedPagesSnapshot | null = null

  const flush = async (): Promise<void> => {
    if (writing) return
    writing = true
    try {
      while (queued !== null) {
        const snapshot = queued
        queued = null
        await writeSnapshotFile(serializePagesSnapshot(snapshot))
      }
    } catch (err: unknown) {
      console.warn("[pages-persistence] snapshot write failed", err)
    } finally {
      writing = false
    }
  }

  return {
    load: async () => {
      const raw = await readSnapshotFile()
      return raw === null ? null : parsePagesSnapshot(raw)
    },
    save: (snapshot) => {
      queued = snapshot
      void flush()
    },
    clear: () => {
      queued = null
      void (async () => {
        if (getFilesystem() == null) return
        const files = await listDocumentsFiles()
        for (const name of files) {
          if (isSnapshotFile(name)) await deleteDocumentsFile(name)
        }
      })().catch((err: unknown) => {
        console.warn("[pages-persistence] clear failed", err)
      })
    },
  }
}
