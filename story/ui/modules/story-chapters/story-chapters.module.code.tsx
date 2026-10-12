"use client"

import { EmbeddedViewContent } from "akasha/page/ui/component/modules/embedded-view-content/embedded-view-content.module.code.tsx"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"

const STORY = "story"

export function StoryChapters({ pageTypeSlug, id }: { pageTypeSlug: PageTypeSlug; id: string }) {
  return <EmbeddedViewContent pageTypeSlug={pageTypeSlug} id={id} relation={STORY} />
}
