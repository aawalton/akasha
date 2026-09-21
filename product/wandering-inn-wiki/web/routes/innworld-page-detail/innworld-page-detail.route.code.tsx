import {
  pageRead,
  type Shown,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { Link } from "react-router"

export async function loader({
  params,
}: {
  params: { pageTypeSlug: string; pageHrefParam: string }
}) {
  const shown = await pageRead(params.pageTypeSlug, params.pageHrefParam)
  if (shown === null) throw new Response("Not Found", { status: 404 })
  return shown
}

export default function PageDetailRoute({ loaderData }: { loaderData: Shown }) {
  const { pageTypeSlug, title, fields } = loaderData
  return (
    <article>
      <Link className="text-muted-foreground text-sm underline" to={`/${pageTypeSlug}`}>
        {pageTypeSlug}
      </Link>
      <h1 className="mt-1 font-semibold text-3xl">{title}</h1>
      <dl className="mt-6 space-y-2">
        {fields.map(([key, said]) => (
          <div key={key}>
            <dt className="text-muted-foreground text-sm">{key}</dt>
            <dd>{said}</dd>
          </div>
        ))}
      </dl>
    </article>
  )
}
