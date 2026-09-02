import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_14: Partial<Record<MetricId, MetricTemplate>> = {
  "stamina-dodge-cost": {
    id: "stamina-dodge-cost",
    fullyImplemented: true,

    name: "Dodge Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_DODGE_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [{ type: "sum", effectType: "integer" }],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: -3 },
            { type: "product", categories: ["skills"], effectType: "fractional-change" },
            { type: "product", categories: ["armor"], effectType: "fractional-change" },
            { type: "product", categories: ["sets"], effectType: "fractional-change" },
            { type: "product", categories: ["buffs"], effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "stamina-maximum": {
    id: "stamina-maximum",
    fullyImplemented: true,

    name: "Max Stamina",
    category: "base",
    esoStatConstantName: "STAT_STAMINA_MAX",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "stamina-non-core-ability-cost": {
    id: "stamina-non-core-ability-cost",
    fullyImplemented: true,

    name: "Stamina Non-Core Ability Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["skills"], effectType: "fractional-change" },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["sets"], effectType: "fractional-change" },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["buffs"], effectType: "fractional-change" },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "sum", categories: ["curse"], effectType: "fractional-change" },
              ],
            },
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
  "stamina-recovery-idle": {
    id: "stamina-recovery-idle",

    name: "Stamina Recovery (Idle)",
    category: "base",
    esoStatConstantName: "STAT_STAMINA_REGEN_IDLE",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "sum-for-metric", metricId: "stamina-recovery", effectType: "integer" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum-for-metric",
              metricId: "stamina-recovery",
              effectType: "fractional-change",
            },
          ],
        },
        { type: "constant", value: 2 },
      ],
    },
  },
  "stamina-recovery": {
    id: "stamina-recovery",
    fullyImplemented: true,

    name: "Stamina Recovery",
    category: "base",
    esoStatConstantName: "STAT_STAMINA_REGEN_COMBAT",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "floor",
          operand: { type: "sum", effectType: "integer" },
        },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "stamina-restore": {
    id: "stamina-restore",
    fullyImplemented: true,

    name: "Restore Stamina",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "number-per-seconds",
        },
      ],
    },
  },
  "stamina-sprint-cost": {
    id: "stamina-sprint-cost",
    fullyImplemented: true,

    name: "Sprint Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SPRINT_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        { type: "product", categories: ["skills"], effectType: "fractional-change" },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", categories: ["armor"], effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "status-bleed-spell-damage": {
    id: "status-bleed-spell-damage",

    name: "Status Bleed Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-bleed-weapon-damage": {
    id: "status-bleed-weapon-damage",

    name: "Status Bleed Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-disease-spell-damage": {
    id: "status-disease-spell-damage",

    name: "Status Disease Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-disease-weapon-damage": {
    id: "status-disease-weapon-damage",

    name: "Status Disease Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-duration": {
    id: "status-duration",

    name: "Status Duration",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: 4.0 },
        { type: "sum", effectType: "integer" },
      ],
    },
  },
  "status-effect-chance": {
    id: "status-effect-chance",

    name: "Status Effect Chance",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "status-flame-spell-damage": {
    id: "status-flame-spell-damage",

    name: "Status Flame Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-flame-weapon-damage": {
    id: "status-flame-weapon-damage",

    name: "Status Flame Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-frost-spell-damage": {
    id: "status-frost-spell-damage",

    name: "Status Frost Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-frost-weapon-damage": {
    id: "status-frost-weapon-damage",

    name: "Status Frost Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-magic-spell-damage": {
    id: "status-magic-spell-damage",

    name: "Status Magic Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-magic-weapon-damage": {
    id: "status-magic-weapon-damage",

    name: "Status Magic Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-physical-spell-damage": {
    id: "status-physical-spell-damage",

    name: "Status Physical Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-physical-weapon-damage": {
    id: "status-physical-weapon-damage",

    name: "Status Physical Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-poison-spell-damage": {
    id: "status-poison-spell-damage",

    name: "Status Poison Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-poison-weapon-damage": {
    id: "status-poison-weapon-damage",

    name: "Status Poison Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "status-shock-spell-damage": {
    id: "status-shock-spell-damage",

    name: "Status Shock Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "status-shock-weapon-damage": {
    id: "status-shock-weapon-damage",

    name: "Status Shock Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "stealth-detection": {
    id: "stealth-detection",

    name: "Stealth Detection Radius",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    formula: {
      type: "multiply",
      operands: [
        {
          type: "max",
          operands: [
            { type: "constant", value: 0 },
            {
              type: "add",
              operands: [
                { type: "constant", value: 6.5 },
                { type: "sum", effectType: "integer" },
              ],
            },
          ],
        },
        { type: "product", effectType: "fractional-change" },
      ],
    },
    fullyImplemented: true,
  },
  "sturdy": {
    id: "sturdy",

    name: "Sturdy",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
}
