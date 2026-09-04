import { existsSync, statSync } from "node:fs"
import { type ObjectStore, seaweedFSObjectStoreFromEnv } from "@akasha/object-store/seaweedfs-store"

export function sessionObjectKeyFor(agentId: string): string {
  return `sessions/${agentId}.jsonl`
}

let defaultStore: ObjectStore | null = null
let defaultStoreResolved = false

export function getDefaultObjectStore(): ObjectStore | null {
  if (!defaultStoreResolved) {
    defaultStore = seaweedFSObjectStoreFromEnv()
    defaultStoreResolved = true
  }
  return defaultStore
}

export async function readSessionObject(store: ObjectStore, key: string): Promise<Uint8Array> {
  return store.get(key)
}

async function bytesBetween(
  filePath: string,
  from: number,
  to: number
): Promise<Uint8Array<ArrayBuffer>> {
  const part = Bun.file(filePath).slice(from, to)
  return new Uint8Array(await part.arrayBuffer())
}

export async function syncSessionFileToObjectStore(
  store: ObjectStore | null,
  key: string,
  filePath: string,
  state: { lastFlushedOffset: number }
): Promise<number> {
  if (store === null) return 0
  if (!existsSync(filePath)) return 0

  const size = statSync(filePath).size

  if (state.lastFlushedOffset === 0) {
    if (size === 0) return 0
    const bytes = await bytesBetween(filePath, 0, size)
    if (bytes.length === 0) return 0
    await store.put(key, bytes)
    state.lastFlushedOffset = size
    return bytes.length
  }

  if (size <= state.lastFlushedOffset) return 0

  const bytes = await bytesBetween(filePath, state.lastFlushedOffset, size)
  if (bytes.length === 0) return 0
  await store.append(key, bytes)
  state.lastFlushedOffset = size
  return bytes.length
}
