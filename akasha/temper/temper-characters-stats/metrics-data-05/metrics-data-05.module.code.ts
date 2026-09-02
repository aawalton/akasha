import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_05: Partial<Record<MetricId, MetricTemplate>> = {
  "effective-power-spell": {
    id: "effective-power-spell",

    name: "Effective Spell Power",
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
              type: "multiply",
              operands: [
                { type: "metric-refs", metricIds: ["magicka-maximum"] },
                { type: "constant", value: 0.095238 },
              ],
            },
            { type: "metric-refs", metricIds: ["power-spell"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                {
                  type: "metric-refs",
                  metricIds: ["critical-rating-spell"],
                  convertRatingToChance: true,
                },
                { type: "metric-refs", metricIds: ["attack-crit-damage-spell"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                { type: "constant", value: -1 },
                { type: "metric-refs", metricIds: ["attack-spell-mitigation"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["target-damage-taken"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "effective-power-weapon": {
    id: "effective-power-weapon",

    name: "Effective Weapon Power",
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
              type: "multiply",
              operands: [
                { type: "metric-refs", metricIds: ["stamina-maximum"] },
                { type: "constant", value: 0.095238 },
              ],
            },
            { type: "metric-refs", metricIds: ["power-weapon"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                {
                  type: "metric-refs",
                  metricIds: ["critical-rating-weapon"],
                  convertRatingToChance: true,
                },
                { type: "metric-refs", metricIds: ["attack-crit-damage-weapon"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "multiply",
              operands: [
                { type: "constant", value: -1 },
                { type: "metric-refs", metricIds: ["attack-physical-mitigation"] },
              ],
            },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["target-damage-taken"] },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "experience-gain": {
    id: "experience-gain",

    name: "Experience Gain",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_ALL_XP",
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
  "fear-duration": {
    id: "fear-duration",

    name: "Fear Duration",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 4 },
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
            { type: "sum", categories: ["sets"], effectType: "fractional-change" },
          ],
        },
      ],
    },
  },
  "gold-gain": {
    id: "gold-gain",

    name: "Gold Gain",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_COIN_BONUS",
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
  "ha-bow": {
    id: "ha-bow",

    name: "HA Bow",
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
                { type: "constant", value: 0.095238 },
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
                { type: "constant", value: 1.0 },
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
            { type: "metric-refs", metricIds: ["damage-done-bow"] },
          ],
        },
      ],
    },
  },
  "ha-dual-wield": {
    id: "ha-dual-wield",

    name: "HA Dual Wield",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        {
          type: "multiply",
          operands: [
            { type: "constant", value: 2 },
            {
              type: "add",
              operands: [
                {
                  type: "floor-multiply",
                  operands: [
                    { type: "constant", value: 0.02381 },
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
                    { type: "constant", value: 0.25 },
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
  "ha-flame-spell-damage": {
    id: "ha-flame-spell-damage",

    name: "HA Flame Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "ha-flame-staff": {
    id: "ha-flame-staff",

    name: "HA Flame Staff",
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
                    { type: "metric-refs", metricIds: ["ha-flame-spell-damage"] },
                    { type: "metric-refs", metricIds: ["ha-flame-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-flame"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "ha-flame-weapon-damage": {
    id: "ha-flame-weapon-damage",

    name: "HA Flame Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "ha-frost-spell-damage": {
    id: "ha-frost-spell-damage",

    name: "HA Frost Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
}
