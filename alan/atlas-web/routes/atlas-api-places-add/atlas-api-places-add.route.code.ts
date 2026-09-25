import { ATLAS_SITE } from "akasha/alan/atlas-web/modules/atlas-handover-site/atlas-handover-site.module.code.ts"
import { placeCandidateSchema } from "akasha/alan/atlas-web/modules/place-candidate/place-candidate.module.code.ts"
import { signedInAs } from "akasha/alan/harness/handover-rr/modules/handover-session/handover-session.module.code.ts"
import { createPage } from "akasha/page/access/modules/create/create.module.code.ts"
import { getPages } from "akasha/page/access/modules/get/get.module.code.ts"
import { buildPageHref, slugStem } from "akasha/page/url/modules/page-href/page-href.module.code.ts"
import { toPageTypeSlug } from "akasha/page/url/modules/page-type-slug/page-type-slug.module.code.ts"
import { accountOfContributor } from "akasha/person/modules/enrolment/person-enrolment.module.code.ts"

const LOCATION_PAGE_TYPE_SLUG = "location"

async function slugTaken(slug: string): Promise<boolean> {
  const { rows } = await getPages({
    pageTypeSlug: LOCATION_PAGE_TYPE_SLUG,
    where: [{ key: "slug", eq: slug }],
    select: ["id"],
    limit: 1,
  })
  return rows.length > 0
}

async function freeSlug(stem: string): Promise<string> {
  if (!(await slugTaken(stem))) return stem
  for (let n = 2; ; n += 1) {
    const candidate = `${stem}-${n}`
    if (!(await slugTaken(candidate))) return candidate
  }
}

export async function action({ request }: { request: Request }): Promise<Response> {
  if (request.method !== "POST") {
    return Response.json({ error: "method-not-allowed" }, { status: 405 })
  }

  const headers = new Headers()
  const reader = await signedInAs(ATLAS_SITE, request)
  if (reader === null) {
    return Response.json({ error: "Not authenticated" }, { status: 401, headers })
  }
  const reached = await accountOfContributor(reader)
  if (!reached.ok || reached.account === null) {
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

  const stem = slugStem(candidate.name)
  if (stem === "") {
    return Response.json({ error: "unnameable-place" }, { status: 400, headers })
  }

  const { rows: already } = await getPages({
    pageTypeSlug: LOCATION_PAGE_TYPE_SLUG,
    where: [{ key: "sourcePlaceId", eq: candidate.sourcePlaceId }],
    select: ["id", "slug"],
    limit: 1,
  })
  const held = already[0]
  if (held !== undefined && typeof held.id === "string") {
    const href = buildPageHref({
      pageTypeSlug: toPageTypeSlug(LOCATION_PAGE_TYPE_SLUG),
      slug: typeof held.slug === "string" ? held.slug : stem,
      fallbackSlugSource: candidate.name,
      id: held.id,
    })
    return Response.json({ id: held.id, href }, { headers })
  }
  const slug = await freeSlug(stem)

  const properties = {
    userId: reached.account,
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
