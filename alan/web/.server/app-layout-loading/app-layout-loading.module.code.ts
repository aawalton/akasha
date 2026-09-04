import { getUser } from "@akasha/supabase-rr/auth-server"
import { data, type LoaderFunctionArgs } from "react-router"
import { unheld } from "../../pages-unheld/pages-unheld.module.code.ts"

const NAV_PAGE_TYPE_SLUG = "nav"

// THE SSR NAV HINT IS GONE, AND `null` IS WHAT THAT ALREADY MEANT HERE. This asked
// `@shared/pages-query` for this app's nav pages so the shell could paint its sidebar before
// hydration. `nav` is no page type the pages system service holds, so there is nothing to ask.
//
// `null` is not a fabricated absence at this one site: `AppShell` reads it as "no SSR hint" and
// falls through to its own client-side fetch, which is what it already did every time this query
// failed. So the shell degrades to painting its nav after hydration rather than before, and the
// reason it does is said out loud in the log rather than swallowed.
export async function loader({ request }: LoaderFunctionArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null
  if (user) {
    console.error(
      "[alanwalton-web/_app-layout] no SSR nav:",
      unheld(NAV_PAGE_TYPE_SLUG, "this app's nav items")
    )
  }
  return data({ user: userEnvelope, navItems: null }, { headers })
}
