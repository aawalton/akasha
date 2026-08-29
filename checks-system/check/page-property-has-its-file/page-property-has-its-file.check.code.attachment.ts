import { dirname, relative, resolve } from "node:path"
import type { Corpus, Refusal } from "../../../akasha/write-system/corpus.module.code.ts"
import { corpusIn } from "../../../akasha/write-system/corpus.module.code.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

const AKASHA = "akasha"

const FILE = "file"

const PAGE_PROPERTY_TYPE = "page-property-type"

const KIND = "kind"

type Held = {
  readonly slug: string
  readonly key: string
}

function keyOf(slug: string): string {
  const words = slug.split("-")
  const first = words[0] ?? ""
  const rest = words.slice(1).map((one) => one.charAt(0).toUpperCase() + one.slice(1))
  return first + rest.join("")
}

function fileKindIn(corpus: Corpus): readonly Held[] {
  const found = new Map<string, Held>()
  for (const one of corpus.every()) {
    if (one.pageTypeSlug !== PAGE_PROPERTY_TYPE) continue
    const raw = corpus.valueOf(one.path)
    if (raw === null || raw[KIND] !== FILE) continue
    found.set(one.slug, { slug: one.slug, key: keyOf(one.slug) })
  }
  return [...found.values()]
}

function loaded(from: string): Corpus | Refusal {
  try {
    return corpusIn(from)
  } catch (thrown) {
    return { refused: thrown instanceof Error ? thrown.message : String(thrown) }
  }
}

function reasonFor(said: string, named: string, body: Buffer | null): string | null {
  if (body === null) {
    return (
      `${said}, and nothing stands at \`${named}\` — a page property of kind file is held in a ` +
      "file beside its page, named for its page and for the property it holds"
    )
  }
  if (body.byteLength > 0) return null
  return (
    `${said}, and \`${named}\` is empty — a property's file is where that property's value is ` +
    "held, so a page stating one and holding nothing states nothing"
  )
}

export const pagePropertyHasItsFile = {
  slug: "page-property-has-its-file",
  needs: "tree",
  run: ({ root, tree }) => {
    const under = resolve(root, AKASHA)
    const inside = tree.paths().filter((one) => one.startsWith(`${under}/`))
    if (inside.length === 0) return []
    const from = resolve(tree.dir(), AKASHA)
    const corpus = loaded(from)
    if ("refused" in corpus) return [{ path: under, reason: corpus.refused }]
    const wanted = fileKindIn(corpus)
    if (wanted.length === 0) return []
    const stood = new Set(tree.paths())
    const failures: CheckFailure[] = []
    for (const page of corpus.every()) {
      const raw = corpus.valueOf(page.path)
      if (raw === null) continue
      const at = resolve(under, relative(from, page.path))
      if (!stood.has(at)) continue
      for (const held of wanted) {
        const stated = raw[held.key]
        if (typeof stated !== "string" || stated === "") continue
        const beside = `${dirname(at)}/${page.slug}.${page.pageTypeSlug}.${held.slug}.${stated}`
        const said = `\`${page.slug}\` states \`${held.slug}\` as \`${stated}\``
        const body = stood.has(beside) ? tree.at(beside) : null
        const reason = reasonFor(said, relative(root, beside), body)
        if (reason !== null) failures.push({ path: at, reason })
      }
    }
    return failures
  },
} satisfies Check

export default pagePropertyHasItsFile
