import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { ARCHIVE_OF_WORLDS_APP } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-app-id/archive-of-worlds-app-id.module.code.ts"
import { AppShell } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-app-shell/archive-of-worlds-app-shell.module.code.tsx"
import { ARCHIVE_OF_WORLDS_SITE } from "akasha/product/archive-of-worlds/web/modules/archive-of-worlds-handover-site/archive-of-worlds-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(ARCHIVE_OF_WORLDS_SITE, request)
  const signedIn = reader !== null
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (signedIn) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: ARCHIVE_OF_WORLDS_APP }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[archive-of-worlds/web/_app-layout] nav SSR fetch failed:", err)
    }
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
