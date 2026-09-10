import { dirname } from "node:path"
import { partedIn } from "akasha/pages/file-name/page-file-name.module.code.ts"
import { filedById } from "akasha/pages/indexes/reaching/reaching.module.code.ts"
import type { Shadow } from "akasha/pages/shadow/shadow.module.code.ts"

export const COMMAND = "command"

export const NAMESPACE = "namespace"

export const PAGES_AT = "commands/pages"

const PAGE_TYPE = "page-type"

const PARTS = "parts"

const HYPHEN = "-"

export type Above = {
  readonly folder: string
  readonly slug: string | null
}

export type Judging = (id: string, path: string, slug: string) => string | null

function slugReason(slug: string, above: string): string {
  return (
    `the page names itself \`${slug}\`, and the page above it is \`${above}\` — a command or a ` +
    "namespace opens its slug with the slug of the page above it and a hyphen"
  )
}

function folderReason(at: string, wanted: string): string {
  return (
    `the page sits in \`${at}\`, and the parts above it name \`${wanted}\` — the command tree ` +
    "and the folder tree under `commands/` are one tree said twice"
  )
}

export function reasonIn(path: string, slug: string, above: Above): string | null {
  const opening = above.slug
  if (opening !== null && !slug.startsWith(`${opening}${HYPHEN}`)) return slugReason(slug, opening)
  const tail = opening === null ? slug : slug.slice(`${opening}${HYPHEN}`.length)
  const wanted = `${above.folder}/${tail}`
  const at = dirname(path)
  return at === wanted ? null : folderReason(at, wanted)
}

export function kindsFor(shadow: Shadow): ReadonlySet<string> {
  return new Set([...shadow.index.kindsUnder(COMMAND), ...shadow.index.kindsUnder(NAMESPACE)])
}

export function judgingBy(shadow: Shadow): Judging {
  const known = shadow.index.knownIn()
  return (id, path, slug) => {
    const namer = shadow.index.idsNaming(id, PARTS)[0]
    if (namer === undefined) return null
    const filed = filedById(known, namer)
    if (filed === null) return null
    const said = partedIn(filed.path)
    if (said === null) return null
    if (said.pageType === PAGE_TYPE && said.slug === COMMAND) {
      return reasonIn(path, slug, { folder: PAGES_AT, slug: null })
    }
    return reasonIn(path, slug, { folder: dirname(filed.path), slug: said.slug })
  }
}
