import { answerPageTypes } from "akasha/alan/web/.server/alan-answer-page-types/alan-answer-page-types.module.code.ts"
import { answerPages } from "akasha/alan/web/.server/alan-answer-pages/alan-answer-pages.module.code.ts"
import { resolveReaderNeighbors } from "akasha/alan/web/modules/alan-reader-neighbors/alan-reader-neighbors.module.code.ts"
import { resolveNextUnreadHref } from "akasha/alan/web/modules/next-unread/next-unread.module.code.ts"
import { isRecord } from "akasha/code/type/narrowing/modules/is-record/is-record.module.code.ts"
import { stringsIn } from "akasha/code/type/narrowing/modules/strings-in/strings-in.module.code.ts"
import {
  getPage,
  getPageByIdSuffix,
  getPageByIdSuffixAcrossTypes,
  getPages,
} from "akasha/page/access/modules/get/get.module.code.ts"
import { getDescendantPageTypeSlugs } from "akasha/page/access/modules/page-type/page-type.module.code.ts"
import { getSequenceConfig } from "akasha/page/access/modules/page-type-config/page-type-config.module.code.ts"
import { flattenRow } from "akasha/page/access/modules/routing-core/routing-core.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { addressIn, namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import type { ReaderNeighborLink } from "akasha/page/ui/component/modules/reader-chrome/reader-chrome.module.code.tsx"
import { filePagesPath } from "akasha/page/ui-store/collection/modules/fetch-attach/fetch-attach.module.code.ts"
import { FILE_BACKED_ROSTER_PATH } from "akasha/page/ui-store/collection/modules/file-backing/file-backing.module.code.ts"
import {
  buildPageHref,
  parsePageHrefParam,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import {
  CHARACTER_TYPES,
  characterCoversOf,
  charactersIn,
  slugsOf,
} from "akasha/story/ui/modules/character-cover-panel/character-cover-panel.module.code.tsx"
import { characterCover } from "akasha/story/ui/played-panel/pages/character-cover/character-cover.played-panel.ts"
import { playedPanel } from "akasha/story/ui/played-panel/played-panel.page-type.ts"
import { characters } from "akasha/story/world/characters/properties/characters.multi-relation-property.ts"
import {
  PLAYED_TURN_PAGE_TYPE_SLUG,
  playedListsOf,
  playedReady,
  playedTail,
} from "akasha/story/world/stories/played/modules/played-rows/played-rows.module.code.ts"
import { storyPlayed } from "akasha/story/world/stories/played/story-played.page-type.ts"
import { data, type LoaderFunctionArgs } from "react-router"

const NAV_SLUG = "nav"
const READING_STORY_SLUG = "reading-story"
const PAGE_TYPE_SLUG = "page-type"

export type Seeds = Readonly<Record<string, unknown>>

const NO_SEEDS: Seeds = {}

type Asked = { readonly path: string; readonly pageTypeSlug: string | null }

type Answered = readonly [string, unknown]

function askedFor(pageTypeSlug: string, id: string, slug: string | null): readonly Asked[] {
  if (pageTypeSlug !== storyPlayed.slug || slug === null) return []
  const lists = playedListsOf(namedAs(pageTypeSlug, slug, null))
  return [
    { path: FILE_BACKED_ROSTER_PATH, pageTypeSlug: null },
    { path: filePagesPath(pageTypeSlug, [], { by: "id", values: [id] }), pageTypeSlug },
    {
      path: filePagesPath(PAGE_TYPE_SLUG, [], { by: "slug", values: [pageTypeSlug] }),
      pageTypeSlug: PAGE_TYPE_SLUG,
    },
    ...[lists.chapters, lists.turns, lists.character].map((list) => ({
      path: filePagesPath(list.pageTypeSlug, [], list.named),
      pageTypeSlug: list.pageTypeSlug,
    })),
  ]
}

async function answerOf(request: Request, asked: Asked): Promise<Answered | null> {
  const one = new Request(new URL(asked.path, request.url).href, {
    headers: new Headers(request.headers),
  })
  try {
    const answered =
      asked.pageTypeSlug === null
        ? await answerPageTypes(one)
        : await answerPages(one, asked.pageTypeSlug)
    if (!answered.ok) return null
    return [asked.path, await answered.json()]
  } catch (err) {
    console.warn(`page-detail loader: ${asked.path} went unanswered, so the browser reads it`, err)
    return null
  }
}

async function seedsFor(
  request: Request,
  pageTypeSlug: string,
  id: string,
  slug: string | null
): Promise<Seeds> {
  const asked = askedFor(pageTypeSlug, id, slug)
  if (asked.length === 0) return NO_SEEDS
  const answered = await Promise.all(asked.map((one) => answerOf(request, one)))
  return Object.fromEntries(answered.filter((one): one is Answered => one !== null))
}

const CHARACTER_COVER_PANEL = namedAs(playedPanel.slug, characterCover.slug, null)

type Covered = { readonly seeds: Seeds; readonly covers: readonly string[] }

function rowsIn(body: unknown): readonly Page[] {
  if (!isRecord(body) || !Array.isArray(body.rows)) return []
  return body.rows.filter(isRecord).map((row) => flattenRow(row))
}

async function namedRows(
  request: Request,
  pageTypeSlug: string,
  by: "id" | "slug",
  values: readonly string[]
): Promise<{ readonly answer: Answered; readonly rows: readonly Page[] } | null> {
  const path = filePagesPath(pageTypeSlug, [], { by, values: [...values] })
  const answer = await answerOf(request, { path, pageTypeSlug })
  return answer === null ? null : { answer, rows: rowsIn(answer[1]) }
}

async function coveredBy(
  request: Request,
  seeds: Seeds,
  pageTypeSlug: string,
  id: string,
  slug: string | null
): Promise<Covered> {
  const unchanged: Covered = { seeds, covers: [] }
  if (pageTypeSlug !== storyPlayed.slug || slug === null) return unchanged
  const story = rowsIn(seeds[filePagesPath(pageTypeSlug, [], { by: "id", values: [id] })])[0]
  if (!stringsIn(story?.panels).includes(CHARACTER_COVER_PANEL)) return unchanged
  const lists = playedListsOf(namedAs(pageTypeSlug, slug, null))
  const turnsAt = filePagesPath(lists.turns.pageTypeSlug, [], lists.turns.named)
  const latest = playedTail(playedReady(rowsIn(seeds[turnsAt]))).drawn.at(-1)
  if (latest === undefined) return unchanged
  const turn = await namedRows(request, PLAYED_TURN_PAGE_TYPE_SLUG, "id", [latest.id])
  if (turn === null) return unchanged
  const drawn = charactersIn(turn.rows[0]?.[characters.propertySlug])
  let seeded: Seeds = { ...seeds, [turn.answer[0]]: turn.answer[1] }
  const typed: (readonly [string, readonly Page[]])[] = []
  for (const characterType of CHARACTER_TYPES) {
    const slugs = slugsOf(drawn, characterType)
    if (slugs.length === 0) continue
    const characterRows = await namedRows(request, characterType, "slug", slugs)
    if (characterRows === null) continue
    seeded = { ...seeded, [characterRows.answer[0]]: characterRows.answer[1] }
    typed.push([characterType, characterRows.rows])
  }
  return {
    seeds: seeded,
    covers: characterCoversOf(drawn, new Map(typed)).map((one) => one.source),
  }
}

function nameOf(row: Readonly<Record<string, unknown>> | null | undefined): string | null {
  const title = row?.title
  if (typeof title === "string" && title !== "") return title
  return typeof row?.slug === "string" ? row.slug : null
}

export async function loader({ params, request }: LoaderFunctionArgs) {
  const { pageTypeSlug, pageHrefParam } = params
  if (pageTypeSlug === undefined || pageHrefParam === undefined) {
    throw new Response("Not Found", { status: 404 })
  }

  const parsed = parsePageHrefParam(pageHrefParam)
  if (!parsed) {
    throw new Response("Not Found", { status: 404 })
  }

  const brandedSlug = toPageTypeSlug(pageTypeSlug)

  if (pageTypeSlug === NAV_SLUG) {
    const navPage = await getPageByIdSuffix({
      pageTypeSlug: brandedSlug,
      idSuffix: parsed.idSuffix,
      slug: parsed.slug ?? undefined,
      select: ["id", "title", "slug", "icon"],
    })
    return data({
      kind: "nav" as const,
      pageTypeSlug,
      pageHrefParam,
      faviconIdSuffix: parsed.idSuffix,
      faviconIcon: navPage && typeof navPage.icon === "string" ? navPage.icon : "",
      title: nameOf(navPage),
    })
  }

  const exact = await getPageByIdSuffix({
    pageTypeSlug: brandedSlug,
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "title", "slug"],
  })

  let resolvedSlug = pageTypeSlug
  let id: string | null = exact && typeof exact.id === "string" ? exact.id : null
  let title: string | null = nameOf(exact)

  if (id == null) {
    const subtree = await getDescendantPageTypeSlugs(brandedSlug)
    if (subtree.length > 1) {
      const resolved = await getPageByIdSuffixAcrossTypes({
        pageTypeSlugs: subtree,
        idSuffix: parsed.idSuffix,
        slug: parsed.slug ?? undefined,
      })
      if (resolved && typeof resolved.id === "string") {
        id = resolved.id
        if (typeof resolved.pageTypeSlug === "string") resolvedSlug = resolved.pageTypeSlug
        title = nameOf(resolved)
      }
    }
  }

  if (id == null) {
    throw new Response("Not Found", { status: 404 })
  }

  const pageSlug = exact && typeof exact.slug === "string" ? exact.slug : null
  const resolvedId = id
  const seeding = seedsFor(request, resolvedSlug, id, pageSlug).then((seeds) =>
    coveredBy(request, seeds, resolvedSlug, resolvedId, pageSlug)
  )

  let readerPrev: ReaderNeighborLink | null = null
  let readerNext: ReaderNeighborLink | null = null
  let chapterTitle: string | null = null
  let chapterNumber: number | null = null
  const storyTitle: string | null = null
  let storyHref: string | null = null
  let nextUnreadHref: string | null = null
  if (resolvedSlug === READING_STORY_SLUG) {
    nextUnreadHref = await resolveNextUnreadHref({ storyId: id })
  }

  const resolvedBrandedSlug = toPageTypeSlug(resolvedSlug)
  const sequenceConfig = await getSequenceConfig({ pageTypeSlug: resolvedBrandedSlug })
  if (sequenceConfig != null) {
    const fullPage = (
      await getPages({
        pageTypeSlug: resolvedSlug,
        where: [{ key: "id", eq: id }],
        limit: 1,
      })
    ).rows[0]
    if (fullPage) {
      chapterTitle = typeof fullPage.title === "string" ? fullPage.title : null
      chapterNumber = typeof fullPage.chapterNumber === "number" ? fullPage.chapterNumber : null
      const storyRef = fullPage.story
      const parentStory = typeof storyRef === "string" ? addressIn(storyRef) : null
      if (parentStory?.kind === "qualified") {
        try {
          const story = await getPage({
            pageTypeSlug: parentStory.pageTypeSlug,
            where: [{ key: "slug", eq: parentStory.slug }],
            select: ["id", "slug", "title"],
          })
          if (story != null && typeof story.id === "string") {
            storyHref = buildPageHref({
              pageTypeSlug: toPageTypeSlug(parentStory.pageTypeSlug),
              slug: typeof story.slug === "string" ? story.slug : null,
              fallbackSlugSource: typeof story.title === "string" ? story.title : null,
              id: story.id,
            })
          }
        } catch (err) {
          console.error(
            `page-detail loader: story href resolution failed for ${resolvedSlug}/${id}; serving without a linked title`,
            err
          )
          storyHref = null
        }
      }
      if (sequenceConfig != null) {
        try {
          const neighbors = await resolveReaderNeighbors({
            page: fullPage,
            pageTypeSlug: resolvedBrandedSlug,
          })
          readerPrev = neighbors.prev
          readerNext = neighbors.next
        } catch (err) {
          console.error(
            `page-detail loader: reader neighbor resolution failed for ${resolvedSlug}/${id}; serving without pager`,
            err
          )
        }
      }
    }
  }

  return data({
    kind: "detail" as const,
    pageTypeSlug: resolvedSlug,
    id,
    faviconIdSuffix: null,
    faviconIcon: "",
    title,
    readerPrev,
    readerNext,
    storyHref,
    chapterTitle,
    chapterNumber,
    storyTitle,
    nextUnreadHref,
    followsType: sequenceConfig != null || resolvedSlug === READING_STORY_SLUG,
    ...(await seeding),
  })
}
