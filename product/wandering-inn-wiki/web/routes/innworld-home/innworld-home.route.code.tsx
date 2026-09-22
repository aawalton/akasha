import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import {
  type Shelved,
  shelvesOf,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-app-shell/innworld-app-shell.module.code.tsx"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { useMemo } from "react"
import { Link, useRouteLoaderData } from "react-router"

const FRAME = "routes/_app-layout"

const AUTHOR = "https://wanderinginn.com"

const NONE: readonly ShownType[] = []

export function meta() {
  return [{ title: "Innworld" }]
}

function Entry({ one }: { one: Shelved }) {
  const Icon = one.icon
  return (
    <li className="flex items-baseline gap-2">
      <Icon aria-hidden className="size-4 shrink-0 translate-y-0.5" />
      <span>
        <Link className="font-medium underline" to={`/${one.held.slug}`}>
          {one.label}
        </Link>
        {one.held.definition === null ? null : (
          <span className="text-secondary"> — {one.held.definition}</span>
        )}
      </span>
    </li>
  )
}

export default function InnworldHome() {
  const loaderData = useRouteLoaderData<{ shownTypes: readonly ShownType[] }>(FRAME)
  const shownTypes = loaderData?.shownTypes ?? NONE
  const shelves = useMemo(() => shelvesOf(shownTypes), [shownTypes])
  return (
    <PageLayout>
      <PageLayout.Header>
        <PageTitle>Innworld</PageTitle>
      </PageLayout.Header>
      <PageLayout.Content>
        <p className="text-secondary">
          A fan wiki of The Wandering Inn, whose characters and world belong to{" "}
          <a className="underline" href={AUTHOR}>
            pirateaba
          </a>
          .
        </p>
        <div className="mt-6 space-y-6">
          {shelves.map((shelf) => (
            <section key={shelf.heading ?? `loose-${shelf.under[0]?.held.slug ?? ""}`}>
              {shelf.heading === null ? null : (
                <h2 className="mb-2 font-semibold text-secondary text-sm uppercase tracking-wide">
                  {shelf.heading}
                </h2>
              )}
              <ul className="space-y-2">
                {shelf.under.map((one) => (
                  <Entry key={one.held.slug} one={one} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
