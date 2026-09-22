import {
  alanAccountId,
  alanContributor,
} from "akasha/alan/web/.server/alan-session-reader/alan-session-reader.module.code.ts"
import { ALANWALTON_APP } from "akasha/alan/web/modules/alan-app-id/alan-app-id.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { data, type LoaderFunctionArgs } from "react-router"

const NAV_PAGE_TYPE_SLUG = "nav"

const NAV_ITEM_LIMIT = 200
async function navItemsFor(): Promise<ReadonlyArray<Record<string, unknown>> | null> {
  try {
    const { rows } = await getPages({
      pageTypeSlug: NAV_PAGE_TYPE_SLUG,
      where: [{ key: "app", eq: ALANWALTON_APP }],
      limit: NAV_ITEM_LIMIT,
    })
    return rows
  } catch (err: unknown) {
    console.error("[alanwalton-web/_app-layout] the nav items went unread before the draw:", err)
    return null
  }
}

export async function loader({ request }: LoaderFunctionArgs) {
  const reader = await alanContributor(request)
  const accountId = reader === null ? null : await alanAccountId(reader)
  const navItems = reader === null ? null : await navItemsFor()
  return data({ reader, accountId, signedIn: reader !== null, navItems })
}
