import { PageLayout, PageTitle } from "@akasha/design-layout/page-layout"
import { collectPages } from "@akasha/pages-access/iterate"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { data } from "react-router"
import { z } from "zod"
import { LocationMap } from "../location-map/location-map.module.code.tsx"
import { toPins } from "../pins/pins.module.code.ts"
import type { Route } from "./+types/map"

const BasemapUrlSchema = z.string().url()

export function meta() {
  return [{ title: "Map · Atlas" }]
}

export async function loader({ request }: Route.LoaderArgs) {
  const { headers } = createServerClient(request)
  const rows = await collectPages({
    pageTypeSlug: "location",
    pageSize: 1000,
  })
  const pins = toPins(rows)

  const basemapUrlResult = BasemapUrlSchema.safeParse(process.env.NEXT_PUBLIC_PROTOMAPS_PMTILES_URL)
  const basemapUrl = basemapUrlResult.success ? basemapUrlResult.data : null

  return data({ pins, basemapUrl }, { headers })
}

export default function MapRoute({ loaderData }: Route.ComponentProps) {
  const { pins, basemapUrl } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Map</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="space-y-3">
          <p className="text-secondary text-sm" data-testid="atlas-map-count">
            {pins.length === 0
              ? "No locations with coordinates yet. Add latitude and longitude to your Locations to see them on the map."
              : `Showing ${pins.length} ${pins.length === 1 ? "location" : "locations"} on the map.`}
          </p>
          {}
          {pins.length > 0 && (
            <ul className="sr-only" aria-label="Your saved locations">
              {pins.map((p) => (
                <li key={p.id}>
                  {p.address !== undefined ? `${p.title} — ${p.address}` : p.title}
                </li>
              ))}
            </ul>
          )}
          <div className="h-[70vh] min-h-96 w-full overflow-hidden rounded-xl">
            <LocationMap points={pins} basemapUrl={basemapUrl} />
          </div>
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
