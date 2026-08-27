import { askComposed, type ComposedQuery } from "@shared/pages-query/ask"
import { type Asked } from "../../pages-query/src/index"
import {
  filePropertyDefinitions,
  forgetAskedShapes,
  PAGE_TYPE,
  shapeAsked,
  textOf,
} from "./file-property-defs"
import type { FileReadShape } from "./file-read"

const held = new Map<string, Promise<FileReadShape | null>>()

const slugOfId = new Map<string, Promise<string | null>>()

export function forgetFileShapes(): undefined {
  held.clear()
  slugOfId.clear()
  forgetAskedShapes()
}

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
  readonly ask: (query: ComposedQuery) => Promise<Asked>
}

type SlugRead = {
  readonly slug: string | null
  readonly unread: boolean
}

async function readSlugOfId(
  pageTypeId: string,
  deps: PageTypeSlugDeps | undefined
): Promise<SlugRead> {
  const query: ComposedQuery = {
    "page-type": PAGE_TYPE,
    keys: ["slug", "id"],
    where: { id: { is: pageTypeId } },
    limit: 1,
  }
  const asked = deps === undefined ? await askComposed(query) : await deps.ask(query)
  if (asked.ok) {
    const filed = textOf(asked.answer.rows[0]?.values ?? {}, "slug")
    if (filed !== null) return { slug: filed, unread: false }
  }
  return { slug: null, unread: !asked.ok }
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
