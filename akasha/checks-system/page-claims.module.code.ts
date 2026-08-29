import type { Corpus, Filed } from "../write-system/corpus.module.code.ts"

const FILE = "file"

const PAGE_PROPERTY_TYPE = "page-property-type"

const KIND = "kind"

export type Held = {
  readonly slug: string
  readonly key: string
}

export type Claim = {
  readonly path: string
  readonly page: Filed
  readonly held: Held
  readonly stated: string
}

function keyOf(slug: string): string {
  const words = slug.split("-")
  const first = words[0] ?? ""
  const rest = words.slice(1).map((one) => one.charAt(0).toUpperCase() + one.slice(1))
  return first + rest.join("")
}

function dirOf(path: string): string {
  return path.slice(0, path.lastIndexOf("/"))
}

export function fileKindIn(corpus: Corpus): readonly Held[] {
  const found = new Map<string, Held>()
  for (const one of corpus.every()) {
    if (one.pageTypeSlug !== PAGE_PROPERTY_TYPE) continue
    const raw = corpus.valueOf(one.path)
    if (raw === null || raw[KIND] !== FILE) continue
    found.set(one.slug, { slug: one.slug, key: keyOf(one.slug) })
  }
  return [...found.values()]
}

export function claimsIn(corpus: Corpus): readonly Claim[] {
  const wanted = fileKindIn(corpus)
  if (wanted.length === 0) return []
  const found: Claim[] = []
  for (const page of corpus.every()) {
    const raw = corpus.valueOf(page.path)
    if (raw === null) continue
    for (const held of wanted) {
      const stated = raw[held.key]
      if (typeof stated !== "string" || stated === "") continue
      const path = `${dirOf(page.path)}/${page.slug}.${page.pageTypeSlug}.${held.slug}.${stated}`
      found.push({ path, page, held, stated })
    }
  }
  return found
}
