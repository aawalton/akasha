import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import type { CompanionBaseRoleId } from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionMetricId } from "akasha/temper/catalog/companion/companions-core/modules/companion-metric-ids/companion-metric-ids.module.code.ts"

interface CompanionMetricNode {
  type: "metric"
  id: CompanionMetricId
  useAccentColor?: boolean
}

interface CompanionCategoryNode {
  headerMetricId: CompanionMetricId
  children: readonly CompanionMetricNode[]
}

export interface CompanionMetricGroup {
  label: string
  categories: readonly CompanionCategoryNode[]
}

type Placed = {
  readonly slug: string
  readonly nodeId: string
  readonly nodeType: string
  readonly label: string
  readonly parent: string | null
  readonly displayOrder: number
}

const PARENT = "temper-metric-tree/"

const ROOT = "companion"

const GROUP = "companion-group"

const CATEGORY = "companion-category"

const METRIC = "metric"

const ROLE_TOTAL_METRICS: Record<CompanionBaseRoleId, CompanionMetricId> = {
  dps: "companion-dps-total",
  healer: "companion-hps-total",
  tank: "companion-tps-total",
  support: "companion-support-score",
}

const UNREAD =
  "the companion stat groups are read from pages, and nothing has read them yet — gate the screen on `MetricCatalogGate`, or hold them before the work starts"

class CompanionMetricGroupsUnread extends Error {
  constructor() {
    super(UNREAD)
    this.name = "CompanionMetricGroupsUnread"
  }
}

function placedOf(value: Value): Placed {
  const nodeId = String(value.nodeId)
  return {
    slug: String(value.slug),
    nodeId,
    nodeType: String(value.nodeType),
    label: typeof value.title === "string" ? value.title : nodeId,
    parent: typeof value.parent === "string" ? value.parent : null,
    displayOrder: typeof value.displayOrder === "number" ? value.displayOrder : 0,
  }
}

function placedUnder(nodes: readonly Placed[], above: Placed, nodeType: string): readonly Placed[] {
  return nodes
    .filter((one) => one.parent === `${PARENT}${above.slug}` && one.nodeType === nodeType)
    .sort((one, two) => one.displayOrder - two.displayOrder)
}

export function companionMetricGroupsOf(pages: Iterable<Value>): readonly CompanionMetricGroup[] {
  const nodes = [...pages].map(placedOf)
  const root = nodes.find((one) => one.nodeType === ROOT && one.parent === null)
  if (root === undefined) return []
  return placedUnder(nodes, root, GROUP).map((group) => ({
    label: group.label,
    categories: placedUnder(nodes, group, CATEGORY).map((category) => ({
      headerMetricId: category.nodeId as CompanionMetricId,
      children: placedUnder(nodes, category, METRIC).map((one) => ({
        type: METRIC,
        id: one.nodeId as CompanionMetricId,
      })),
    })),
  }))
}

let held: readonly CompanionMetricGroup[] | null = null

export function holdCompanionMetricGroups(
  groups: readonly CompanionMetricGroup[]
): readonly CompanionMetricGroup[] {
  held = groups
  return groups
}

function companionMetricGroups(): readonly CompanionMetricGroup[] {
  if (held === null) throw new CompanionMetricGroupsUnread()
  return held
}

export function getCompanionMetricTree(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionMetricGroup[] {
  const groups = companionMetricGroups()
  if (roles.length === 0) return groups

  const children: CompanionMetricNode[] = roles
    .filter((role) => role in ROLE_TOTAL_METRICS)
    .map((role) => ({ type: METRIC, id: ROLE_TOTAL_METRICS[role] }))

  const overallGroup: CompanionMetricGroup = {
    label: "Overall",
    categories: [
      {
        headerMetricId: "companion-score",
        children,
      },
    ],
  }

  return [overallGroup, ...groups]
}
