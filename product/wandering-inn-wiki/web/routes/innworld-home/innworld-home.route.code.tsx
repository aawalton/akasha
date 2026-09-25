import {
  PageLayout,
  PageTitle,
} from "akasha/design/interface/layout/modules/page-layout/page-layout.module.code.tsx"
import { Icon } from "akasha/design/interface/pattern/modules/lucide-icon/lucide-icon.module.code.tsx"
import type { ShownType } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import {
  type Shelved,
  shelvesOf,
} from "akasha/product/wandering-inn-wiki/web/modules/innworld-shelves/innworld-shelves.module.code.ts"
import { useMemo } from "react"
import { Link, useRouteLoaderData } from "react-router"

const FRAME = "routes/_app-layout"

const AUTHOR = "https://wanderinginn.com"

type FrameData = {
  readonly shownTypes: readonly ShownType[]
  readonly navItems: readonly Readonly<Record<string, unknown>>[]
}

export function meta() {
  return [{ title: "Innworld" }]
}

function Entry({ one }: { one: Shelved }) {
  return (
    <li className="flex items-baseline gap-2">
      <Icon name={one.icon} aria-hidden className="size-4 shrink-0 translate-y-0.5" />
      <span>
        <Link className="font-medium underline" to={one.href}>
          {one.label}
        </Link>
        {one.definition === null ? null : (
          <span className="text-secondary"> — {one.definition}</span>
        )}
      </span>
    </li>
  )
}

export default function InnworldHome() {
  const loaderData = useRouteLoaderData<FrameData>(FRAME)
  const shelves = useMemo(
    () => shelvesOf(loaderData?.navItems ?? [], loaderData?.shownTypes ?? []),
    [loaderData]
  )
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
            <section key={shelf.heading ?? `loose-${shelf.under[0]?.href ?? ""}`}>
              {shelf.heading === null ? null : (
                <h2 className="mb-2 font-semibold text-secondary text-sm uppercase tracking-wide">
                  {shelf.heading}
                </h2>
              )}
              <ul className="space-y-2">
                {shelf.under.map((one) => (
                  <Entry key={one.href} one={one} />
                ))}
              </ul>
            </section>
          ))}
        </div>
      </PageLayout.Content>
    </PageLayout>
  )
}
