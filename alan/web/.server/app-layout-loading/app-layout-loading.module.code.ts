import { getPages } from "@akasha/pages-access/get"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { data, type LoaderFunctionArgs } from "react-router"
import { ALANWALTON_APP_SLUG } from "../../alan-app-id/alan-app-id.module.code.ts"

const NAV_PAGE_TYPE_SLUG = "nav"

const NAV_ITEM_LIMIT = 200
async function navItemsFor(): Promise<ReadonlyArray<Record<string, unknown>> | null> {
  try {
    const { rows } = await getPages({
      pageTypeSlug: NAV_PAGE_TYPE_SLUG,
      where: [{ key: "appSlug", eq: ALANWALTON_APP_SLUG }],
      limit: NAV_ITEM_LIMIT,
    })
    return rows
  } catch (err: unknown) {
    console.error("[alanwalton-web/_app-layout] the nav items went unread before the draw:", err)
    return null
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const { user, headers } = await getUser(request)
  const userEnvelope = user ? { id: user.id, email: user.email ?? undefined } : null
  const navItems = user === null ? null : await navItemsFor()
  return data({ user: userEnvelope, navItems }, { headers })
}
