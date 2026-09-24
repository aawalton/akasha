import type {
  Course,
  Subject,
} from "akasha/alan/collection/great-courses/modules/course-types/course-types.module.code.ts"
import { namedAs } from "akasha/page/modules/address/page-address.module.code.ts"

const COLLECTION_PAGE_TYPE = "great-courses-collection"

const SUBJECT_PAGE_TYPE = "great-courses-subject"

export function mapCourseToSubjects(
  course: Course,
  subjects: readonly Subject[],
  subjectCollectionsMap: Map<string, string>,
  allGreatCoursesParentSlug: string
): readonly string[] {
  const parents: string[] = [namedAs(COLLECTION_PAGE_TYPE, allGreatCoursesParentSlug, null)]

  for (const subject of subjects) {
    if (!subject.courses.some((c) => c.url === course.url)) continue

    const subjectCollectionName = `${subject.title} Great Courses`
    const subjectSlug = subjectCollectionsMap.get(subjectCollectionName)
    if (subjectSlug != null) parents.push(namedAs(SUBJECT_PAGE_TYPE, subjectSlug, null))
    else console.warn(`Subject collection not found: ${subjectCollectionName}`)
  }

  return parents
}
