import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { getPageByIdSuffix } from "@akasha/pages-access/get"
import { getPagesByRelation } from "@akasha/pages-access/get-by-relation"
import { parsePageHrefParam } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { data } from "react-router"
import { z } from "zod"
import { LocationMap } from "../location-map/location-map.module.code.tsx"
import {
  TIME_BUCKET_TOKENS,
  type TimeBucket,
  timeBucket,
} from "../pin-time-color/pin-time-color.module.code.ts"
import { type LocationPin, toPins } from "../pins/pins.module.code.ts"
import type { Route } from "./+types/trip"

const COLLECTION_SLUG = "location-collection"

const BasemapUrlSchema = z.string().url()

type TripStop = LocationPin & { bucket: TimeBucket }

export function meta({ data: loaderData }: Route.MetaArgs) {
  const title = loaderData?.tripTitle
  return [{ title: title !== undefined ? `${title} · Atlas` : "Trip · Atlas" }]
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const parsed = parsePageHrefParam(params.tripParam)
  if (!parsed) throw new Response("Not Found", { status: 404 })

  const { headers } = createServerClient(request)

  const collection = await getPageByIdSuffix({
    pageTypeSlug: toPageTypeSlug(COLLECTION_SLUG),
    idSuffix: parsed.idSuffix,
    slug: parsed.slug ?? undefined,
    select: ["id", "title"],
  })
  if (!collection || typeof collection.id !== "string") {
    throw new Response("Not Found", { status: 404 })
  }
  const collectionId = collection.id
  const tripTitle = typeof collection.title === "string" ? collection.title : "Trip"

  const rows = await getPagesByRelation({
    relationKey: "collection",
    relationValue: collectionId,
    pageTypeSlugs: ["location"],
  })
  const basePins = toPins(rows)

  const now = Date.now()
  const stops: TripStop[] = basePins.map((p) => {
    const bucket = timeBucket(p.scheduledStart ?? null, p.scheduledEnd ?? null, now)
    return { ...p, bucket, colorToken: TIME_BUCKET_TOKENS[bucket] }
  })

  const basemapUrlResult = BasemapUrlSchema.safeParse(process.env.NEXT_PUBLIC_PROTOMAPS_PMTILES_URL)
  const basemapUrl = basemapUrlResult.success ? basemapUrlResult.data : null

  return data({ tripTitle, stops, basemapUrl }, { headers })
}

export default function TripRoute({ loaderData }: Route.ComponentProps) {
  const { tripTitle, stops, basemapUrl } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{tripTitle}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="space-y-3">
          <p className="text-secondary text-sm" data-testid="atlas-trip-count">
            {stops.length === 0
              ? "No locations with coordinates yet. Add latitude and longitude to this trip's locations to see them on the map."
              : `Showing ${stops.length} ${stops.length === 1 ? "location" : "locations"} on the map.`}
          </p>
          {}
          {stops.length > 0 && (
            <ul className="sr-only" aria-label="Trip locations by name and timeline position">
              {stops.map((s) => (
                <li key={s.id} data-bucket={s.bucket}>
                  {s.title} — {s.bucket}
                </li>
              ))}
            </ul>
          )}
          <div className="h-[70vh] min-h-96 w-full overflow-hidden rounded-xl">
            <LocationMap points={stops} basemapUrl={basemapUrl} />
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
