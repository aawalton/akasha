import {
  type Named,
  typesRead,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { Link } from "react-router"

export async function loader() {
  return { types: await typesRead() }
}

export default function InnworldHome({ loaderData }: { loaderData: { types: readonly Named[] } }) {
  return (
    <div>
      <h1 className="font-semibold text-3xl">Innworld</h1>
      <p className="mt-2 text-muted-foreground">A wiki of The Wandering Inn.</p>
      <ul className="mt-6 space-y-1">
        {loaderData.types.map((one) => (
          <li key={one.slug}>
            <Link className="underline" to={`/${one.slug}`}>
              {one.slug}
            </Link>
            {one.definition === null ? null : (
              <span className="text-muted-foreground"> — {one.definition}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}
