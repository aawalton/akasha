import type { FileChange } from "@akasha/changes/change-answer/types"
import { nameFaultIn } from "@akasha/pages/page-export-name"

const SLUG_AT = /^ {2}slug: "([^"]*)",$/m

const PAGE_TYPE_AT = /^ {2}(type|pageTypeSlug): "([^"]*)",$/m

const PAGE_FILE = ".ts"

const REMEDY =
  "Put the page type slug in front of it, as `day-2026-08-20` and" +
  " `great-course-7-days-of-drawing` already do, and name the file for the slug you land"

export function slugComposedIn(path: string, text: string): string | null {
  const found = SLUG_AT.exec(text)
  if (found === null || !PAGE_TYPE_AT.test(text)) return null
  const slug = found[1] as string
  const named = path.slice(path.lastIndexOf("/") + 1)
  return named.startsWith(`${slug}.`) ? slug : null
}

export function unexportableIn(changes: readonly FileChange[]): readonly string[] {
  const said: string[] = []
  for (const one of changes) {
    if (one.kind === "move" || one.kind === "remove") continue
    if (!one.path.endsWith(PAGE_FILE)) continue
    const slug = slugComposedIn(one.path, one.kind === "add" ? one.content : one.contentTo)
    if (slug === null) continue
    const fault = nameFaultIn(slug)
    if (fault !== null) said.push(`${one.path} — ${fault}. ${REMEDY}`)
  }
  return said
}
