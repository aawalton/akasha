import { Toaster } from "@akasha/design-primitives/sonner"
import { PlayingSessionProvider } from "@akasha/pages-ui/media/playing-session-context"
import { SupabaseProvider } from "@akasha/supabase-rr/supabase-provider"
import { Outlet } from "react-router"
import { AppShell } from "../alan-app-shell/alan-app-shell.module.code.tsx"
import { AuthProvider } from "../alan-auth-provider/alan-auth-provider.module.code.tsx"
import type { Route } from "./+types/_app-layout"

export { loader } from "../.server/app-layout-loading/app-layout-loading.module.code.ts"

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
