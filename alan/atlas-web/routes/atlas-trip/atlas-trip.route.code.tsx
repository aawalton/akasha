import { createServerClient } from "akasha/alan/harness/supabase-rr/modules/server-client/server-client.module.code.ts"
import {
  PageLayout,
  PageTitle,
} from "akasha/design/interfaces/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "akasha/design/interfaces/patterns/modules/empty/empty.module.code.tsx"
import { getPageByIdSuffix } from "akasha/pages/access/modules/get/get.module.code.ts"
import { parsePageHrefParam } from "akasha/pages/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/pages/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { data } from "react-router"

const COLLECTION_SLUG = "location-collection"

const NOT_NAMED =
  "A trip's stops are the locations naming this collection. Reaching those went through an index of what names what, and the page store holds no such index, so the stops are never asked for."

export async function loader({
  params,
  request,
}: {
  params: { tripParam: string }
  request: Request
}) {
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
  const tripTitle = typeof collection.title === "string" ? collection.title : "Trip"

  return data({ tripTitle }, { headers })
}

type TripLoaderData = Awaited<ReturnType<typeof loader>>["data"]

export function meta({ data: loaderData }: { data: TripLoaderData | undefined }) {
  const title = loaderData?.tripTitle
  return [{ title: title !== undefined ? `${title} · Atlas` : "Trip · Atlas" }]
}

export default function TripRoute({ loaderData }: { loaderData: TripLoaderData }) {
  const { tripTitle } = loaderData
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>{tripTitle}</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <Empty data-testid="atlas-trip-unasked">
          <EmptyHeader>
            <EmptyTitle>The stops on this trip were not asked for</EmptyTitle>
            <EmptyDescription>{NOT_NAMED}</EmptyDescription>
          </EmptyHeader>
        </Empty>
      </PageLayout.Content>
    </PageLayout>
  )
}
