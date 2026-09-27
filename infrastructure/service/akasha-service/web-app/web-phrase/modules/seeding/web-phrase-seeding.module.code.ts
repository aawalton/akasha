import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import {
  type DocumentData,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { webPhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/web-phrase.page-type.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"

export type SeededPhrase = { readonly slug: string; readonly title: string }

type Fills = Readonly<Record<string, string | number>>

export type Phrase = (slug: string, fills?: Fills) => string

export function phrasingOf(titles: ReadonlyMap<string, string>): Phrase {
  return (slug, fills = {}) =>
    Object.entries(fills).reduce(
      (out, [name, fill]) => out.split(`{${name}}`).join(String(fill)),
      titles.get(slug) ?? ""
    )
}

export async function phrasingRead(): Promise<Phrase> {
  const read = await phrasesRead()
  return phrasingOf(new Map(read.map((one) => [one.slug, one.title])))
}

export async function phrasesRead(): Promise<readonly SeededPhrase[]> {
  const rows = await collectPages({ pageTypeSlug: webPhrase.slug })
  const read: SeededPhrase[] = []
  for (const row of rows) {
    const slug = stringIn(row.slug)
    const title = stringIn(row.title)
    if (slug !== null && title !== null) read.push({ slug, title })
  }
  return read
}

export type SeededDocument = DocumentData & { readonly phrases: readonly SeededPhrase[] }

export function seededLoaderAt(webApp: string, urlPath: string): () => Promise<SeededDocument> {
  return async () => {
    const [document, phrases] = await Promise.all([siteDocumentAt(webApp, urlPath), phrasesRead()])
    return { document, phrases }
  }
}
