import { open } from "node:fs/promises"

const READ_CHUNK = 64 * 1024

export async function lastLinesOf(path: string, many: number): Promise<readonly string[]> {
  const handle = await open(path, "r")
  try {
    const stat = await handle.stat()
    let at = stat.size
    let held = ""
    let lines = 0
    while (at > 0 && lines <= many) {
      const chunk = Math.min(READ_CHUNK, at)
      at -= chunk
      const buffer = Buffer.alloc(chunk)
      await handle.read(buffer, 0, chunk, at)
      held = buffer.toString("utf8") + held
      lines = held.match(/\n/g)?.length ?? 0
    }
    const every = held.split("\n")
    const last = every.at(-1) === "" ? every.slice(0, -1) : every
    return last.length > many ? last.slice(last.length - many) : last
  } finally {
    await handle.close()
  }
}
