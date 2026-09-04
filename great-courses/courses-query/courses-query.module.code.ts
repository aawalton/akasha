import { everyRow, textAt } from "../page-query/page-query.module.code.ts"

const GREAT_COURSE_SLUG = "great-course"

export async function findAllCourses(): Promise<Map<string, string>> {
  const courseMap = new Map<string, string>()
  for (const row of await everyRow(GREAT_COURSE_SLUG, ["slug", "externalId"])) {
    const externalId = textAt(row, "externalId")
    const slug = textAt(row, "slug")
    if (externalId != null && slug != null) courseMap.set(externalId, slug)
  }
  return courseMap
}
