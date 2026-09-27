import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { smilingjennyWeb } from "akasha/infrastructure/service/akasha-service/web-app/pages/smilingjenny-web.web-app.ts"
import {
  metaOf,
  SITE_DOCUMENT,
  siteDocumentAt,
} from "akasha/infrastructure/service/akasha-service/web-app/site-document/modules/reading/site-document-reading.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"
import { smilingjenny } from "akasha/product/smilingjenny/smilingjenny.domain.ts"

const PRODUCT = namedAs("domain", smilingjenny.slug, null)

const WEB_APP = namedAs("web-app", smilingjennyWeb.slug, null)

const READ = ["feature-request", SITE_DOCUMENT]

const UNPUBLISHED = "unpublished"

export async function loader() {
  const [listing, document, home] = await Promise.all([
    listingFor(PRODUCT),
    siteDocumentAt(WEB_APP, "requests"),
    siteDocumentAt(WEB_APP, ""),
  ])
  return { ...listing, document, site: home.title }
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

export function meta({ data }: { data: RequestsLoaderData | undefined }) {
  return metaOf(data?.document, data?.site ?? null)
}

export default function JennyRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
  useLoaderFollowing(READ)
  const { requests, document } = loaderData
  const unpublished = document.sections.find((one) => one.anchor === UNPUBLISHED)
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{document.title}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <div className="flex flex-col gap-6">
          {document.lead === null ? null : (
            <p className="text-base text-secondary">{document.lead}</p>
          )}
          {requests.length === 0 ? (
            <p className="text-base text-secondary">{unpublished?.text ?? null}</p>
          ) : (
            <ul className="flex flex-col gap-5">
              {requests.map((one) => (
                <li key={one.id} className="flex flex-col gap-1">
                  <h2 className="font-semibold text-base text-primary">{one.title}</h2>
                  <p className="text-base text-secondary">{one.ask}</p>
                  <p className="text-secondary text-sm">
                    {one.points} {one.points === 1 ? "point" : "points"} from {one.boosters}{" "}
                    {one.boosters === 1 ? "booster" : "boosters"}
                  </p>
                </li>
              ))}
            </ul>
          )}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
