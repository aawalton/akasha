import { type ReadoutCatalog, readoutCatalog } from "./readout-catalog.ts"

/**
 * What a readout group's page names against what the readout pages themselves answer.
 *
 * The points a persona earns for a day are a mean: the color floors of every light in the upkeep,
 * inboxes and values groups, divided by how many lights those groups hold. So the membership of a
 * group is arithmetic rather than decoration, and a member that quietly stops being a member makes
 * the day score out of a smaller count.
 *
 * Membership is otherwise read in one direction only — every readout row is scanned for one naming
 * the group — and that direction cannot tell a member removed from a member that never existed. A
 * readout page deleted from under a group leaves nothing behind to notice. The group page names
 * what it expects under `sequence-slugs`, so the two sides are compared here.
 */
export interface GroupMembership {
  readonly groupSlug: string
  /** What the group page names under `sequence-slugs`. */
  readonly named: readonly string[]
  /** Named members no readout page answers to at all. */
  readonly absent: readonly string[]
  /** Members the readout pages name for this group that the group page does not name. */
  readonly unnamed: readonly string[]
  /** Members that would be drawn, being held and not marked `enabled: false`. */
  readonly drawn: readonly string[]
  /** Members held but marked `enabled: false`, which are meant to be missing. */
  readonly stilled: readonly string[]
}

export function membershipOf(groupSlug: string, catalog: ReadoutCatalog): GroupMembership {
  const named = catalog.groupMemberSlugs.get(groupSlug) ?? []
  const absent: string[] = []
  const drawn: string[] = []
  const stilled: string[] = []
  for (const slug of named) {
    const row = catalog.readouts.get(slug)
    if (row === undefined) absent.push(slug)
    else if (row.enabled) drawn.push(slug)
    else stilled.push(slug)
  }
  const namedHere = new Set(named)
  const unnamed: string[] = []
  for (const [slug, row] of catalog.readouts) {
    if (!(row.groupSlugs ?? []).includes(groupSlug)) continue
    if (!namedHere.has(slug)) unnamed.push(slug)
  }
  return { groupSlug, named, absent, unnamed, drawn: drawn.sort(), stilled, }
}

/**
 * Why a group's membership is not the membership its page names, or an empty list where it is.
 *
 * A member marked `enabled: false` is no shortfall. Alan ruled that an ablated readout's page
 * remains and is marked rather than deleted, so a page still standing and stilled is the shape a
 * finished ablation leaves. A named member with no page at all is the shape an unfinished one
 * leaves, and it is the one that moves the arithmetic without saying so.
 */
export function membershipShortfall(held: GroupMembership): readonly string[] {
  const why: string[] = []
  if (held.absent.length > 0) {
    why.push(
      `\`${held.groupSlug}\` names ${held.absent.map((one) => `\`${one}\``).join(", ")} under ` +
        "`sequence-slugs` and no readout page answers to them, so the group holds " +
        `${held.drawn.length} lights where its page names ${held.named.length}`
    )
  }
  if (held.unnamed.length > 0) {
    why.push(
      `\`${held.groupSlug}\` is named by ${held.unnamed.map((one) => `\`${one}\``).join(", ")}, ` +
        "which the group page does not name under `sequence-slugs`, so the group holds a light " +
        "nothing states it holds"
    )
  }
  if (held.drawn.length === 0) {
    why.push(
      `\`${held.groupSlug}\` draws no light at all, and a group scored out of zero lights adds ` +
        "nothing to the count a day is divided by while every other group goes on adding to it"
    )
  }
  return why
}

/**
 * The reasons every named group's membership is not what its page names.
 *
 * Handed the groups a day is scored out of, this answers what a caller refuses on.
 */
export function groupsShortOf(
  groupSlugs: readonly string[],
  catalog: ReadoutCatalog = readoutCatalog()
): readonly string[] {
  return groupSlugs.flatMap((slug) => membershipShortfall(membershipOf(slug, catalog)))
}

/**
 * Refuses where any named group's membership is not the membership its page names.
 *
 * The caller is the arithmetic rather than a display, so this throws rather than answering a
 * shortened list: a smaller count divided into a smaller sum is a plausible number, and a
 * plausible number is what nobody checks.
 */
export function groupsAsNamed(
  groupSlugs: readonly string[],
  catalog: ReadoutCatalog = readoutCatalog()
): undefined {
  const why = groupsShortOf(groupSlugs, catalog)
  if (why.length > 0) {
    throw new Error(
      "groupsAsNamed: a readout group holds a membership its own page does not name, and the " +
        "day is scored out of the lights its groups hold, so carrying on would divide by a " +
        `count nothing states — ${why.join(" | ")}`
    )
  }
  return undefined
}
