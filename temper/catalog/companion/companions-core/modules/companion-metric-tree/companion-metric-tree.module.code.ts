import type { Value } from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import {
  type CompanionBaseRoleId,
  companionBaseRoleAt,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-base-roles/companion-base-roles.module.code.ts"
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

type CompanionMetricGrouping = {
  readonly groups: readonly CompanionMetricGroup[]
  readonly roleGroups: readonly CompanionMetricGroup[]
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

const ROLE_GROUP = "companion-role-group"

const CATEGORY = "companion-category"

const METRIC: CompanionMetricNode["type"] = "metric"

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

function groupsOf(
  nodes: readonly Placed[],
  root: Placed,
  nodeType: string
): readonly CompanionMetricGroup[] {
  return placedUnder(nodes, root, nodeType).map((group) => ({
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

export function companionMetricGroupsOf(pages: Iterable<Value>): CompanionMetricGrouping {
  const nodes = [...pages].map(placedOf)
  const root = nodes.find((one) => one.nodeType === ROOT && one.parent === null)
  if (root === undefined) return { groups: [], roleGroups: [] }
  return { groups: groupsOf(nodes, root, GROUP), roleGroups: groupsOf(nodes, root, ROLE_GROUP) }
}

let held: CompanionMetricGrouping | null = null

export function holdCompanionMetricGroups(
  grouping: CompanionMetricGrouping
): CompanionMetricGrouping {
  held = grouping
  return grouping
}

function companionMetricGroups(): CompanionMetricGrouping {
  if (held === null) throw new CompanionMetricGroupsUnread()
  return held
}

function roleTotalsOf(roles: readonly CompanionBaseRoleId[]): readonly CompanionMetricNode[] {
  return roles.flatMap((role) => {
    const total = companionBaseRoleAt(role).totalMetricId
    return total === null ? [] : [{ type: METRIC, id: total }]
  })
}

export function getCompanionMetricTree(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionMetricGroup[] {
  const { groups, roleGroups } = companionMetricGroups()
  if (roles.length === 0) return groups
  const children = roleTotalsOf(roles)
  const played = roleGroups.map((group) => ({
    label: group.label,
    categories: group.categories.map((category) => ({ ...category, children })),
  }))
  return [...played, ...groups]
}
