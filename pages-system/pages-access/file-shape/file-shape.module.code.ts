import type { Asked, Query } from "@akasha/pages-system-service/asking"
import { askingFor } from "@akasha/pages-system-service/calling"
import { textAt } from "@akasha/utils-narrow/text-at"
import {
  filePropertyDefinitions,
  PAGE_TYPE,
  shapeAsked,
} from "../file-property-defs/file-property-defs.module.code.ts"
import type { FileReadShape } from "../file-read/file-read.module.code.ts"

const held = new Map<string, Promise<FileReadShape | null>>()

const slugOfId = new Map<string, Promise<string | null>>()

async function readShape(pageTypeSlug: string): Promise<FileReadShape | null> {
  const shape = await shapeAsked(pageTypeSlug)
  if (shape === null) return null
  return {
    pageTypeId: shape.pageTypeId,
    definitions: await filePropertyDefinitions(pageTypeSlug),
    ...(shape.ownerSlug === null ? {} : { ownerSlug: shape.ownerSlug }),
  }
}

export async function fileShapeOf(pageTypeSlug: string): Promise<FileReadShape | null> {
  const asking = held.get(pageTypeSlug)
  if (asking !== undefined) return asking
  const started = readShape(pageTypeSlug)
  held.set(pageTypeSlug, started)
  started.catch(() => {
    if (held.get(pageTypeSlug) === started) held.delete(pageTypeSlug)
  })
  return started
}

export type PageTypeSlugDeps = {
  readonly ask: (query: Query) => Promise<Asked>
}

type SlugRead = {
  readonly slug: string | null
  readonly unread: boolean
}

async function readSlugOfId(
  pageTypeId: string,
  deps: PageTypeSlugDeps | undefined
): Promise<SlugRead> {
  const query: Query = {
    pageTypeSlug: PAGE_TYPE,
    keys: ["slug", "id"],
    where: { id: { is: pageTypeId } },
    limit: 1,
  }
  const asked = deps === undefined ? await askingFor(query) : await deps.ask(query)
  if ("refused" in asked) return { slug: null, unread: true }
  const filed = textAt(asked.rows[0] ?? {}, "slug")
  return { slug: filed, unread: false }
}

export async function pageTypeSlugById(
  pageTypeId: string,
  deps?: PageTypeSlugDeps
): Promise<string | null> {
  const asking = slugOfId.get(pageTypeId)
  if (asking !== undefined) return asking
  const forget = (): undefined => {
    if (slugOfId.get(pageTypeId) === started) slugOfId.delete(pageTypeId)
  }
  const started: Promise<string | null> = readSlugOfId(pageTypeId, deps).then((read) => {
    if (read.unread) forget()
    return read.slug
  })
  slugOfId.set(pageTypeId, started)
  started.catch(forget)
  return started
}
