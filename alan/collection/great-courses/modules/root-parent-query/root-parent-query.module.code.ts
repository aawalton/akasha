import {
  identitiesWith,
  idFrom,
  linkFrom,
  syncedFrom,
} from "akasha/alan/collection/external/modules/external-identity-reading/external-identity-reading.module.code.ts"
import {
  pageTitled,
  textAt,
} from "akasha/alan/collection/great-courses/modules/page-query/page-query.module.code.ts"
import {
  classifyError,
  logError,
  toError,
} from "akasha/alan/collection/great-courses/modules/sync-outcome/sync-outcome.module.code.ts"
import { writePages } from "akasha/page/query/modules/store-writing/store-writing.module.code.ts"
import {
  daysAgoYYYYMMDD,
  todayYYYYMMDD,
} from "akasha/text/writing/modules/today/today.module.code.ts"

const GREAT_COURSES_COLLECTION_SLUG = "great-courses-collection"
const ROOT_TIMER_TITLE = "The Great Courses"
const SYNC_INTERVAL_DAYS = 30
const SOURCE = "the-great-courses"

export async function shouldRunGreatCoursesSync(): Promise<boolean> {
  try {
    const keys = ["externalIdentity"]
    const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, keys)
    if (root === null) {
      console.log(`${ROOT_TIMER_TITLE} root not found, running sync anyway`)
      return true
    }

    const held = root.values["externalIdentity"]
    const lastSyncedAt = syncedFrom(held, SOURCE)
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

const WRITER = "Great Courses sync <amy@alanwalton.com>"

export async function updateRootParentLastSyncedAt(): Promise<boolean> {
  const root = await pageTitled(GREAT_COURSES_COLLECTION_SLUG, ROOT_TIMER_TITLE, [
    "externalIdentity",
  ])
  const slug = root === null ? null : textAt(root, "slug")
  if (root === null || slug == null) {
    console.warn(`${ROOT_TIMER_TITLE} root not found, so nothing recorded when it last synced`)
    return false
  }
  const held = root.values["externalIdentity"]
  const externalId = idFrom(held, SOURCE)
  const externalLink = linkFrom(held, SOURCE)
  const fresh = {
    source: SOURCE,
    ...(externalId === null ? {} : { externalId }),
    ...(externalLink === null ? {} : { externalLink }),
    lastSyncedAt: todayYYYYMMDD(),
  }
  const written = await writePages(
    [
      {
        pageTypeSlug: GREAT_COURSES_COLLECTION_SLUG,
        slug,
        values: { externalIdentity: identitiesWith(held, fresh) },
        merge: true,
      },
    ],
    WRITER,
    `record the day the Great Courses catalogue was last read`,
    undefined,
    undefined,
    root.read ?? null
  )
  if (written.ok) return true
  const err = toError(
    new Error(
      `\`${GREAT_COURSES_COLLECTION_SLUG}/${slug}\` kept no sync day of ${todayYYYYMMDD()}: ${written.why}`
    )
  )
  logError("Root parent update", "updateRootParentLastSyncedAt", err, classifyError(err))
  return false
}
