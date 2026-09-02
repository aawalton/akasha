import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_07: Partial<Record<MetricId, MetricTemplate>> = {
  "ha-restore-shock-staff": {
    id: "ha-restore-shock-staff",

    name: "HA Restore (Shock)",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 2970 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "ha-restore-unarmed": {
    id: "ha-restore-unarmed",

    name: "HA Restore (Unarmed)",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 2095 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "ha-restore-werewolf": {
    id: "ha-restore-werewolf",

    name: "HA Restore (Werewolf)",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 3235 },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "sum", effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "ha-shock-spell-damage": {
    id: "ha-shock-spell-damage",

    name: "HA Shock Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "ha-shock-staff": {
    id: "ha-shock-staff",

    name: "HA Shock Staff",
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
                { type: "constant", value: 0.071429 },
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
                { type: "constant", value: 0.75 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["ha-shock-spell-damage"] },
                    { type: "metric-refs", metricIds: ["ha-shock-weapon-damage"] },
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
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "metric-refs", metricIds: ["damage-done-shock"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "ha-shock-weapon-damage": {
    id: "ha-shock-weapon-damage",

    name: "HA Shock Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "ha-speed": {
    id: "ha-speed",

    name: "HA Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "constant",
      value: 1,
    },
  },
  "ha-two-hand": {
    id: "ha-two-hand",

    name: "HA Two Hand",
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
                { type: "constant", value: 0.071429 },
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
                { type: "constant", value: 0.75 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["ha-physical-weapon-damage"] },
                    { type: "metric-refs", metricIds: ["ha-physical-spell-damage"] },
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
  "ha-unarmed": {
    id: "ha-unarmed",

    name: "HA Unarmed",
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
                { type: "constant", value: 0.07 },
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
                { type: "constant", value: 0.735 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["ha-physical-weapon-damage"] },
                    { type: "metric-refs", metricIds: ["ha-physical-spell-damage"] },
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
  "ha-werewolf": {
    id: "ha-werewolf",

    name: "HA Werewolf",
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
                { type: "constant", value: 0.071429 },
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
                { type: "constant", value: 0.75 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["ha-physical-weapon-damage"] },
                    { type: "metric-refs", metricIds: ["ha-physical-spell-damage"] },
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
  "healing-critical-bonus": {
    id: "healing-critical-bonus",

    name: "Healing Critical Bonus",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_CRITICAL_HEALING",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-critical-bonus-spell": {
    id: "healing-critical-bonus-spell",

    name: "Spell Critical Healing Bonus",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "constant", value: 0.5 },
          ],
        },
        {
          type: "add",
          operands: [{ type: "constant", value: 1 }],
        },
      ],
    },
  },
  "healing-critical-bonus-weapon": {
    id: "healing-critical-bonus-weapon",

    name: "Weapon Critical Healing Bonus",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "add",
          operands: [
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "constant", value: 0.5 },
          ],
        },
        {
          type: "add",
          operands: [{ type: "constant", value: 1 }],
        },
      ],
    },
  },
  "healing-done-aoe": {
    id: "healing-done-aoe",

    name: "AOE Healing Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-done-base": {
    id: "healing-done-base",

    name: "Healing Done",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_HEALING_DONE_BONUSES",
    esoStatValuePart: "percent",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-done-direct": {
    id: "healing-done-direct",

    name: "Direct Healing Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "healing-done-dot": {
    id: "healing-done-dot",

    name: "DOT Healing Done",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
}
