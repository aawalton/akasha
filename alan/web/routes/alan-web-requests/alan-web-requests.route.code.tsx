import { alan } from "akasha/alan/alan.domain.ts"
import { PageTitle } from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"

const PRODUCT = namedAs("domain", alan.slug, null)

export function meta() {
  return [
    { title: "Feature requests — Alan Walton" },
    {
      name: "description",
      content: "The feature requests published for alanwalton.com, most points first.",
    },
  ]
}

export function loader() {
  return listingFor(PRODUCT)
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

export default function AlanWebRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
  const { requests } = loaderData
  return (
    <main className="mx-auto w-full max-w-3xl px-6 py-12">
      <div className="space-y-6">
        <header className="space-y-2">
          <PageTitle>Feature requests</PageTitle>
          <p className="text-secondary text-sm">
            What people have asked Alan to build, and the contribution points behind each ask.
          </p>
        </header>

        {requests.length === 0 ? (
          <p className="text-secondary text-sm">Nothing has been published here yet.</p>
        ) : (
          <ul className="space-y-6">
            {requests.map((one) => (
              <li key={one.id} className="space-y-1">
                <h2 className="font-semibold text-base text-primary">{one.title}</h2>
                <p className="text-secondary text-sm">{one.ask}</p>
                <p className="text-secondary text-sm">
                  {one.points} {one.points === 1 ? "point" : "points"} behind it, from {one.backers}{" "}
                  {one.backers === 1 ? "backer" : "backers"}
                </p>
              </li>
            ))}
          </ul>
        )}
      </div>
    </main>
  )
}
