import { everyRow, textAt } from "../page-query/page-query.module.code.ts"

const GREAT_COURSES_SUBJECT_SLUG = "great-courses-subject"

export async function findSubjectCollections(): Promise<Map<string, string>> {
  const subjectMap = new Map<string, string>()
  for (const row of await everyRow(GREAT_COURSES_SUBJECT_SLUG, ["slug", "title"])) {
    const title = textAt(row, "title")
    const slug = textAt(row, "slug")
    if (title != null && slug != null) subjectMap.set(title, slug)
  }
  return subjectMap
}
