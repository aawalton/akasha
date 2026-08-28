import { SurfaceProvider } from "@shared/design-system"
import { PageDetailContent } from "@shared/pages-ui/components/page-detail-content"
import { ViewPageContent } from "@shared/pages-ui/components/view-page-content"
import { ViewPageFrame } from "@shared/pages-ui/components/view-page-frame"
import { DISPLAY_PARAM, PageTypeSlug, parseDisplayMode } from "@shared/pages-url"
import { lazy, Suspense } from "react"
import { type ShouldRevalidateFunctionArgs, useSearchParams } from "react-router"
import { AwenGameReader } from "~/awen/game-reader"
import { ReaderNarrationDetail } from "~/components/reader-narration-detail"
import type { Route } from "./+types/page-detail"

const IdleGame = lazy(() => import("~/idle/idle-game"))

const ChessBoard = lazy(() => import("~/chess/chess-board"))

const QuestionDetail = lazy(() => import("../questions/question-detail"))

export function buildPageDetailMeta(
  loaderData: { title: string | null; faviconIdSuffix: string | null } | undefined
): ReturnType<Route.MetaFunction> {
  if (loaderData == null) return [{ title: "Alan Walton" }]
  const descriptors: ReturnType<Route.MetaFunction> = [
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

export function meta({ data: loaderData }: Route.MetaArgs) {
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

export function shouldRevalidatePageDetail(args: {
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



export default function PageDetailRoute({ loaderData }: Route.ComponentProps) {
  const [searchParams] = useSearchParams()
  const displayMode = parseDisplayMode(searchParams.get(DISPLAY_PARAM))

  if (loaderData.kind === "nav") {
    return <ViewPageContent navItemIdParam={loaderData.pageHrefParam} />
  }

  if (
    displayMode === "properties" &&
    (loaderData.kind === "idle" ||
      loaderData.kind === "awen-game" ||
      loaderData.kind === "chess-game" ||
      loaderData.kind === "chess-review" ||
      loaderData.kind === "question")
  ) {
    return (
      <PageDetailContent pageTypeSlug={PageTypeSlug(loaderData.pageTypeSlug)} id={loaderData.id} />
    )
  }
  if (loaderData.kind === "idle") {
    return (
      <Suspense fallback={null}>
        <IdleGame title={loaderData.title} frameConfig={loaderData.frame} />
      </Suspense>
    )
  }
  if (loaderData.kind === "awen-game") {
    return (
      <SurfaceProvider level={0} className="min-h-screen">
        <AwenGameReader {...loaderData.awen} />
      </SurfaceProvider>
    )
  }
  if (loaderData.kind === "chess-game") {
    return (
      <ViewPageFrame>
        <Suspense fallback={null}>
          <ChessBoard
            initialFen={loaderData.initialFen ?? undefined}
            initialPgn={loaderData.initialPgn ?? undefined}
          />
        </Suspense>
      </ViewPageFrame>
    )
  }
  if (loaderData.kind === "chess-review") {
    return (
      <ViewPageFrame>
        <Suspense fallback={null}>
          <ChessBoard initialPgn={loaderData.pgn} />
        </Suspense>
      </ViewPageFrame>
    )
  }
  if (loaderData.kind === "question") {
    return (
      <ViewPageFrame>
        <Suspense fallback={null}>
          <QuestionDetail question={loaderData.question} persona={loaderData.persona} />
        </Suspense>
      </ViewPageFrame>
    )
  }
  const brandedSlug = PageTypeSlug(loaderData.pageTypeSlug)
  return (
    <ReaderNarrationDetail
      pageTypeSlug={brandedSlug}
      id={loaderData.id}
      title={loaderData.title ?? ""}
      audioVariants={loaderData.audioVariants ?? undefined}
      audioNextHref={loaderData.audioNextHref ?? undefined}
      audioDefaultVariant={loaderData.audioDefaultVariant ?? undefined}
      sentenceMarks={loaderData.audioSentenceMarks ?? undefined}
      readerPrev={loaderData.readerPrev ?? undefined}
      readerNext={loaderData.readerNext ?? undefined}
      storyHref={loaderData.storyHref ?? undefined}
      nextUnreadHref={loaderData.nextUnreadHref ?? undefined}
    />
  )
}
