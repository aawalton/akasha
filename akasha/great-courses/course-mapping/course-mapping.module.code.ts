import type { Course, Subject } from "../course-types/course-types.module.code.ts"

export function mapCourseToSubjects(
  course: Course,
  subjects: readonly Subject[],
  subjectCollectionsMap: Map<string, string>,
  allGreatCoursesParentSlug: string
): readonly string[] {
  const parents: string[] = [allGreatCoursesParentSlug]

  for (const subject of subjects) {
    if (!subject.courses.some((c) => c.url === course.url)) continue

    const subjectCollectionName = `${subject.title} Great Courses`
    const subjectSlug = subjectCollectionsMap.get(subjectCollectionName)
    if (subjectSlug != null) parents.push(subjectSlug)
    else console.warn(`Subject collection not found: ${subjectCollectionName}`)
  }

  return parents
}
