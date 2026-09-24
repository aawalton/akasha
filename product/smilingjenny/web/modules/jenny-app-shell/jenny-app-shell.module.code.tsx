import { AuthFooter } from "akasha/code/router-app/modules/auth-footer/auth-footer.module.code.tsx"
import {
  LayoutRouterAdapter,
  PagesUIRouterAdapter,
} from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { AppShell as SharedAppShell } from "akasha/design/interface/layout/modules/app-shell/app-shell.module.code.tsx"
import type {
  AppNavConfig,
  AppNavItem,
} from "akasha/design/interface/layout/modules/nav-types/nav-types.module.code.ts"
import { Home, MessageSquarePlus } from "lucide-react"
import type React from "react"
import { useMemo } from "react"

const PRIMARY_NAV_ITEMS: AppNavItem[] = [
  { id: "home", label: "Home", shortLabel: "Home", href: "/", icon: Home },
  {
    id: "requests",
    label: "Feature requests",
    shortLabel: "Requests",
    href: "/requests",
    icon: MessageSquarePlus,
  },
]

export function AppShell({ signedIn, children }: { signedIn: boolean; children: React.ReactNode }) {
  const config = useMemo<AppNavConfig>(
    () => ({
      primaryItems: PRIMARY_NAV_ITEMS,
      bottomSections: [],
      brandLabel: "SMILING JENNY",
      bottomNavMaxItems: 5,
      footerSlot: <AuthFooter signedIn={signedIn} />,
      skipRoutes: (p) => p === "/sign-in",
      navReady: true,
    }),
    [signedIn]
  )
  return (
    <LayoutRouterAdapter>
      <PagesUIRouterAdapter>
        <SharedAppShell config={config}>{children}</SharedAppShell>
      </PagesUIRouterAdapter>
    </LayoutRouterAdapter>
  )
}
