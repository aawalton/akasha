import { z } from "zod"
import { apiFetch } from "../api-fetch/api-fetch.module.code.ts"
import {
  type FilesystemPlugin,
  getFilesystem,
} from "../capacitor-bridge/capacitor-bridge.module.code.ts"
import {
  type ChunkObservation,
  type DownloadProgress,
  integrateChunk,
  parseContentRange,
  planNextStep,
  resolveProgressFraction,
  shouldResetPartial,
  verifyComplete,
} from "../offline-download-plan/offline-download-plan.module.code.ts"

const INDEX_PATH = "downloads-index.json"

const MAX_RESTARTS = 3

const EntrySchema = z
  .object({
    id: z.string(),
    pageId: z.string(),
    narratorSlug: z.string(),
    narratorLabel: z.string(),
    chapterTitle: z.string(),
    chapterNumber: z.number().nullable(),
    storyTitle: z.string().nullable(),
    fileName: z.string(),
    downloadedAt: z.string(),
  })
  .strict()

const IndexSchema = z
  .object({
    version: z.literal(1),
    entries: z.array(EntrySchema),
  })
  .strict()

type DownloadEntry = z.infer<typeof EntrySchema>
type DownloadIndex = z.infer<typeof IndexSchema>

const EMPTY_INDEX: DownloadIndex = { version: 1, entries: [] }

const ReadFileResultSchema = z.object({ data: z.string() })
const StatResultSchema = z.object({ size: z.number() })
const SidecarSchema = z
  .object({ token: z.string().nullable(), total: z.number().nullable() })
  .strict()

async function readIndex(): Promise<DownloadIndex> {
  const fs = getFilesystem()
  if (fs == null) return EMPTY_INDEX
  try {
    const result = await fs.readFile({ path: INDEX_PATH, directory: "DOCUMENTS", encoding: "utf8" })
    const file = ReadFileResultSchema.safeParse(result)
    if (!file.success) return EMPTY_INDEX
    const parsed: unknown = JSON.parse(file.data.data)
    const index = IndexSchema.safeParse(parsed)
    return index.success ? index.data : EMPTY_INDEX
  } catch {
    return EMPTY_INDEX
  }
}

async function writeIndex(index: DownloadIndex): Promise<void> {
  const fs = getFilesystem()
  if (fs == null) return
  await fs.writeFile({
    path: INDEX_PATH,
    data: JSON.stringify(index),
    directory: "DOCUMENTS",
    encoding: "utf8",
  })
}

export async function upsertEntry(entry: DownloadEntry): Promise<void> {
  const index = await readIndex()
  const entries = index.entries.filter((e) => e.id !== entry.id)
  entries.push(entry)
  await writeIndex({ version: 1, entries })
}

async function statSize(fs: FilesystemPlugin, path: string): Promise<number> {
  try {
    const result = await fs.stat({ path, directory: "DOCUMENTS" })
    const parsed = StatResultSchema.safeParse(result)
    return parsed.success ? parsed.data.size : 0
  } catch {
    return 0
  }
}

async function readSidecar(
  fs: FilesystemPlugin,
  path: string
): Promise<{ token: string | null; total: number | null } | null> {
  try {
    const result = await fs.readFile({ path, directory: "DOCUMENTS", encoding: "utf8" })
    const file = ReadFileResultSchema.safeParse(result)
    if (!file.success) return null
    const parsed = SidecarSchema.safeParse(JSON.parse(file.data.data))
    return parsed.success ? parsed.data : null
  } catch {
    return null
  }
}

async function writeSidecar(
  fs: FilesystemPlugin,
  path: string,
  token: string | null,
  total: number | null
): Promise<void> {
  await fs.writeFile({
    path,
    data: JSON.stringify({ token, total }),
    directory: "DOCUMENTS",
    encoding: "utf8",
  })
}

async function removeOrEmpty(fs: FilesystemPlugin, path: string): Promise<void> {
  if (typeof fs.deleteFile === "function") {
    await fs.deleteFile({ path, directory: "DOCUMENTS" }).catch(() => undefined)
    return
  }
  await fs.writeFile({ path, data: "", directory: "DOCUMENTS" })
}

