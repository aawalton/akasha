import {
  type Listing,
  listingRead,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { Link } from "react-router"

function fromIn(request: Request): number {
  const said = Number.parseInt(new URL(request.url).searchParams.get("from") ?? "", 10)
  return Number.isInteger(said) && said > 0 ? said : 0
}

export async function loader({
  params,
  request,
}: {
  params: { pageTypeSlug: string }
  request: Request
}) {
  const listing = await listingRead(params.pageTypeSlug, fromIn(request))
  if (listing === null) throw new Response("Not Found", { status: 404 })
  return listing
}

export default function PagesListingRoute({ loaderData }: { loaderData: Listing }) {
  const { pageTypeSlug, rows, from, atOnce, more } = loaderData
  return (
    <div>
      <h1 className="font-semibold text-3xl">{pageTypeSlug}</h1>
      <ul className="mt-6 space-y-1">
        {rows.map((one) => (
          <li key={one.href}>
            <Link className="underline" to={one.href}>
              {one.title}
            </Link>
          </li>
        ))}
      </ul>
      <nav className="mt-6 flex gap-4">
        {from > 0 ? (
          <Link className="underline" to={`/${pageTypeSlug}?from=${Math.max(0, from - atOnce)}`}>
            back
          </Link>
        ) : null}
        {more ? (
          <Link className="underline" to={`/${pageTypeSlug}?from=${from + atOnce}`}>
            on
          </Link>
        ) : null}
      </nav>
    </div>
  )
}
