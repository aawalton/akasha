"use client"

import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { toPageDataJSON } from "akasha/page/ui/component/modules/page-data-json/page-data-json.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import {
  type UsePagesSupabaseOptions,
  usePages,
} from "akasha/page/ui/supabase/modules/use-pages/use-pages.module.code.ts"
import type { PageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { AlertControls } from "akasha/story/ui/modules/alert-controls/alert-controls.module.code.tsx"
import { useChapterAlerts } from "akasha/story/world/stories/read/modules/chapter-alerts/chapter-alerts.module.code.ts"
import { ChapterChannel } from "akasha/story/world/stories/read/modules/chapter-channel/chapter-channel.module.code.tsx"
import {
  CHAPTER_PAGE_TYPE_SLUG,
  CHAPTER_POSITION_KEY,
  CHAPTER_STORY_KEY,
  chapterChannelEnvelope,
  chapterHrefsOf,
  chapterTurnsOf,
  newestChapterAtMs,
} from "akasha/story/world/stories/read/modules/chapter-turns/chapter-turns.module.code.ts"
import { useMemo } from "react"

const SHELL_BLOCK = "mx-auto flex w-full max-w-[710px] flex-col gap-4 px-6 pt-6"

export function ReaderShell({ pageTypeSlug, id }: { pageTypeSlug: PageTypeSlug; id: string }) {
  const { page } = usePage({ pageTypeSlug, id })
  const data = toPageDataJSON(page?.properties)
  const title = data.title == null ? "" : String(data.title)
  const slug = typeof data.slug === "string" ? data.slug : ""
  const following = data.following === true

  const options = useMemo<UsePagesSupabaseOptions>(
    () => ({
      pageTypeSlug: CHAPTER_PAGE_TYPE_SLUG,
      where: [{ key: CHAPTER_STORY_KEY, eq: namedAs(pageTypeSlug, slug, null) }],
      order: [{ by: CHAPTER_POSITION_KEY, dir: "asc" }],
    }),
    [pageTypeSlug, slug]
  )
  const { rows, isLoading } = usePages(options)

  const turns = useMemo(() => chapterTurnsOf(rows), [rows])
  const hrefById = useMemo(() => chapterHrefsOf(rows), [rows])
  const newestAtMs = useMemo(() => newestChapterAtMs(rows), [rows])
  const envelope = useMemo(() => chapterChannelEnvelope(title, turns), [title, turns])
  const alerts = useChapterAlerts({ envelope, storyTitle: title, storyId: id, following })

  if (isLoading || turns.length === 0) return null

  return (
    <div className={SHELL_BLOCK}>
      <AlertControls
        needsPermissionPrompt={alerts.needsPermissionPrompt}
        onEnable={alerts.enableAlerts}
      />
      <ChapterChannel
        turns={envelope.chapterProse ?? turns}
        hrefById={hrefById}
        newestAtMs={newestAtMs}
      />
    </div>
  )
}
