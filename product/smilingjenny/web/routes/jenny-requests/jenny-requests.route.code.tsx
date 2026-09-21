import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"
import { listingFor } from "akasha/product/kofi/feature-request/modules/listing/feature-request-listing.module.code.ts"
import { smilingjenny } from "akasha/product/smilingjenny/smilingjenny.domain.ts"

const PRODUCT = namedAs("domain", smilingjenny.slug, null)

export function meta() {
  return [{ title: "Feature requests — Smiling Jenny" }]
}

export function loader() {
  return listingFor(PRODUCT)
}

type RequestsLoaderData = Awaited<ReturnType<typeof loader>>

export default function JennyRequestsRoute({ loaderData }: { loaderData: RequestsLoaderData }) {
  const { requests } = loaderData
  return (
    <main className="mx-auto flex max-w-lg flex-col gap-6 px-5 py-16">
      <div className="flex flex-col gap-2">
        <p className="font-medium text-secondary text-sm">Smiling Jenny</p>
        <h1 className="font-semibold text-2xl text-primary">Feature requests</h1>
        <p className="text-base text-secondary">
          What has been asked for here, and the contribution points behind each ask.
        </p>
      </div>

      {requests.length === 0 ? (
        <p className="text-base text-secondary">Nothing has been published here yet.</p>
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
    </main>
  )
}
