import { readFile } from "node:fs/promises"

export async function captureTextAt(from: string): Promise<string | null> {
  try {
    return await readFile(from, "utf8")
  } catch {
    return null
  }
}
