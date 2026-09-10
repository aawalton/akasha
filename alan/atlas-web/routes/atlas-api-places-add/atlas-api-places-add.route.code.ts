import { buildPageHref, slugStem } from "@akasha/pages/url/page-href"
import { toPageTypeSlug } from "@akasha/pages/url/page-type-slug"
import { createPage } from "@akasha/pages-access/create"
import { getUser } from "akasha/alan/harness/supabase-rr/auth-server/auth-server.module.code.ts"
import { createServerClient } from "akasha/alan/harness/supabase-rr/server-client/server-client.module.code.ts"
import { placeCandidateSchema } from "../../place-candidate/place-candidate.module.code.ts"

const LOCATION_PAGE_TYPE_SLUG = "location"

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const { user, headers } = await getUser(request)
  if (!user) {
    return Response.json({ error: "Not authenticated" }, { status: 401, headers })
  }

  let rawBody: unknown
  try {
    rawBody = await request.json()
  } catch {
    return Response.json({ error: "invalid-json" }, { status: 400, headers })
  }
  const parsed = placeCandidateSchema.safeParse(rawBody)
  if (!parsed.success) {
    return Response.json({ error: "invalid-payload" }, { status: 400, headers })
  }
  const candidate = parsed.data

  const { headers: sbHeaders } = createServerClient(request)
  for (const [key, value] of sbHeaders) headers.append(key, value)

  const slug = slugStem(candidate.name)
  if (slug === "") {
    return Response.json({ error: "unnameable-place" }, { status: 400, headers })
  }

  const properties = {
    userId: user.id,
    title: candidate.name,
    slug,
    latitude: candidate.latitude,
    longitude: candidate.longitude,
    address: candidate.address,
    sourcePlaceId: candidate.sourcePlaceId,
    ...(candidate.category != null ? { category: candidate.category } : {}),
  }

  let pageId: string
  try {
    const page = await createPage({
      pageTypeSlug: LOCATION_PAGE_TYPE_SLUG,
      properties,
      select: ["id"],
    })
    pageId = typeof page.id === "string" ? page.id : ""
  } catch (err) {
    console.error("[atlas/web/api.places.add] createPage failed:", err)
    return Response.json({ error: "create-failed" }, { status: 500, headers })
  }

  const href = buildPageHref({
    pageTypeSlug: toPageTypeSlug(LOCATION_PAGE_TYPE_SLUG),
    slug,
    fallbackSlugSource: candidate.name,
    id: pageId,
  })
  return Response.json({ id: pageId, href }, { headers })
}
