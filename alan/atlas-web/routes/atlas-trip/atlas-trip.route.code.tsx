import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interface/pattern/modules/empty/empty.module.code.tsx"
import {
  Item,
  ItemContent,
  ItemDescription,
  ItemTitle,
} from "akasha/design/interface/pattern/modules/item/item.module.code.tsx"
import { getPageByIdSuffix, getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import type { PageOrder, PageSelect } from "akasha/page/access/modules/types/types.module.code.ts"
import type { Page } from "akasha/page/core/modules/page-types/page-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import {
  buildPageHref,
  parsePageHrefParam,
} from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { data, Link } from "react-router"

const COLLECTION_SLUG = "location-collection"

const STOP_SLUG = "location"

const READ = [COLLECTION_SLUG, STOP_SLUG]

const STOPS_LIMIT = 1000

const DATE_LENGTH = 10

const NOTHING_NAMES_IT = "A stop is a location naming this collection. Nothing names this one yet."

const STOP_SELECT: PageSelect = ["id", "title", "slug", "address", "scheduledStartAt"]

const STOP_ORDER: PageOrder = [
  { by: "scheduledStartAt", dir: "asc" },
  { by: "title", dir: "asc" },
]

type TripStop = {
  readonly id: string
  readonly title: string
  readonly href: string
  readonly detail: string | null
}

function textIn(value: unknown): string | null {
  return typeof value === "string" && value.length > 0 ? value : null
}

function detailOf(row: Page): string | null {
  const started = textIn(row.scheduledStartAt)
  const when = started === null ? null : started.slice(0, DATE_LENGTH)
  const address = textIn(row.address)
  if (when !== null && address !== null) return `${when} · ${address}`
  return when ?? address
}

function stopsFrom(rows: readonly Page[]): readonly TripStop[] {
  return rows.map((row) => {
    const title = textIn(row.title) ?? "Untitled location"
    return {
      id: row.id,
      title,
      href: buildPageHref({
        pageTypeSlug: toPageTypeSlug(STOP_SLUG),
        slug: textIn(row.slug),
        fallbackSlugSource: title,
        id: row.id,
      }),
      detail: detailOf(row),
    }
  })
}

function countSays(shown: number, total: number): string {
  if (shown < total) return `Showing the first ${shown} of ${total} stops on this trip.`
  return shown === 1 ? "1 stop on this trip." : `${shown} stops on this trip.`
}

export async function loader({ params }: { params: { tripParam: string } }) {
  const parsed = parsePageHrefParam(params.tripParam)
  if (!parsed) throw new Response("Not Found", { status: 404 })

  const collection = await getPageByIdSuffix({
    pageTypeSlug: toPageTypeSlug(COLLECTION_SLUG),
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "title", "slug"],
  })
  if (!collection || typeof collection.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const tripTitle = typeof collection.title === "string" ? collection.title : "Trip"

  const collectionSlug = textIn(collection.slug)
  const found =
    collectionSlug === null
      ? { rows: [] as readonly Page[], count: 0 }
      : await getPages({
          pageTypeSlug: STOP_SLUG,
          where: [{ key: "collection", eq: namedAs(COLLECTION_SLUG, collectionSlug, null) }],
          select: STOP_SELECT,
          order: STOP_ORDER,
          limit: STOPS_LIMIT,
          withCount: true,
        })

  const stops = stopsFrom(found.rows)
  return data({ tripTitle, stops, stopCount: found.count ?? stops.length })
}

type TripLoaderData = Awaited<ReturnType<typeof loader>>["data"]

export function meta({ data: loaderData }: { data: TripLoaderData | undefined }) {
  const title = loaderData?.tripTitle
  return [{ title: title !== undefined ? `${title} · Atlas` : "Trip · Atlas" }]
}

export default function TripRoute({ loaderData }: { loaderData: TripLoaderData }) {
  useLoaderFollowing(READ)
  const { tripTitle, stops, stopCount } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{tripTitle}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        {stops.length === 0 ? (
          <Empty data-testid="atlas-trip-empty">
            <EmptyHeader>
              <EmptyTitle>No stops on this trip yet</EmptyTitle>
              <EmptyDescription>{NOTHING_NAMES_IT}</EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <div className="space-y-3">
            <p className="text-secondary text-sm" data-testid="atlas-trip-count">
              {countSays(stops.length, stopCount)}
            </p>
            <ul className="flex flex-col gap-1" aria-label="Stops on this trip">
              {stops.map((stop) => (
                <li key={stop.id}>
                  <Item asChild size="sm">
                    <Link to={stop.href} data-testid="atlas-trip-stop">
                      <ItemContent>
                        <ItemTitle>{stop.title}</ItemTitle>
                        {stop.detail !== null && <ItemDescription>{stop.detail}</ItemDescription>}
                      </ItemContent>
                    </Link>
                  </Item>
                </li>
              ))}
            </ul>
          </div>
        )}
      </PageLayout.Content>
    </PageLayout>
  )
}
