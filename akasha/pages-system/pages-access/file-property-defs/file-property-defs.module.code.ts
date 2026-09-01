import type { PropertyDefinition } from "../page-type-config/page-type-config.module.code.ts"

export const PAGE_TYPE = "page-type"

export type Declaration = {
  readonly key: string
  readonly type: string
  readonly title: string
  readonly pageId: string
  readonly on: string
  readonly values: unknown
  readonly targetSlug: string | null
  readonly slugProperty: string | null
  readonly mayBeGone: boolean
}

export type PageTypeShape = {
  readonly pageType: string
  readonly pageTypeId: string
  readonly ownerSlug: string | null
  readonly declarations: readonly Declaration[]
}

const NO_SHAPE =
  "`@akasha/pages-system-service` answers a question with rows and answers no question about what a page type declares. There is no shape to read, so which properties a page type carries, what each one is typed as, and which of them name other pages are all unknown here. An empty list would read as a page type declaring nothing."

const BELONGS =
  "What a page type declares is read from the index by `@akasha/pages-system/page-type-properties`, which is where `@akasha/pages-system-service` reads it."

export async function shapeAsked(pageTypeSlug: string): Promise<PageTypeShape | null> {
  throw new Error(`shapeAsked(${pageTypeSlug}): ${NO_SHAPE} ${BELONGS}`)
}

export async function filePropertyDefinitions(
  pageTypeSlug: string
): Promise<readonly PropertyDefinition[]> {
  throw new Error(`filePropertyDefinitions(${pageTypeSlug}): ${NO_SHAPE} ${BELONGS}`)
}

export async function fileRelationDeclarations(
  pageTypeSlug: string
): Promise<readonly Declaration[] | null> {
  throw new Error(`fileRelationDeclarations(${pageTypeSlug}): ${NO_SHAPE} ${BELONGS}`)
}
