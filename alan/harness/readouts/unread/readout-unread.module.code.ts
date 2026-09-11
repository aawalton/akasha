import { stoplightsInGroup } from "akasha/alan/harness/readouts/group-serving/readout-group-serving.module.code.ts"
import { readingHeldOn } from "akasha/alan/harness/readouts/serving/readout-serving.module.code.ts"

export interface UnreadLight {
  readonly label: string
  readonly held: string
}

export function unreadIn(
  lights: readonly {
    readonly label: string
    readonly reading: string
    readonly readingHeld?: string
  }[]
): readonly UnreadLight[] {
  const unread: UnreadLight[] = []
  for (const one of lights) {
    if (one.reading !== "") continue
    unread.push({ label: one.label, held: one.readingHeld ?? "none" })
  }
  return unread
}

function saidOf(groupSlug: string, unread: readonly UnreadLight[], drawn: number): string {
  const named = unread.map((one) => `\`${one.label}\` (${one.held})`).join(", ")
  return (
    `\`${groupSlug}\` draws ${drawn} lights and ${unread.length} of them carry no reading — ` +
    `${named}. The count is right and the readings are not, which no count can see. A reading is ` +
    "kept beside its readout page and is written by the watch that takes it, so a light carrying " +
    "no reading is a watch to look at rather than a page: ask " +
    "`systemctl --user status day-readout-watch-service` before reading any page."
  )
}

export async function groupsUnreadIn(groupSlugs: readonly string[]): Promise<readonly string[]> {
  const why: string[] = []
  for (const groupSlug of groupSlugs) {
    const lights = await stoplightsInGroup(groupSlug, "habit", (values) => readingHeldOn(values))
    const unread = unreadIn(lights)
    if (unread.length > 0) why.push(saidOf(groupSlug, unread, lights.length))
  }
  return why
}

export async function groupsCarryTheirReadings(groupSlugs: readonly string[]): Promise<undefined> {
  const why = await groupsUnreadIn(groupSlugs)
  if (why.length > 0) {
    throw new Error(
      "groupsCarryTheirReadings: a group draws its full count of lights and some of them carry " +
        `no reading, so the strip looks answered and is not — ${why.join(" | ")}`
    )
  }
  return undefined
}
