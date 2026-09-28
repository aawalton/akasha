import { loader as pageDetailLoader } from "akasha/alan/web/.server/page-detail-loading/page-detail-loading.module.code.ts"
import { PageDetailErrorBoundary } from "akasha/alan/web/modules/page-detail-error-boundary/page-detail-error-boundary.module.code.tsx"
import { PageDetailWithReadMark } from "akasha/alan/web/modules/page-detail-with-read-mark/page-detail-with-read-mark.module.code.tsx"
import { showTabIcon } from "akasha/alan/web/modules/tab-icon/tab-icon.module.code.tsx"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { siteNamedIn } from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import {
  type Followed,
  useLoaderFollowing,
} from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { usePage } from "akasha/page/ui/supabase/modules/use-page/use-page.module.code.ts"
import { seedPagesStore } from "akasha/page/ui-store/modules/singleton/singleton.module.code.ts"
import {
  DISPLAY_PARAM,
  parseDisplayMode,
} from "akasha/page/url/modules/page-display-mode/page-display-mode.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { useEffect } from "react"
import {
  type MetaDescriptor,
  type ShouldRevalidateFunctionArgs,
  useSearchParams,
} from "react-router"

type PageDetailLoaderData = Awaited<ReturnType<typeof pageDetailLoader>>["data"]

function buildPageDetailMeta(
  loaderData: { title: string | null; covers?: readonly string[] } | undefined,
  site: string | null
): MetaDescriptor[] {
  const title = loaderData?.title ?? site
  const descriptors: MetaDescriptor[] = title === null ? [] : [{ title }]
  if (loaderData == null) return descriptors
  for (const href of loaderData.covers ?? []) {
    descriptors.push({ tagName: "link", rel: "preload", as: "image", href })
  }
  return descriptors
}

export function meta({
  data: loaderData,
  matches,
}: {
  data: PageDetailLoaderData | undefined
  matches: readonly ({ readonly data: unknown } | undefined)[]
}) {
  return buildPageDetailMeta(loaderData, siteNamedIn(matches))
}

const MEDIA_ONLY_SEARCH_PARAMS: ReadonlySet<string> = new Set(["speed", "variant"])

const READING_STORY = "reading-story"

const NAV_READ: readonly string[] = ["nav"]

const NOTHING_READ: readonly Followed[] = []

function followedBy(read: {
  readonly pageTypeSlug: string
  readonly id: string
  readonly followsType: boolean
}): readonly Followed[] {
  if (!read.followsType) return NOTHING_READ
  return [{ pageTypeSlug: read.pageTypeSlug, id: read.id }, read.pageTypeSlug, READING_STORY]
}

function nameIn(row: Readonly<Record<string, unknown>>): string | null {
  const title = textIn(row.title)
  return title ?? textIn(row.slug)
}

function useLiveHead(pageTypeSlug: string, id: string | undefined, typeIcon: string | null) {
  const { page } = usePage({ pageTypeSlug: toPageTypeSlug(pageTypeSlug), id })
  const row = page?.properties
  const title = row === undefined ? null : nameIn(row)
  const icon = row === undefined ? undefined : (textIn(row.icon) ?? typeIcon)
  useEffect(() => {
    if (title !== null) document.title = title
  }, [title])
  useEffect(() => {
    if (icon === undefined) return undefined
    showTabIcon({ icon })
    return () => showTabIcon(null)
  }, [icon])
  return undefined
}

const seeded = new WeakSet<object>()

function seededOnce(seeds: Readonly<Record<string, unknown>>): undefined {
  if (typeof window === "undefined" || seeded.has(seeds)) return
  seeded.add(seeds)
  if (Object.keys(seeds).length > 0) seedPagesStore(seeds)
  return undefined
}

function changedSearchParamKeys(current: URL, next: URL): Set<string> {
  const keys = new Set<string>()
  const all = new Set([...current.searchParams.keys(), ...next.searchParams.keys()])
  for (const key of all) {
    if (current.searchParams.get(key) !== next.searchParams.get(key)) keys.add(key)
  }
  return keys
}

function shouldRevalidatePageDetail(args: {
  currentUrl: URL
  nextUrl: URL
  defaultShouldRevalidate: boolean
}): boolean {
  if (args.currentUrl.pathname !== args.nextUrl.pathname) return args.defaultShouldRevalidate
  const changed = changedSearchParamKeys(args.currentUrl, args.nextUrl)
  if (changed.size === 0) return args.defaultShouldRevalidate
  for (const key of changed) {
    if (!MEDIA_ONLY_SEARCH_PARAMS.has(key)) return args.defaultShouldRevalidate
  }
  return false
}

export function shouldRevalidate(args: ShouldRevalidateFunctionArgs): boolean {
  return shouldRevalidatePageDetail(args)
}

export const loader = pageDetailLoader
export const ErrorBoundary = PageDetailErrorBoundary

export default function PageDetailRoute({ loaderData }: { loaderData: PageDetailLoaderData }) {
  const [searchParams] = useSearchParams()
  const displayMode = parseDisplayMode(searchParams.get(DISPLAY_PARAM))
  useLoaderFollowing(loaderData.kind === "nav" ? NAV_READ : followedBy(loaderData))
  useLiveHead(
    loaderData.pageTypeSlug,
    loaderData.kind === "nav" ? undefined : loaderData.id,
    loaderData.kind === "nav" ? null : loaderData.typeIcon
  )

  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }

  seededOnce(loaderData.seeds)
  const brandedSlug = toPageTypeSlug(loaderData.pageTypeSlug)
  return (
    <PageDetailWithReadMark
      drawnPlainly={displayMode === "properties"}
      pageTypeSlug={brandedSlug}
      id={loaderData.id}
      readerPrev={loaderData.readerPrev ?? undefined}
      readerNext={loaderData.readerNext ?? undefined}
      storyHref={loaderData.storyHref ?? undefined}
      nextUnreadHref={loaderData.nextUnreadHref ?? undefined}
    />
  )
}
