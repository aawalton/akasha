import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { Link, useRouteLoaderData } from "react-router"

const FRAME = "routes/_app-layout"

const NONE: readonly ShownType[] = []

export function meta() {
  return [{ title: "Innworld" }]
}

export default function InnworldHome() {
  const loaderData = useRouteLoaderData<{ shownTypes: readonly ShownType[] }>(FRAME)
  const shownTypes = loaderData?.shownTypes ?? NONE
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Innworld</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <p className="text-secondary">A wiki of The Wandering Inn.</p>
        <ul className="mt-6 space-y-2">
          {shownTypes.map((one) => (
            <li key={one.slug}>
              <Link className="font-medium underline" to={`/${one.slug}`}>
                {one.name}
              </Link>
              {one.definition === null ? null : (
                <span className="text-secondary"> — {one.definition}</span>
              )}
            </li>
          ))}
        </ul>
      </PageLayout.Content>
    </PageLayout>
  )
}
