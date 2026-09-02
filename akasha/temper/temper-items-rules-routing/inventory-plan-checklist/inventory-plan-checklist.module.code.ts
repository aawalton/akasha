import type {
  ManagementPlan,
  VenueStop,
} from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"

const HEADER = "[TemperInventory] Checklist"

function plural(count: number, word: string): string {
  return `${count} ${word}${count === 1 ? "" : "s"}`
}

function venueLine(venue: VenueStop): string {
  const parts: string[] = []
  for (const group of venue.actionGroups) parts.push(`${group.label} ${group.slotCount}`)
  const summary = parts.length > 0 ? ` — ${parts.join(", ")}` : ""
  return `    [ ] ${venue.label}${summary}`
}

export function formatPlanChecklist(plan: ManagementPlan): string {
  if (plan.sessions.length === 0) return `${HEADER}\n  (no actions pending)\n`

  const lines: string[] = [
    HEADER,
    `${plural(plan.sessions.length, "login")} · ${plural(plan.totalVenueVisits, "stop")} · ${plural(plan.totalSlots, "item")}`,
    "",
  ]
  let loginNumber = 0
  for (const session of plan.sessions) {
    loginNumber += 1
    const visitSuffix =
      session.visitNumber != null && session.visitNumber > 1
        ? ` (Visit ${session.visitNumber})`
        : ""
    lines.push(`[ ] ${loginNumber}. ${session.characterName}${visitSuffix}`)
    for (const venue of session.venues) lines.push(venueLine(venue))
  }
  return `${lines.join("\n")}\n`
}
