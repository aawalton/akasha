import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type {
  AppNavConfig,
  AppNavItem,
} from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import type { Collection } from "akasha/product/wandering-inn-wiki/web/modules/innworld-reading/innworld-reading.module.code.ts"
import { BookOpen, Home } from "lucide-react"
import { useMemo } from "react"

const BRAND = "INNWORLD"

const AUTHOR = "https://wanderinginn.com"

const HOME: AppNavItem = { id: "home", label: "Home", shortLabel: "Home", href: "/", icon: Home }

export function navItemsOf(collections: readonly Collection[]): readonly AppNavItem[] {
  return [
    HOME,
    ...collections.map((one) => ({
      id: one.slug,
      label: one.name,
      shortLabel: one.name,
      href: `/${one.slug}`,
      icon: BookOpen,
    })),
  ]
}

function Credit() {
  return (
    <p className="mx-auto max-w-5xl p-4 text-secondary text-sm">
      Innworld is a fan wiki. The Wandering Inn, its characters and its world belong to{" "}
      <a className="underline" href={AUTHOR}>
        pirateaba
      </a>
      .
    </p>
  )
}

export function AppShell({
  collections,
  children,
}: {
  collections: readonly Collection[]
  children: React.ReactNode
}) {
  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: navItemsOf(collections),
      bottomSections: [],
      brandLabel: BRAND,
      bottomNavMaxItems: 5,
      navReady: true,
    }),
    [collections]
  )
  return (
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <SharedAppShell config={config}>
          {children}
          <Credit />
        </SharedAppShell>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
