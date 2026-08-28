import { textAt } from "../read/files.ts"
import type { Standing } from "./rows.ts"

export const standingAt = (root: string, at: string): Standing => {
  let text: string | null
  try {
    text = textAt(root, at)
  } catch (why) {
    return { kind: "unreadable", why: why instanceof Error ? why.message : String(why) }
  }
  return text === null ? { kind: "none" } : { kind: "standing", text }
}