async function clearPartial(
  fs: FilesystemPlugin,
  partPath: string,
  sidecarPath: string
): Promise<void> {
  await fs.writeFile({ path: partPath, data: "", directory: "DOCUMENTS" })
  await removeOrEmpty(fs, sidecarPath)
}

function bytesToBase64(bytes: Uint8Array): string {
  let binary = ""
  const STRIDE = 0x8000
  for (let i = 0; i < bytes.length; i += STRIDE) {
    binary += String.fromCharCode(...bytes.subarray(i, i + STRIDE))
  }
  return btoa(binary)
}

async function appendChunk(
  fs: FilesystemPlugin,
  partPath: string,
  bytes: Uint8Array
): Promise<void> {
  if (typeof fs.appendFile !== "function") {
    throw new Error("Offline download requires a Filesystem plugin with appendFile")
  }
  await fs.appendFile({ path: partPath, data: bytesToBase64(bytes), directory: "DOCUMENTS" })
}

export interface DownloadChapterArgs {
  pageId: string
  narratorSlug: string
  narratorLabel: string
  chapterTitle: string
  chapterNumber: number | null
  storyTitle: string | null
  onProgress?: (fraction: number) => void
}

export async function downloadChapter(args: DownloadChapterArgs): Promise<void> {
  const fs = getFilesystem()
  if (fs == null) {
    throw new Error("Offline download is only available in the native app shell")
  }

  const { pageId, narratorSlug } = args
  const id = `${pageId}__${narratorSlug}`
  const fileName = `${id}.mp3`
  const partPath = `${id}.part`
  const sidecarPath = `${id}.part.json`
  const input = `/api/media/${pageId}/audio?variant=${narratorSlug}`

  const sidecar = await readSidecar(fs, sidecarPath)
  let bytesOnDisk = await statSize(fs, partPath)
  let token = sidecar?.token ?? null
  let total = sidecar?.total ?? null
  if (shouldResetPartial(bytesOnDisk, token)) {
    await clearPartial(fs, partPath, sidecarPath)
    bytesOnDisk = 0
    token = null
    total = null
  }

  let progress: DownloadProgress = { bytesOnDisk, total, token }
  let restarts = 0

  for (;;) {
    const step = planNextStep(progress)
    if (step.kind === "error") throw new Error(`Offline download planning error: ${step.reason}`)
    if (step.kind === "complete") break

    const response = await apiFetch(input, { headers: { Range: step.range } })
    const body = new Uint8Array(await response.arrayBuffer())
    const observation: ChunkObservation = {
      status: response.status,
      etag: response.headers.get("ETag"),
      contentRange: parseContentRange(response.headers.get("Content-Range")),
      bytesReceived: body.byteLength,
    }

    const result = integrateChunk(progress, observation)
    if (result.kind === "error") {
      throw new Error(`Offline download failed: ${result.reason}`)
    }
    if (result.kind === "restart") {
      restarts += 1
      if (restarts > MAX_RESTARTS) {
        throw new Error("Offline download failed: object kept changing mid-download")
      }
      await clearPartial(fs, partPath, sidecarPath)
      progress = { bytesOnDisk: 0, total: null, token: null }
      continue
    }

    await appendChunk(fs, partPath, body)
    progress = result.next
    await writeSidecar(fs, sidecarPath, progress.token, progress.total)
    const fraction = resolveProgressFraction(progress.bytesOnDisk, progress.total)
    if (fraction != null) args.onProgress?.(fraction)
    if (result.kind === "complete") break
  }

  const finalSize = await statSize(fs, partPath)
  if (!verifyComplete(finalSize, progress.total)) {
    throw new Error("Offline download incomplete: final size did not match total")
  }
  await fs.rename({ from: partPath, to: fileName, directory: "DOCUMENTS" })
  await removeOrEmpty(fs, sidecarPath)
  await upsertEntry({
    id,
    pageId,
    narratorSlug,
    narratorLabel: args.narratorLabel,
    chapterTitle: args.chapterTitle,
    chapterNumber: args.chapterNumber,
    storyTitle: args.storyTitle,
    fileName,
    downloadedAt: new Date().toISOString(),
  })
}
