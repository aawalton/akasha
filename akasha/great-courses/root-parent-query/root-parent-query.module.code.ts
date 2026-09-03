import { pageTitled, textAt } from "../page-query/page-query.module.code.ts"
import { classifyError, logError, toError } from "../sync-outcome/sync-outcome.module.code.ts"

const GREAT_COURSES_COLLECTION_SLUG = "great-courses-collection"
const ROOT_TIMER_TITLE = "The Great Courses"
const SYNC_INTERVAL_DAYS = 30

function todayYYYYMMDD(): string {
  return daysAgoYYYYMMDD(0)
}

function daysAgoYYYYMMDD(days: number): string {
  const now = new Date()
  now.setUTCDate(now.getUTCDate() - days)
  const y = now.getUTCFullYear()
  const m = String(now.getUTCMonth() + 1).padStart(2, "0")
  const d = String(now.getUTCDate()).padStart(2, "0")
  return `${y}-${m}-${d}`
}

export async function shouldRunGreatCoursesSync(): Promise<boolean> {
  try {
    const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, ["lastSyncedAt"])
    if (root === null) {
      console.log(`${ROOT_TIMER_TITLE} root not found, running sync anyway`)
      return true
    }

    const lastSyncedAt = textAt(root, "lastSyncedAt")
    if (lastSyncedAt == null) return true

    const shouldRun = lastSyncedAt < daysAgoYYYYMMDD(SYNC_INTERVAL_DAYS)
    if (!shouldRun) {
      console.log(`Great Courses: Last synced ${lastSyncedAt} (within ${SYNC_INTERVAL_DAYS} days)`)
    }
    return shouldRun
  } catch (thrown) {
    const err = toError(thrown)
    logError("Root parent query", "shouldRunGreatCoursesSync", err, classifyError(err))
    throw new Error(
      `whether the Great Courses sync is due went unread, so it is neither due nor not due and ` +
        `nothing may be decided against it: ${err.message}`
    )
  }
}

const NO_RENDER =
  "the store writes a path and a whole body, and nothing renders a `great-courses-collection` page's body out of its keys, so `lastSyncedAt` cannot be set here. land the page's whole body with `patchFiles`, or set it through the akasha command line"

export async function updateRootParentLastSyncedAt(): Promise<boolean> {
  const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, [])
  const slug = root === null ? null : textAt(root, "slug")
  if (slug == null) {
    console.warn(`${ROOT_TIMER_TITLE} root not found, so nothing recorded when it last synced`)
    return false
  }
  const err = toError(
    new Error(`\`${GREAT_COURSES_COLLECTION_SLUG}/${slug}\` kept ${todayYYYYMMDD()}: ${NO_RENDER}`)
  )
  logError("Root parent update", "updateRootParentLastSyncedAt", err, classifyError(err))
  return false
}
