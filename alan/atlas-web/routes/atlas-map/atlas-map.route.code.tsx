import { ATLAS_APP } from "akasha/alan/atlas-web/modules/atlas-app-id/atlas-app-id.module.code.ts"
import { LocationMap } from "akasha/alan/atlas-web/modules/location-map/location-map.module.code.tsx"
import { toPins } from "akasha/alan/atlas-web/modules/pins/pins.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  metaUnderSite,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { usePhrase } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/modules/reading/web-phrase-reading.module.code.tsx"
import { atlasMapCount } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-map-count.web-phrase.ts"
import { atlasMapCountOne } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-map-count-one.web-phrase.ts"
import { atlasMapEmpty } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-map-empty.web-phrase.ts"
import { atlasMapListed } from "akasha/infrastructure/service/akasha-service/web-app/web-phrase/pages/atlas-map-listed.web-phrase.ts"
import { collectPages } from "akasha/page/access/modules/iterate/iterate.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { z } from "zod"

const BasemapUrlSchema = z.string().url()

const LOCATION = "location"

const READ = [LOCATION, SITE_DOCUMENT]

export const meta = metaUnderSite

export async function loader() {
  const [rows, document] = await Promise.all([
    collectPages({ pageTypeSlug: LOCATION, pageSize: 1000 }),
    siteDocumentAt(ATLAS_APP, "map"),
  ])
  const pins = toPins(rows)

  const basemapUrlResult = BasemapUrlSchema.safeParse(process.env.NEXT_PUBLIC_PROTOMAPS_PMTILES_URL)
  const basemapUrl = basemapUrlResult.success ? basemapUrlResult.data : null

  return { pins, basemapUrl, document }
}

type MapLoaderData = Awaited<ReturnType<typeof loader>>

function countSlug(count: number): string {
  if (count === 0) return atlasMapEmpty.slug
  return count === 1 ? atlasMapCountOne.slug : atlasMapCount.slug
}

export default function MapRoute({ loaderData }: { loaderData: MapLoaderData }) {
  useLoaderFollowing(READ)
  const phrase = usePhrase()
  const { pins, basemapUrl, document } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.title}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="space-y-3">
          <p className="text-secondary text-sm" data-testid="atlas-map-count">
            {phrase(countSlug(pins.length), { count: pins.length })}
          </p>
          {}
          {pins.length > 0 && (
            <ul className="sr-only" aria-label={phrase(atlasMapListed.slug)}>
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
