import { Toaster } from "@akasha/design-primitives/sonner"
import { PlayingSessionProvider } from "@akasha/pages-ui/media/playing-session-context"
import { SupabaseProvider } from "@akasha/supabase-rr/supabase-provider"
import { Outlet } from "react-router"
import { AppShell } from "~/components/app-shell"
import { AuthProvider } from "~/components/auth-provider"
import type { Route } from "./+types/_app-layout"

export { loader } from "./_app-layout-loader.server"

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
