import { relative } from "node:path"
import { insideOf } from "../settling/settling.module.code.ts"

export function shownIn(root: string, at: string): string {
  const said = relative(root, at)
  return said === "" || !insideOf(root, at) ? at : said
}
