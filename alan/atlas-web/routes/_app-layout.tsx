import { ATLAS_APP } from "akasha/alan/atlas-web/modules/atlas-app-id/atlas-app-id.module.code.ts"
import { AppShell } from "akasha/alan/atlas-web/modules/atlas-app-shell/atlas-app-shell.module.code.tsx"
import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { useEffect } from "react"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(ATLAS_SITE, request)
  const signedIn = reader !== null
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (signedIn) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: ATLAS_APP }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[atlas/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ reader, accountId, signedIn, navItems })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  useEffect(() => {
    let cancelled = false
    void import(
      "akasha/alan/atlas-web/modules/location-capture-client/location-capture-client.module.code.ts"
    ).then((m) => {
      if (!cancelled) void m.startLocationCapture()
    })
    return () => {
      cancelled = true
    }
  }, [])

  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
        <Outlet />
      </AppShell>
      <Toaster />
    </AuthProvider>
  )
}
