import type { PageAccessClient } from "akasha/alan/track/daily/modules/day-narrow-types/day-narrow-types.module.code.ts"
import { landDayPage } from "akasha/alan/track/daily/modules/day-place/day-place.module.code.ts"
import { dayByDate } from "akasha/alan/track/daily/modules/day-reading/day-reading.module.code.ts"
import { operationalError } from "akasha/code/error/errors-core/modules/exit-code/exit-code.module.code.ts"

const TRACKING_WRITER = "tracking"

const DAILY_TRACKING_VERSION = "3.0"

export async function resolveOrCreateDaily(
  _sb: PageAccessClient,
  dayStr: string
): Promise<{ readonly id: string; readonly created: boolean }> {
  const held = await dayByDate(dayStr)
  if (held !== null && held.id !== "") return { id: held.id, created: false }

  const id = Bun.randomUUIDv7()
  const landed = await landDayPage(
    "patch",
    dayStr,
    { id, title: `@date:${dayStr}`, date: dayStr, version: DAILY_TRACKING_VERSION },
    TRACKING_WRITER
  )
  if (!landed.ok) {
    throw operationalError(`the day ${dayStr} did not land as a file: ${landed.why}`)
  }
  return { id, created: true }
}
