import type { CompanionMetricTemplate } from "../companion-metric-template/companion-metric-template.module.code.ts"

export const COMPANION_METRICS_00 = {
  "companion-ability-cooldown": {
    id: "companion-ability-cooldown",
    name: "Cooldown",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-armor": {
    id: "companion-armor",
    name: "Armor",
    valueType: "rating",
    divisor: 50000,
    cap: 0.5,
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", metricId: "companion-armor", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", metricId: "companion-armor", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "companion-break-free-cooldown": {
    id: "companion-break-free-cooldown",
    name: "Break Free CD",
    valueType: "integer",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", metricId: "companion-break-free-cooldown", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              metricId: "companion-break-free-cooldown",
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
  },
  "companion-buff-duration": {
    id: "companion-buff-duration",
    name: "Buff Duration",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-critical-chance": {
    id: "companion-critical-chance",
    name: "Critical Chance",
    valueType: "rating",
    effectType: "integer",
    divisor: 15000,
    cap: 1,
    ratingFloorIncrement: 0.05,
  },
  "companion-critical-damage": {
    id: "companion-critical-damage",
    name: "Critical Damage",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-critical-healing": {
    id: "companion-critical-healing",
    name: "Critical Healing",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-damage-blocked": {
    id: "companion-damage-blocked",
    name: "Damage Blocked",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-damage-done": {
    id: "companion-damage-done",
    name: "Damage Done",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-damage-taken": {
    id: "companion-damage-taken",
    name: "Damage Taken",
    valueType: "fractional-change",
    effectType: "fractional-change",
  },
  "companion-dps-aoe": {
    id: "companion-dps-aoe",
    name: "Per-Target Damage Per Second",
    valueType: "integer",
  },
  "companion-dps-direct": {
    id: "companion-dps-direct",
    name: "Direct Damage Per Second",
    valueType: "integer",
  },
  "companion-dps-dot": {
    id: "companion-dps-dot",
    name: "DoT Damage Per Second",
    valueType: "integer",
  },
  "companion-dps-single-target": {
    id: "companion-dps-single-target",
    name: "Single Target Damage Per Second",
    valueType: "integer",
  },
  "companion-dps-total": {
    id: "companion-dps-total",
    name: "Damage Per Second",
    valueType: "integer",
    formula: {
      type: "add",
      operands: [
        { type: "metric-ref", metricId: "companion-dps-direct" },
        { type: "metric-ref", metricId: "companion-dps-dot" },
      ],
    },
  },
} satisfies Record<string, CompanionMetricTemplate>
