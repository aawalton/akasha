import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { REQUESTS_APP_SLUG } from "akasha/alan/requests-web/modules/requests-app-id/requests-app-id.module.code.ts"
import { AppShell } from "akasha/alan/requests-web/modules/requests-app-shell/requests-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/requests-web/modules/requests-auth-provider/requests-auth-provider.module.code.tsx"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { CreateOverrideProvider } from "akasha/page/ui/component/modules/create-override/create-override.module.code.tsx"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import { ProposeDialog } from "akasha/product/kofi/feature-request/modules/propose-dialog/feature-request-propose-dialog.module.code.tsx"
import { balanceHeldBy } from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"
import { useMemo, useState } from "react"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

const FEATURE_REQUEST = "feature-request"

const PROPOSE_PATH = "/api/request-propose"

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

  const balance = reader === null ? null : await balanceHeldBy(reader)

  return data({ reader, accountId, signedIn, navItems, balance })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  const [proposing, setProposing] = useState(false)
  const overrides = useMemo(() => ({ [FEATURE_REQUEST]: () => setProposing(true) }), [])

  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <CreateOverrideProvider overrides={overrides}>
        <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
          <Outlet />
        </AppShell>
      </CreateOverrideProvider>
      <ProposeDialog
        open={proposing}
        onOpenChange={setProposing}
        postTo={PROPOSE_PATH}
        balance={loaderData.balance}
      />
      <Toaster />
    </AuthProvider>
  )
}
