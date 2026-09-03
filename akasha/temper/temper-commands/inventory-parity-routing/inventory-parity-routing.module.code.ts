import type { InventoryItemData } from "@akasha/temper-items-core/inventory-types"
import {
  narrowDestination,
  parseItemAction,
} from "@akasha/temper-items-rules-core/inventory-destination-parse"
import type { AffectedItem } from "@akasha/temper-items-rules-core/inventory-rule-matcher-types"
import type {
  ItemAction,
  MoveToDestination,
} from "@akasha/temper-items-rules-core/inventory-rule-types"
import { resolveItemRoute } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-route"
import type { RouteStep } from "@akasha/temper-items-rules-routing-core/inventory-management-plan-types"

export interface MatchedRoute {
  readonly action: ItemAction
  readonly destination: MoveToDestination | undefined
}

const OPERATION_WIDTH = 8

const FIRST_BAG = 1

export function matchedRouteFrom(
  action: string | undefined,
  destination: string | null | undefined
): MatchedRoute | undefined {
  const parsed = parseItemAction(action)
  if (parsed === undefined) return undefined
  const dest =
    destination == null || destination === "" ? undefined : narrowDestination(destination)
  return { action: parsed, destination: dest }
}

export function resolveWebRoute(
  match: MatchedRoute,
  sourceCharId: string,
  item: InventoryItemData
): readonly RouteStep[] {
  const entry: AffectedItem = {
    item,
    locationKey: sourceCharId,
    locationDisplayName: `Char ${sourceCharId}`,
    bagId: FIRST_BAG,
    alreadyAtDestination: false,
  }
  return resolveItemRoute(entry, match.action, match.destination, null)
}

export function renderRouteStep(step: RouteStep): string {
  const venue = step.venueDetail !== undefined ? `${step.venue}/${step.venueDetail}` : step.venue
  return `${step.operation.padEnd(OPERATION_WIDTH)} char:${step.characterId}  ${venue}`
}

function routeSignature(steps: readonly RouteStep[]): string {
  return steps.map((one) => `${one.operation}@${one.characterId}/${one.venue}`).join(" -> ")
}

function isParameterizedDestination(dest: MoveToDestination | undefined): boolean {
  return dest?.endsWith(":by-priority") === true
}

export interface RoutingDiff {
  readonly webRoute: readonly string[]
  readonly addonMatch: string | undefined
  readonly webMatch: string | undefined
  readonly mismatch: boolean
  readonly note: string | undefined
}

function renderMatch(match: MatchedRoute | undefined): string | undefined {
  if (match === undefined) return undefined
  return match.destination === undefined ? match.action : `${match.action} → ${match.destination}`
}

export function computeRoutingDiff(
  sourceCharId: string,
  item: InventoryItemData,
  webMatch: MatchedRoute | undefined,
  addonMatch: MatchedRoute | undefined
): RoutingDiff {
  const routeBasis = webMatch ?? addonMatch
  const webSteps = routeBasis === undefined ? [] : resolveWebRoute(routeBasis, sourceCharId, item)
  const webRoute = webSteps.map(renderRouteStep)

  let mismatch = false
  let note: string | undefined
  if (webMatch !== undefined && addonMatch !== undefined) {
    if (
      isParameterizedDestination(addonMatch.destination) ||
      isParameterizedDestination(webMatch.destination)
    ) {
      note = `addon destination ${addonMatch.destination ?? "(none)"} is resolved per-priority at runtime — not comparable offline`
    } else {
      const webSig = routeSignature(webSteps)
      const addonSig = routeSignature(resolveWebRoute(addonMatch, sourceCharId, item))
      mismatch = webSig !== addonSig
    }
  } else if (addonMatch === undefined && webMatch !== undefined) {
    note = "addon match/destination not captured in trace — web route shown as informational"
  } else if (addonMatch !== undefined && webMatch === undefined) {
    note = "web walk produced no match — addon's matched route shown as informational"
  } else {
    note = "no match on either side — no route to resolve"
  }

  return {
    webRoute,
    addonMatch: renderMatch(addonMatch),
    webMatch: renderMatch(webMatch),
    mismatch,
    note,
  }
}

export function renderRoutingSection(diff: RoutingDiff): string {
  const lines: string[] = ["ROUTING DIFF"]
  if (diff.addonMatch !== undefined || diff.webMatch !== undefined) {
    lines.push(`  matched  web=${diff.webMatch ?? "(none)"}  addon=${diff.addonMatch ?? "(none)"}`)
  }
  if (diff.webRoute.length === 0) {
    lines.push("  (no route)")
  } else {
    lines.push("  web route:")
    for (const row of diff.webRoute) lines.push(`    ${row}`)
  }
  if (diff.mismatch) {
    lines.push("  SKEW: addon matched destination implies a different route than web")
  }
  if (diff.note !== undefined) {
    lines.push(`  note: ${diff.note}`)
  }
  return lines.join("\n")
}
