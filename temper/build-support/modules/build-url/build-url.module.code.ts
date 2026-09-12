import { buildPageHref } from "akasha/pages/url/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/pages/url/page-type-slug/page-type-slug.module.code.ts"
import type { BuildId } from "akasha/temper/formula-framework/modules/branded-id/branded-id.module.code.ts"

const CHARACTER_SLUG = toPageTypeSlug("character-build")
const COMPANION_SLUG = toPageTypeSlug("companion-build")

export function characterUrl(buildId: BuildId, name?: string): string {
  return buildPageHref({
    pageTypeSlug: CHARACTER_SLUG,
    slug: null,
    fallbackSlugSource: name,
    id: buildId,
  })
}

export function companionUrl(buildId: BuildId, name?: string): string {
  return buildPageHref({
    pageTypeSlug: COMPANION_SLUG,
    slug: null,
    fallbackSlugSource: name,
    id: buildId,
  })
}
