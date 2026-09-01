import type { CoverClickContext } from "@akasha/pages-ui/cover-click/cover-click-registry"

export type CoverMaskResolver = (ctx: CoverClickContext) => string | null

const registry = new Map<string, CoverMaskResolver>()

export function registerCoverMask(pageTypeSlug: string, resolver: CoverMaskResolver): undefined {
  registry.set(pageTypeSlug, resolver)
}

export function getCoverMask(pageTypeSlug: string): CoverMaskResolver | undefined {
  return registry.get(pageTypeSlug)
}

export function unregisterCoverMask(pageTypeSlug: string): undefined {
  registry.delete(pageTypeSlug)
}
