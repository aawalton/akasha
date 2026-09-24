import { asObjectRecord } from "akasha/code/type/narrowing/modules/as-object-record/as-object-record.module.code.ts"
import { stringIn } from "akasha/code/type/narrowing/modules/string-in/string-in.module.code.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"

export const SITE_DOCUMENT = "site-document"

export type DrawnSection = {
  readonly anchor: string
  readonly title: string
  readonly lead: string | null
  readonly text: string | null
}

export type DrawnDocument = {
  readonly title: string
  readonly description: string | null
  readonly lead: string | null
  readonly sections: readonly DrawnSection[]
}

function sectionIn(value: unknown): DrawnSection | null {
  const held = asObjectRecord(value)
  if (held === undefined) return null
  const anchor = stringIn(held.anchor)
  const title = stringIn(held.title)
  if (anchor === null || title === null) return null
  return { anchor, title, lead: stringIn(held.lead), text: stringIn(held.text) }
}

export function drawnFrom(page: Readonly<Record<string, unknown>>): DrawnDocument {
  const listed = Array.isArray(page.sections) ? page.sections : []
  return {
    title: stringIn(page.title) ?? stringIn(page.slug) ?? "",
    description: stringIn(page.description),
    lead: stringIn(page.lead),
    sections: listed.map(sectionIn).filter((one) => one !== null),
  }
}

export type Meta = readonly Readonly<Record<string, string>>[]

export function metaOf(document: DrawnDocument | undefined, site: string | null): Meta {
  if (document === undefined) return []
  const title = site === null ? document.title : `${document.title} — ${site}`
  const described = document.description
  return [{ title }, ...(described === null ? [] : [{ name: "description", content: described }])]
}

export type DocumentData = { readonly document: DrawnDocument }

export function metaFor(site: string | null): (args: { data: DocumentData | undefined }) => Meta {
  return ({ data }) => metaOf(data?.document, site)
}

export function loaderAt(webApp: string, urlPath: string): () => Promise<DocumentData> {
  return async () => ({ document: await siteDocumentAt(webApp, urlPath) })
}

export async function siteDocumentAt(webApp: string, urlPath: string): Promise<DrawnDocument> {
  const [found] = await collectPages({
    pageTypeSlug: SITE_DOCUMENT,
    where: [
      { key: "webApp", eq: webApp },
      { key: "urlPath", eq: urlPath },
    ],
    max: 1,
  })
  if (found === undefined) throw new Response(null, { status: 404 })
  return drawnFrom(found)
}
