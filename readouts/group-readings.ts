import { stoplightsInGroup } from "@akasha/readout-system/readout-group-serving"
import { readingHeldOn } from "@akasha/readout-system/readout-serving"

/**
 * Whether the lights a group draws carry readings, as against whether the group draws lights.
 *
 * A group can hold exactly the right number of lights and none of the readings. That is what
 * happened on 2026-09-02: `fbf73c4710` took `readouts/inbox-reading.ts` away as collateral while
 * severing another engine, `inbox-reading-service` failed every five minutes from 13:15, the
 * readings beside the three inbox pages went past `STALE_AFTER_MS`, and the strip went to three
 * black lights. Every check run over it passed. The count was three, the invariant pins three,
 * and the harness said five of five surfaces draw content. The shape was right and the substance
 * was gone, and a count is blind to exactly that.
 *
 * The reading is read through `readingHeldOn`, which is the reader the status bar hands in. The
 * relay reader is the wrong one to check with: it holds its readings in memory, so a fresh process
 * answers `none` for every light in every group and cannot tell a dark group from a lit one.
 */

/** A light with no figure behind it, and what the absence is. */
export interface UnreadLight {
  readonly label: string
  /** `none` where no reading was ever taken, `stale` where the reading is past its window. */
  readonly held: string
}

/**
 * The lights carrying no figure.
 *
 * Black alone is not the test. A reading that reaches no rung on its scale is drawn black and
 * carries its figure, and that is a true reading of a low number rather than a failure — two of
 * Alan's six upkeep lights stand that way with the readings healthy. What names a failure is the
 * empty figure, which `stoplightOf` writes only where the reading is not fresh.
 */
export function unreadIn(
  lights: readonly { readonly label: string; readonly reading: string; readonly readingHeld?: string }[]
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
    `${named}. The count is right and the readings are not, which no count can see. A reading ` +
    "stands beside its readout page and is written by that readout's own workstation service, so " +
    "a light that is `stale` or `none` is a service to look at rather than a page: ask " +
    "`systemctl --user status <name>-reading-service` before reading any page."
  )
}

/** Why any named group draws a light carrying no reading, or an empty list where none does. */
export async function groupsUnreadIn(groupSlugs: readonly string[]): Promise<readonly string[]> {
  const why: string[] = []
  for (const groupSlug of groupSlugs) {
    const lights = await stoplightsInGroup(groupSlug, "habit", (values) => readingHeldOn(values))
    const unread = unreadIn(lights)
    if (unread.length > 0) why.push(saidOf(groupSlug, unread, lights.length))
  }
  return why
}

/**
 * Refuses where a group draws a light carrying no reading.
 *
 * This throws rather than answering the darker strip, for the reason the divergence check throws:
 * a plausible strip is what nobody checks, and three black lights is a strip a person believes.
 */
export async function groupsCarryTheirReadings(
  groupSlugs: readonly string[]
): Promise<undefined> {
  const why = await groupsUnreadIn(groupSlugs)
  if (why.length > 0) {
    throw new Error(
      "groupsCarryTheirReadings: a group draws its full count of lights and some of them stand " +
        `for no reading, so the strip looks answered and is not — ${why.join(" | ")}`
    )
  }
  return undefined
}
