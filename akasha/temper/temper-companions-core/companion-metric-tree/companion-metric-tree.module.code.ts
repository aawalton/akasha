import type { CompanionBaseRoleId } from "../companion-base-roles/companion-base-roles.module.code.ts"
import type { CompanionMetricId } from "../companion-metric-ids/companion-metric-ids.module.code.ts"

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

const ROLE_TOTAL_METRICS: Record<CompanionBaseRoleId, CompanionMetricId> = {
  dps: "companion-dps-total",
  healer: "companion-hps-total",
  tank: "companion-tps-total",
  support: "companion-support-score",
}

const COMPANION_METRIC_GROUPS: CompanionMetricGroup[] = [
  {
    label: "Damage",
    categories: [
      {
        headerMetricId: "companion-dps-total",
        children: [
          { type: "metric", id: "companion-dps-direct" },
          { type: "metric", id: "companion-dps-dot" },
          { type: "metric", id: "companion-dps-single-target" },
          { type: "metric", id: "companion-dps-aoe" },
        ],
      },
      {
        headerMetricId: "companion-effective-damage",
        children: [
          { type: "metric", id: "companion-weapon-damage" },
          { type: "metric", id: "companion-damage-done" },
          { type: "metric", id: "companion-critical-chance" },
          { type: "metric", id: "companion-critical-damage" },
          { type: "metric", id: "companion-target-armor" },
          { type: "metric", id: "companion-penetration" },
          { type: "metric", id: "companion-target-remaining-armor" },
        ],
      },
    ],
  },
  {
    label: "Toughness",
    categories: [
      {
        headerMetricId: "companion-tps-total",
        children: [
          { type: "metric", id: "companion-tps-buff" },
          { type: "metric", id: "companion-tps-self-hps" },
          { type: "metric", id: "companion-tps-shield" },
        ],
      },
      {
        headerMetricId: "companion-effective-toughness",
        children: [
          { type: "metric", id: "companion-health-maximum" },
          { type: "metric", id: "companion-armor" },
          { type: "metric", id: "companion-damage-taken" },
        ],
      },
      {
        headerMetricId: "companion-damage-blocked",
        children: [],
      },
    ],
  },
  {
    label: "Healing",
    categories: [
      {
        headerMetricId: "companion-hps-total",
        children: [
          { type: "metric", id: "companion-hps-direct" },
          { type: "metric", id: "companion-hps-hot" },
          { type: "metric", id: "companion-hps-shield" },
        ],
      },
      {
        headerMetricId: "companion-sps-total",
        children: [
          { type: "metric", id: "companion-sps-self" },
          { type: "metric", id: "companion-sps-ally" },
        ],
      },
      {
        headerMetricId: "companion-effective-healing",
        children: [
          { type: "metric", id: "companion-healing-done" },
          { type: "metric", id: "companion-critical-chance" },
          { type: "metric", id: "companion-critical-healing" },
          { type: "metric", id: "companion-healing-received" },
          { type: "metric", id: "companion-health-recovery" },
        ],
      },
    ],
  },
  {
    label: "Utility",
    categories: [
      {
        headerMetricId: "companion-ability-cooldown",
        children: [
          { type: "metric", id: "companion-buff-duration" },
          { type: "metric", id: "companion-ultimate-generation" },
          { type: "metric", id: "companion-break-free-cooldown" },
          { type: "metric", id: "companion-roll-dodge-cooldown" },
        ],
      },
      {
        headerMetricId: "companion-support-score",
        children: [
          { type: "metric", id: "companion-support-dps" },
          { type: "metric", id: "companion-support-tps" },
        ],
      },
    ],
  },
]

export function getCompanionMetricTree(
  roles: readonly CompanionBaseRoleId[]
): readonly CompanionMetricGroup[] {
  if (roles.length === 0) return COMPANION_METRIC_GROUPS

  const children: CompanionMetricNode[] = roles
    .filter((role) => role in ROLE_TOTAL_METRICS)
    .map((role) => ({ type: "metric" as const, id: ROLE_TOTAL_METRICS[role] }))

  const overallGroup: CompanionMetricGroup = {
    label: "Overall",
    categories: [
      {
        headerMetricId: "companion-score",
        children,
      },
    ],
  }

  return [overallGroup, ...COMPANION_METRIC_GROUPS]
}
