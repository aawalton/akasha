import { createPage } from "@akasha/pages-access/create"
import { buildPageHref, slugStem } from "@akasha/pages-url/page-href"
import { toPageTypeSlug } from "@akasha/pages-url/page-type-slug"
import { getUser } from "@akasha/supabase-rr/auth-server"
import { createServerClient } from "@akasha/supabase-rr/server-client"
import { placeCandidateSchema } from "../place-candidate/place-candidate.module.code.ts"
import type { Route } from "./+types/api.places.add"

const LOCATION_PAGE_TYPE_SLUG = "location"

export async function action({ request }: Route.ActionArgs): Promise<Response> {
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

  // A location stands in a file named for its slug, so the write has to state
  // one: `createPage` refuses a file page that names no path to stand at.
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
