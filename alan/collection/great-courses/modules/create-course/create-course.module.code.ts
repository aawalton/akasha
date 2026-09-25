import { extractExternalIdFromUrl } from "akasha/alan/collection/great-courses/modules/catalogue/catalogue.module.code.ts"
import type { Course } from "akasha/alan/collection/great-courses/modules/course-types/course-types.module.code.ts"
import {
  classifyError,
  logError,
  type SyncResult,
  safeUpdateResult,
  toError,
} from "akasha/alan/collection/great-courses/modules/sync-outcome/sync-outcome.module.code.ts"
import {
  pageStem,
  STEM_CEILING,
} from "akasha/page/naming/named-for/modules/page-stem/page-stem.module.code.ts"
import { writePages } from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"

const GREAT_COURSE_SLUG = "great-course"

const SOURCE = "the-great-courses"

const WRITER = "Great Courses sync <amy@alanwalton.com>"

const TRAILING_DASHES = /-+$/

function externalIdOf(course: Course): string {
  return course.externalId !== "" ? course.externalId : extractExternalIdFromUrl(course.url)
}

function slugFor(externalId: string, title: string): string {
  const stem = pageStem(externalId === "" ? title : externalId)
  if (stem.length <= STEM_CEILING) return stem
  return stem.slice(0, STEM_CEILING).replace(TRAILING_DASHES, "")
}

function refusedFor(course: Course, why: string): SyncResult {
  const err = toError(new Error(`\`${GREAT_COURSE_SLUG}\` did not land: ${why}`))
  logError("Course creation", course.title, err, classifyError(err))
  return safeUpdateResult(err)
}

export async function createCourse(
  course: Course,
  parents: readonly string[]
): Promise<SyncResult> {
  const externalId = externalIdOf(course)
  const slug = slugFor(externalId, course.title)
  if (slug === "") {
    return refusedFor(course, `"${course.title}" gives no name a page can be filed under`)
  }
  const written = await writePages(
    [
      {
        pageTypeSlug: GREAT_COURSE_SLUG,
        slug,
        fresh: true,
        values: {
          title: course.title,
          partOfCollections: [...parents],
          externalIdentity: [{ source: SOURCE, externalId, externalLink: course.url }],
        },
      },
    ],
    WRITER,
    `file ${course.title} as a great course`
  )
  if (!written.ok) return refusedFor(course, written.why)
  return { created: 1, updated: 0, skipped: 0, failed: 0 }
}
