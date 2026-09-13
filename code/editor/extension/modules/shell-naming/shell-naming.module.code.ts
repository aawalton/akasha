import { readFileSync } from "node:fs"

export function shellNameOf(pid: number): string {
  try {
    return readFileSync(`/proc/${pid}/comm`, "utf8").trim()
  } catch {
    return ""
  }
}
