import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_08: Partial<Record<MetricId, MetricTemplate>> = {
  "healing-done-single-target": {
    id: "healing-done-single-target",

    name: "Single Target Healing Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-effective-power-base": {
    id: "healing-effective-power-base",

    name: "Effective Healing Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["effective-healing"],
    },
  },
  "healing-effective-self-power": {
    id: "healing-effective-self-power",

    name: "Effective Self Healing Power",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["effective-healing"],
    },
  },
  "healing-received-base": {
    id: "healing-received-base",

    name: "Healing Received",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-reduction-base": {
    id: "healing-reduction-base",

    name: "Healing Reduction",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-taken-base": {
    id: "healing-taken-base",

    name: "Healing Taken",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_TAKEN_BONUSES",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-total": {
    id: "healing-total",

    name: "Healing Total",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
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
                { type: "metric-refs", metricIds: ["healing-done-base"] },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "metric-refs", metricIds: ["healing-taken-base"] },
              ],
            },
            {
              type: "add",
              operands: [
                { type: "constant", value: 1 },
                { type: "metric-refs", metricIds: ["healing-received-base"] },
              ],
            },
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
  "health-ability-cost": {
    id: "health-ability-cost",

    name: "Health Ability Cost",
    valueType: "fractional-change",
    polarity: "lower-is-better",
    fullyImplemented: true,
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
          ],
        },
        { type: "constant", value: -1 },
      ],
    },
  },
  "health-maximum": {
    id: "health-maximum",

    name: "Max Health",
    category: "base",
    esoStatConstantName: "STAT_HEALTH_MAX",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "floor-multiply",
      operands: [
        { type: "sum", effectType: "integer" },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "health-recovery-idle": {
    id: "health-recovery-idle",

    name: "Health Recovery (Idle)",
    category: "base",
    esoStatConstantName: "STAT_HEALTH_REGEN_IDLE",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "metric-refs", metricIds: ["health-recovery"] },
        { type: "constant", value: 4 },
      ],
    },
  },
  "health-recovery": {
    id: "health-recovery",

    name: "Health Recovery",
    category: "base",
    esoStatConstantName: "STAT_HEALTH_REGEN_COMBAT",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
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
  "health-restore": {
    id: "health-restore",

    name: "Restore Health",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
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
  "hemorrhaging-damage": {
    id: "hemorrhaging-damage",

    name: "Hemorrhaging Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "floor-multiply",
              operands: [
                { type: "constant", value: 0.015 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["magicka-maximum"] },
                    { type: "metric-refs", metricIds: ["stamina-maximum"] },
                  ],
                },
              ],
            },
            {
              type: "floor-multiply",
              operands: [
                { type: "constant", value: 0.1575 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["status-bleed-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-bleed-weapon-damage"] },
                  ],
                },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-done-bleed"] },
            { type: "metric-refs", metricIds: ["damage-done-dot"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "inspiration-gain": {
    id: "inspiration-gain",

    name: "Inspiration Gain",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_INSPIRATION_BONUS",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "fractional-change",
        },
      ],
    },
    fullyImplemented: true,
  },
  "la-bow": {
    id: "la-bow",

    name: "LA Bow",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.045 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["magicka-maximum"] },
                        { type: "metric-refs", metricIds: ["stamina-maximum"] },
                      ],
                    },
                  ],
                },
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.4725 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-physical-weapon-damage"] },
                        { type: "metric-refs", metricIds: ["la-physical-spell-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3465 },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "metric-refs", metricIds: ["damage-done-bow"] },
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-dual-wield": {
    id: "la-dual-wield",

    name: "LA Dual Wield",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "min",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.05 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["magicka-maximum"] },
                        { type: "metric-refs", metricIds: ["stamina-maximum"] },
                      ],
                    },
                  ],
                },
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.55 },
                    {
                      type: "max",
                      operands: [
                        { type: "metric-refs", metricIds: ["la-physical-weapon-damage"] },
                        { type: "metric-refs", metricIds: ["la-physical-spell-damage"] },
                      ],
                    },
                  ],
                },
              ],
            },
            { type: "constant", value: 3850 },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "metric-refs", metricIds: ["damage-done-physical"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-flame-spell-damage": {
    id: "la-flame-spell-damage",

    name: "LA Flame Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
}
