import type { Course } from "../course-types/course-types.module.code.ts"
import {
  classifyError,
  logError,
  type SyncResult,
  safeUpdateResult,
  toError,
} from "../sync-outcome/sync-outcome.module.code.ts"

const GREAT_COURSE_SLUG = "great-course"

const NO_RENDER =
  "the store writes a path and a whole body, and nothing renders a `great-course` page's body out of the keys carried here, so this course cannot become a file. compose the body and land it with `writeFiles`, or create it through the akasha command line"

export async function createCourse(
  course: Course,
  _parents: readonly string[]
): Promise<SyncResult> {
  const err = toError(new Error(`\`${GREAT_COURSE_SLUG}\` did not land: ${NO_RENDER}`))
  logError("Course creation", course.title, err, classifyError(err))
  return safeUpdateResult(err)
}
