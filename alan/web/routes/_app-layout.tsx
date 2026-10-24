import { loader as appLayoutLoader } from "akasha/alan/web/.server/app-layout-loading/app-layout-loading.module.code.ts"
import { AppShell } from "akasha/alan/web/modules/alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/web/modules/alan-auth-provider/alan-auth-provider.module.code.tsx"
import { apiFetch } from "akasha/alan/web/modules/api-fetch/api-fetch.module.code.ts"
import { API_ORIGIN } from "akasha/alan/web/modules/api-origin/api-origin.module.code.ts"
import { isNativeShell } from "akasha/alan/web/modules/capacitor-bridge/capacitor-bridge.module.code.ts"
import { PagesUIRouterAdapter } from "akasha/code/router-app/modules/router-context-adapters/router-context-adapters.module.code.tsx"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { WEB_APP } from "akasha/infrastructure/service/akasha-service/web-app/modules/naming/web-app-naming.module.code.ts"
import { useLoaderFollowing } from "akasha/page/ui/modules/loader-following/loader-following.module.code.ts"
import { NarrationBar } from "akasha/story/chapter/narration/modules/bar/narration-bar.module.code.tsx"
import {
  NarrationProvider,
  type NarrationReach,
} from "akasha/story/chapter/narration/modules/player/narration-player.module.code.tsx"
import { Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

const READ = [WEB_APP]

const NARRATION_REACH: NarrationReach = {
  fetch: apiFetch,
  url: (path) => (isNativeShell() ? `${API_ORIGIN}${path}` : path),
}

export const loader = appLayoutLoader

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  useLoaderFollowing(READ)
  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <NarrationProvider reach={NARRATION_REACH}>
        <AppShell
          brand={loaderData.brand}
          signedIn={loaderData.signedIn}
          accountId={loaderData.accountId}
          ssrNavItems={loaderData.navItems}
          navServed={loaderData.navServed}
        >
          <Outlet />
        </AppShell>
        <PagesUIRouterAdapter>
          <NarrationBar />
        </PagesUIRouterAdapter>
      </NarrationProvider>
      <Toaster />
    </AuthProvider>
  )
}
