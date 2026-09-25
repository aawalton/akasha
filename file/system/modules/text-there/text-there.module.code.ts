import { readFileSync } from "node:fs"

export function textThere(at: string): string | null {
  try {
    return readFileSync(at, "utf8")
  } catch {
    return null
  }
}
