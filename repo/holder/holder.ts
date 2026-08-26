import { readFileSync } from "node:fs"

export function holderProcessRuns(path: string): boolean {
  let held: number
  try {
    held = Number(readFileSync(path, "utf8").trim())
  } catch {
    return false
  }
  if (!Number.isFinite(held) || held <= 0) return false
  try {
    process.kill(held, 0)
    return true
  } catch (thrown) {
    return (thrown as NodeJS.ErrnoException).code !== "ESRCH"
  }
}
