import { whereReadBy } from "akasha/alan/harness/web-page-answer/modules/reader-access/reader-access.module.code.ts"
import { textIn } from "akasha/code/type/narrowing/modules/text-in/text-in.module.code.ts"
import { slugOf } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  askingFor,
  readingFor,
} from "akasha/page/service/modules/page-calling/page-calling.module.code.ts"

const SEAT_PAGE_TYPE_SLUG = "seat"

const PERSON_PAGE_TYPE_SLUG = "person"

export type Refused = { readonly refused: string; readonly status: number }

export function refused(error: string, status: number): Response {
  return Response.json({ ok: false, error }, { status })
}

export async function senderOf(
  contributor: string
): Promise<string | { readonly refused: string }> {
  const people = await askingFor({
    pageTypeSlug: PERSON_PAGE_TYPE_SLUG,
    keys: ["slug", "contributor"],
  })
  if ("refused" in people) return { refused: people.refused }
  for (const row of people.rows) {
    const named = textIn(row.contributor)
    const slug = textIn(row.slug)
    if (named !== null && slug !== null && slugOf(named) === contributor) return slug
  }
  return { refused: "no person page names the contributor signed in" }
}

export async function seatSlugOf(from: string, id: string): Promise<string | Refused> {
  const held = await whereReadBy({ person: from }, SEAT_PAGE_TYPE_SLUG, { id: { is: id } })
  if ("refused" in held) return { refused: held.refused, status: 403 }
  const seats = await askingFor({
    pageTypeSlug: SEAT_PAGE_TYPE_SLUG,
    where: held.where,
    keys: ["slug"],
    limit: 1,
  })
  if ("refused" in seats) return { refused: seats.refused, status: 503 }
  const slug = textIn(seats.rows[0]?.slug)
  return slug ?? { refused: `no seat \`${from}\` may read has the id \`${id}\``, status: 404 }
}

export async function seatPathOf(slug: string): Promise<string | null> {
  const read = await readingFor({ pages: [{ pageTypeSlug: SEAT_PAGE_TYPE_SLUG, slug }] })
  return "refused" in read ? null : (read.bodies[0]?.path ?? null)
}
