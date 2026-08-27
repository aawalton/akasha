import type { PageDataJSON } from "@shared/pages-core/types"

export interface CoverClickContext {
  readonly pageId: string
  readonly pageTypeSlug: string
  readonly data: PageDataJSON
}

export type CoverClickHandler = (ctx: CoverClickContext) => void

const registry = new Map<string, CoverClickHandler>()

export function registerCoverClickHandler(
  pageTypeSlug: string,
  handler: CoverClickHandler
): undefined {
  registry.set(pageTypeSlug, handler)
}

export function getCoverClickHandler(pageTypeSlug: string): CoverClickHandler | undefined {
  return registry.get(pageTypeSlug)
}

export function unregisterCoverClickHandler(pageTypeSlug: string): undefined {
  registry.delete(pageTypeSlug)
}
