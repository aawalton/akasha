import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { AuthProvider } from "akasha/page/ui/component/modules/auth-provider/auth-provider.module.code.tsx"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { JENNY_APP } from "akasha/product/smilingjenny/web/modules/jenny-app-id/jenny-app-id.module.code.ts"
import { AppShell } from "akasha/product/smilingjenny/web/modules/jenny-app-shell/jenny-app-shell.module.code.tsx"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(JENNY_SITE, request)
  const signedIn = reader !== null
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  if (signedIn) {
    try {
      const result = await getPages({
        pageTypeSlug: "nav",
        where: [{ key: "app", eq: JENNY_APP }],
        limit: 200,
      })
      navItems = result.rows
    } catch (err) {
      console.error("[smilingjenny/web/_app-layout] nav SSR fetch failed:", err)
    }
  }

  return data({ reader, accountId, signedIn, navItems })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppEditingProvider editing={false}>
        <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
      </AppEditingProvider>
    </AuthProvider>
  )
}
