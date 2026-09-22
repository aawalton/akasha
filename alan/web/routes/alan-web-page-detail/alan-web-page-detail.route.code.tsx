import { loader as pageDetailLoader } from "akasha/alan/web/.server/page-detail-loading/page-detail-loading.module.code.ts"
import { PageDetailErrorBoundary } from "akasha/alan/web/modules/page-detail-error-boundary/page-detail-error-boundary.module.code.tsx"
import { ReaderNarrationDetail } from "akasha/alan/web/modules/reader-narration-detail/reader-narration-detail.module.code.tsx"
import { ViewPageContent } from "akasha/page/ui/component/modules/view-page-content/view-page-content.module.code.tsx"
import {
  DISPLAY_PARAM,
  parseDisplayMode,
} from "akasha/page/url/modules/page-display-mode/page-display-mode.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import {
  type MetaDescriptor,
  type ShouldRevalidateFunctionArgs,
  useSearchParams,
} from "react-router"

type PageDetailLoaderData = Awaited<ReturnType<typeof pageDetailLoader>>["data"]

function buildPageDetailMeta(
  loaderData: { title: string | null; faviconIdSuffix: string | null } | undefined
): MetaDescriptor[] {
  if (loaderData == null) return [{ title: "Alan Walton" }]
  const descriptors: MetaDescriptor[] = [
    { title: loaderData.title != null && loaderData.title !== "" ? loaderData.title : "Untitled" },
  ]
  if (loaderData.faviconIdSuffix != null) {
    descriptors.push({
      tagName: "link",
      rel: "icon",
      href: `/api/nav-icon/${loaderData.faviconIdSuffix}`,
      type: "image/svg+xml",
      sizes: "any",
    })
  }
  return descriptors
}

export function meta({ data: loaderData }: { data: PageDetailLoaderData | undefined }) {
  return buildPageDetailMeta(loaderData)
}

const MEDIA_ONLY_SEARCH_PARAMS: ReadonlySet<string> = new Set(["speed", "variant"])

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

  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }

  const brandedSlug = toPageTypeSlug(loaderData.pageTypeSlug)
  return (
    <ReaderNarrationDetail
      drawnPlainly={displayMode === "properties"}
      pageTypeSlug={brandedSlug}
      id={loaderData.id}
      title={loaderData.title ?? ""}
      readerPrev={loaderData.readerPrev ?? undefined}
      readerNext={loaderData.readerNext ?? undefined}
      storyHref={loaderData.storyHref ?? undefined}
      nextUnreadHref={loaderData.nextUnreadHref ?? undefined}
    />
  )
}
