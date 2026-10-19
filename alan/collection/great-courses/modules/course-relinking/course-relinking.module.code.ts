import {
  identitiesWith,
  identityFrom,
  idFrom,
  linkFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import type { Course } from "akasha/alan/collection/great-courses/modules/course-types/course-types.module.code.ts"
import {
  everyRowRead,
  textAt,
} from "akasha/alan/collection/great-courses/modules/page-query/page-query.module.code.ts"
import { writePages } from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"

const GREAT_COURSE_SLUG = "great-course"

const SOURCE = "the-great-courses"

const WRITER = "Great Courses sync <amy@alanwalton.com>"

type Held = { readonly values: Readonly<Record<string, unknown>> }

type Relinked = {
  readonly slug: string
  readonly externalIdentity: readonly { readonly source: string }[]
}

export function relinked(rows: readonly Held[], courses: readonly Course[]): readonly Relinked[] {
  const links = new Map(courses.map((course) => [course.externalId, course.url]))
  const due: Relinked[] = []
  for (const row of rows) {
    const slug = textAt(row, "slug")
    const held = row.values["externalIdentity"]
    const externalId = idFrom(held, SOURCE)
    if (slug == null || externalId == null) continue
    const link = links.get(externalId)
    if (link === undefined || link === linkFrom(held, SOURCE)) continue
    const fresh = { ...identityFrom(held, SOURCE), source: SOURCE, externalLink: link }
    due.push({ slug, externalIdentity: identitiesWith(held, fresh) })
  }
  return due
}

export async function relinkCourses(courses: readonly Course[]): Promise<number> {
  const { rows, read } = await everyRowRead(GREAT_COURSE_SLUG, ["slug", "externalIdentity"])
  const due = relinked(rows, courses)
  if (due.length === 0) return 0
  const written = await writePages(
    due.map((one) => ({
      pageTypeSlug: GREAT_COURSE_SLUG,
      slug: one.slug,
      values: { externalIdentity: one.externalIdentity },
      merge: true,
    })),
    WRITER,
    `point ${due.length} great course(s) at the link the catalogue gives now`,
    undefined,
    undefined,
    read ?? null
  )
  if (!written.ok)
    throw new Error(`${due.length} great course link(s) did not land: ${written.why}`)
  return due.length
}
