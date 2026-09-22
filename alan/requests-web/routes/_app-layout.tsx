import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { REQUESTS_APP } from "akasha/alan/requests-web/modules/requests-app-id/requests-app-id.module.code.ts"
import { AppShell } from "akasha/alan/requests-web/modules/requests-app-shell/requests-app-shell.module.code.tsx"
import { AuthProvider } from "akasha/alan/requests-web/modules/requests-auth-provider/requests-auth-provider.module.code.tsx"
import { REQUESTS_SITE } from "akasha/alan/requests-web/modules/requests-handover-site/requests-handover-site.module.code.ts"
import { Toaster } from "akasha/design/interface/primitive/modules/sonner/sonner.module.code.tsx"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { AppEditingProvider } from "akasha/page/ui/component/modules/app-editing/app-editing.module.code.tsx"
import { CreateOverrideProvider } from "akasha/page/ui/component/modules/create-override/create-override.module.code.tsx"
import { registerActionVerb } from "akasha/page/ui/modules/action-verb-registry/action-verb-registry.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"
import {
  BoostDialog,
  type Boosting,
} from "akasha/product/kofi/feature-request/modules/boost-dialog/feature-request-boost-dialog.module.code.tsx"
import { ProposeDialog } from "akasha/product/kofi/feature-request/modules/propose-dialog/feature-request-propose-dialog.module.code.tsx"
import { balanceHeldBy } from "akasha/product/kofi/feature-request/modules/writing/feature-request-writing.module.code.ts"
import { featureRequestBoost } from "akasha/product/kofi/feature-request/properties/feature-request-boost.action-button-property.ts"
import { useEffect, useMemo, useState } from "react"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

const FEATURE_REQUEST = "feature-request"

const REQUESTS_PATH = "/api/requests"

function boostingIn(held: Record<string, unknown>): Boosting {
  const slug = held.slug
  const ask = held.ask
  return {
    slug: typeof slug === "string" ? slug : "",
    ask: typeof ask === "string" ? ask : "",
  }
}

export async function loader({ request }: Route.LoaderArgs) {
  const reader = await signedInAs(REQUESTS_SITE, request)
  const signedIn = reader !== null
  const reached = reader === null ? null : await accountOfContributor(reader)
  const accountId = reached?.ok === true ? reached.account : null

  let navItems: ReadonlyArray<Record<string, unknown>> | null = null
  try {
    const result = await getPages({
      pageTypeSlug: "nav",
      where: [{ key: "app", eq: REQUESTS_APP }],
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
  const [boosting, setBoosting] = useState<Boosting | null>(null)
  const overrides = useMemo(() => ({ [FEATURE_REQUEST]: () => setProposing(true) }), [])

  useEffect(() => {
    registerActionVerb(featureRequestBoost.verbId, (ctx) => {
      setBoosting(boostingIn(ctx.data))
    })
  }, [])

  return (
    <AuthProvider reader={loaderData.reader} accountId={loaderData.accountId}>
      <AppEditingProvider editing={false}>
        <CreateOverrideProvider overrides={overrides}>
          <AppShell signedIn={loaderData.signedIn} ssrNavItems={loaderData.navItems}>
            <Outlet />
          </AppShell>
        </CreateOverrideProvider>
      </AppEditingProvider>
      <ProposeDialog
        open={proposing}
        onOpenChange={setProposing}
        postTo={REQUESTS_PATH}
        balance={loaderData.balance}
      />
      <BoostDialog
        boosting={boosting}
        onOpenChange={(open) => {
          if (!open) setBoosting(null)
        }}
        postTo={REQUESTS_PATH}
        balance={loaderData.balance}
      />
      <Toaster />
    </AuthProvider>
  )
}
