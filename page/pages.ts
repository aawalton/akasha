import { execFileSync } from "node:child_process"
import { type PageName, pageNameOf } from "./page-name.ts"

const BUFFER_CEILING = 64 * 1024 * 1024

export type PageFile = PageName & {
  readonly key: string
}

export function trackedIn(root: string, key: string | null = null): readonly string[] {
  const listed = execFileSync(
    "git",
    key === null ? ["-C", root, "ls-files", "-z"] : ["-C", root, "ls-files", "-z", "--", key],
    { maxBuffer: BUFFER_CEILING }
  )
  return listed
    .toString("utf8")
    .split("\0")
    .filter((one) => one !== "")
}

export function pagesIn(root: string): readonly PageFile[] {
  const found: PageFile[] = []
  for (const key of trackedIn(root)) {
    const named = pageNameOf(key)
    if (named === null) continue
    found.push({ key, stem: named.stem, type: named.type })
  }
  return found
}
