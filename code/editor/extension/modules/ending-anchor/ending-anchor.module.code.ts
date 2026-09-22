import { type FileHandle, open } from "node:fs/promises"

const ANCHOR_BYTES = 64

export async function anchorEnding(filePath: string, offset: number): Promise<string | null> {
  if (offset <= 0) {
    return null
  }
  const from = Math.max(0, offset - ANCHOR_BYTES)
  const wanted = offset - from
  const buffer = Buffer.allocUnsafe(wanted)
  let handle: FileHandle
  try {
    handle = await open(filePath, "r")
  } catch {
    return null
  }
  try {
    const { bytesRead } = await handle.read(buffer, 0, wanted, from)
    if (bytesRead !== wanted) {
      return null
    }
  } catch {
    return null
  } finally {
    await handle.close()
  }
  return buffer.toString("base64")
}
