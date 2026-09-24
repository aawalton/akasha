import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { AppShell } from "akasha/product/smilingjenny/web/modules/jenny-app-shell/jenny-app-shell.module.code.tsx"
import { JENNY_SITE } from "akasha/product/smilingjenny/web/modules/jenny-handover-site/jenny-handover-site.module.code.ts"
import { data, Outlet } from "react-router"
import type { Route } from "./+types/_app-layout"

export async function loader({ request }: Route.LoaderArgs) {
  return data({ signedIn: (await signedInAs(JENNY_SITE, request)) !== null })
}

export default function AppLayout({ loaderData }: Route.ComponentProps) {
  return (
    <AppShell signedIn={loaderData.signedIn}>
      <Outlet />
    </AppShell>
  )
}
