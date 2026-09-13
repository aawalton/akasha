import { idFrom } from "akasha/alan/collections/externals/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  everyRow,
  textAt,
} from "akasha/alan/collections/great-courses/modules/page-query/page-query.module.code.ts"

const GREAT_COURSE_SLUG = "great-course"

const SOURCE = "the-great-courses"

export async function findAllCourses(): Promise<Map<string, string>> {
  const courseMap = new Map<string, string>()
  const keys = ["slug", "externalId", "externalIdentity"]
  for (const row of await everyRow(GREAT_COURSE_SLUG, keys)) {
    const externalId = idFrom(row.values["externalIdentity"], SOURCE) ?? textAt(row, "externalId")
    const slug = textAt(row, "slug")
    if (externalId != null && slug != null) courseMap.set(externalId, slug)
  }
  return courseMap
}
