import { LocationMap } from "akasha/alan/atlas-web/modules/location-map/location-map.module.code.tsx"
import { toPins } from "akasha/alan/atlas-web/modules/pins/pins.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { data } from "react-router"
import { z } from "zod"

const BasemapUrlSchema = z.string().url()

const LOCATION = "location"

const READ = [LOCATION]

export function meta() {
  return [{ title: "Map · Atlas" }]
}

export async function loader() {
  const rows = await collectPages({
    pageTypeSlug: LOCATION,
    pageSize: 1000,
  })
  const pins = toPins(rows)

  const basemapUrlResult = BasemapUrlSchema.safeParse(process.env.NEXT_PUBLIC_PROTOMAPS_PMTILES_URL)
  const basemapUrl = basemapUrlResult.success ? basemapUrlResult.data : null

  return data({ pins, basemapUrl })
}

type MapLoaderData = Awaited<ReturnType<typeof loader>>["data"]

export default function MapRoute({ loaderData }: { loaderData: MapLoaderData }) {
  useLoaderFollowing(READ)
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
