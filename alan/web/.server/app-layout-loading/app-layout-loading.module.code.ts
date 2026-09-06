import { getPages } from "@akasha/pages-access/get"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { data, type LoaderFunctionArgs } from "react-router"
import { ALANWALTON_APP_SLUG } from "../../alan-app-id/alan-app-id.module.code.ts"

const NAV_PAGE_TYPE_SLUG = "nav"

const NAV_ITEM_LIMIT = 200

// THE SIDEBAR IS PAINTED BEFORE THE BROWSER ASKS FOR IT. The shell reads these rows as its first
// nav items and falls through to its own fetch once that answers, so a reader sees the navigation
// on the first frame rather than after hydration.
//
// A NAV ITEM NAMES ITS APP BY SLUG. The `nav` page type declares `appSlug` and no key holding an
// app's id, and a key a page type declares nothing for is refused rather than left out.
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
