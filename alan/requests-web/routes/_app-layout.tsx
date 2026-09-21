import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { REQUESTS_APP_SLUG } from "akasha/alan/requests-web/modules/requests-app-id/requests-app-id.module.code.ts"
import { AppShell } from "akasha/alan/requests-web/modules/requests-app-shell/requests-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/requests-web/modules/requests-auth-provider/requests-auth-provider.module.code.tsx"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(REQUESTS_SITE, request)
  const signedIn = reader !== null
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  try {
    const result = await getPages({
      pageTypeSlug: "nav",
      where: [{ key: "appSlug", eq: REQUESTS_APP_SLUG }],
      limit: 200,
    })
    navItems = result.rows
  } catch (err) {
    console.error("[requests/web/_app-layout] nav SSR fetch failed:", err)
  }

  return data({ reader, accountId, signedIn, navItems })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
        <Outlet />
      </AppShell>
      <Toaster />
    </AuthProvider>
  )
}
