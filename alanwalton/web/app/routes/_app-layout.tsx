import { Toaster } from "@shared/design-primitives/components/sonner"
import { askComposed } from "@shared/pages-query/ask"
import { PlayingSessionProvider } from "@shared/pages-ui/media/playing-session-context"
import { SupabaseProvider } from "@shared/supabase-rr/provider"
import { getUser } from "@shared/supabase-rr/auth/server"
import { data, Outlet } from "react-router"
import { AppShell } from "~/components/app-shell"
import { AuthProvider } from "~/components/auth-provider"
import { ALANWALTON_APP_ID } from "~/lib/app-id"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    try {
      const asked = await askComposed({
        "page-type": "nav",
        where: { app: { is: ALANWALTON_APP_ID } },
        limit: 200,
      })
      if (!asked.ok) throw new Error(asked.why)
      navItems = asked.answer.rows.map((row) => row.values)
    } catch (err) {
      console.error("[alanwalton/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ user: userEnvelope, navItems }, { headers })
}

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
