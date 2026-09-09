import { textOf } from "@akasha/code/body-text"
import { nameFaultIn } from "@akasha/pages/page-export-name"
import type { FileEdit } from "../../../command-system/landing/landing.module.code.ts"

const SLUG_AT = /^ {2}slug: "([^"]*)",$/m

const PAGE_TYPE_AT = /^ {2}pageTypeSlug: "([^"]*)",$/m

const PAGE_FILE = ".ts"

const REMEDY =
  "Put the page type slug in front of it, as `day-2026-08-20` and" +
  " `great-course-7-days-of-drawing` already do, and name the file for the slug you land"

export function slugComposedIn(path: string, body: Uint8Array): string | null {
  const text = textOf(body)
  if (text === null) return null
  const found = SLUG_AT.exec(text)
  if (found === null || !PAGE_TYPE_AT.test(text)) return null
  const slug = found[1] as string
  const named = path.slice(path.lastIndexOf("/") + 1)
  return named.startsWith(`${slug}.`) ? slug : null
}

export function unexportableIn(changes: readonly FileEdit[]): readonly string[] {
  const said: string[] = []
  for (const one of changes) {
    if (one.body === null || !one.path.endsWith(PAGE_FILE)) continue
    const slug = slugComposedIn(one.path, one.body)
    if (slug === null) continue
    const fault = nameFaultIn(slug)
    if (fault !== null) said.push(`${one.path} — ${fault}. ${REMEDY}`)
  }
  return said
}
