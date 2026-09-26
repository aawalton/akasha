"use client"

import type { ListingConfig } from "akasha/page/core/schema/modules/listing-config/listing-config.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { PagesFilteredContent } from "akasha/page/ui/component/modules/pages-by-relation-content/pages-by-relation-content.module.code.tsx"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type PageTypeSlug,
  toPageTypeSlug,
} from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useMemo } from "react"

const STORY = "story"

const CHAPTER_TYPES: Readonly<Record<string, string>> = {
  "story-read": "story-chapter-read",
  "story-played": "story-chapter-played",
  "story-written": "story-chapter-written",
}

const IN_ORDER: ListingConfig = {
  layout: "list",
  sorts: [{ field: "position", direction: "asc" }],
}

export function StoryChapters({ pageTypeSlug, id }: { pageTypeSlug: PageTypeSlug; id: string }) {
  const { page } = usePage({ pageTypeSlug, id })
  const slug = toPageDataJSON(page?.properties).slug
  const named = typeof slug === "string" && slug !== "" ? namedAs(pageTypeSlug, slug, null) : null
  const searchParams = useMemo(() => (named === null ? null : { [STORY]: named }), [named])
  const chapterType = CHAPTER_TYPES[pageTypeSlug]
  if (chapterType === undefined || searchParams === null) return null
  return (
    <PagesFilteredContent
      embedded
      pageTypeSlug={toPageTypeSlug(chapterType)}
      searchParams={searchParams}
      locked={IN_ORDER}
    />
  )
}
