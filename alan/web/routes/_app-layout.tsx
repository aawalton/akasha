import { Toaster } from "@akasha/design-primitives/sonner"
import { PlayingSessionProvider } from "@akasha/pages-ui/media/playing-session-context"
import { SupabaseProvider } from "akasha/alan/harness/supabase-rr/supabase-provider/supabase-provider.module.code.tsx"
import { Outlet } from "react-router"
import { loader as appLayoutLoader } from "../.server/app-layout-loading/app-layout-loading.module.code.ts"
import { AppShell } from "../alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "../alan-auth-provider/alan-auth-provider.module.code.tsx"
import type { Route } from "./+types/_app-layout"

export const loader = appLayoutLoader

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SupabaseProvider>
      <AuthProvider>
        {}
        <PlayingSessionProvider>
          <AppShell user={loaderData.user} ssrNavItems={loaderData.navItems}>
            <Outlet />
          </AppShell>
        </PlayingSessionProvider>
        <Toaster />
      </AuthProvider>
    </SupabaseProvider>
  )
}
