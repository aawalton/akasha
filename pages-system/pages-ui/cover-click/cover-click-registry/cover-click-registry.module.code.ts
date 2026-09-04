import type { PageDataJSON } from "@akasha/pages-core/types"

export interface CoverClickContext {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly data: PageDataJSON
}

export type CoverClickHandler = (ctx: CoverClickContext) => void

const handlersByPageTypeSlug = new Map<string, CoverClickHandler>()

export function registerCoverClickHandler(
  pageTypeSlug: string,
  handler: CoverClickHandler
): undefined {
  handlersByPageTypeSlug.set(pageTypeSlug, handler)
}

export function getCoverClickHandler(pageTypeSlug: string): CoverClickHandler | undefined {
  return handlersByPageTypeSlug.get(pageTypeSlug)
}

export function unregisterCoverClickHandler(pageTypeSlug: string): undefined {
  handlersByPageTypeSlug.delete(pageTypeSlug)
}
