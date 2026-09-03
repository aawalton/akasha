import { Toaster } from "@akasha/design-primitives/sonner"
import { getPages } from "@akasha/pages-access/get"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { SupabaseProvider } from "@akasha/supabase-rr/supabase-provider"
import { data, Outlet } from "react-router"
import { ARCHIVE_OF_WORLDS_APP_ID } from "../archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { AppShell } from "../archive-of-worlds-app-shell/archive-of-worlds-app-shell.module.code.tsx"
import { AuthProvider } from "../archive-of-worlds-auth-provider/archive-of-worlds-auth-provider.module.code.tsx"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (user) {
    const { headers: navHeaders } = createServerClient(request)
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: ARCHIVE_OF_WORLDS_APP_ID }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[archive-of-worlds/web/_app-layout] nav SSR fetch failed:", err)
    }
    for (const [key, value] of navHeaders) {
      headers.append(key, value)
    }
  }

  return data({ user: userEnvelope, navItems }, { headers })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <SupabaseProvider>
      <AuthProvider>
        <AppShell user={loaderData.user} ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
        <Toaster />
      </AuthProvider>
    </SupabaseProvider>
  )
}
