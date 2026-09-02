import { POWER_LEVEL_BASE } from "@akasha/temper-formula-framework/base-stat"
import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_12: Partial<Record<MetricId, MetricTemplate>> = {
  "overcharged-damage": {
    id: "overcharged-damage",

    name: "Overcharged Damage",
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
                { type: "constant", value: 0.008 },
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
                { type: "constant", value: 0.084 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["status-magic-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-magic-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-magic"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "overload-damage": {
    id: "overload-damage",

    name: "Overload Damage",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "sum",
      effectType: "fractional-change",
    },
  },
  "penetration": {
    id: "penetration",

    name: "Penetration",
    category: "base",
    esoStatConstantName: "STAT_OFFENSIVE_PENETRATION",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "penetration-physical": {
    id: "penetration-physical",

    name: "Physical Penetration",
    category: "base",
    esoStatConstantName: "STAT_PHYSICAL_PENETRATION",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "penetration-spell": {
    id: "penetration-spell",

    name: "Spell Penetration",
    category: "base",
    esoStatConstantName: "STAT_SPELL_PENETRATION",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
  },
  "player-effective-level": {
    id: "player-effective-level",

    name: "Player Effective Level",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "constant",
      value: 66,
    },
    fullyImplemented: true,
  },
  "poisoned-damage": {
    id: "poisoned-damage",

    name: "Poisoned Damage",
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
                { type: "constant", value: 0.0144 },
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
                { type: "constant", value: 0.1512 },
                {
                  type: "max",
                  operands: [
                    { type: "metric-refs", metricIds: ["status-poison-spell-damage"] },
                    { type: "metric-refs", metricIds: ["status-poison-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-poison"] },
            { type: "metric-refs", metricIds: ["damage-done-dot"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "poisoned-duration": {
    id: "poisoned-duration",

    name: "Poisoned Duration",
    valueType: "number-per-second",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "constant",
      value: 6.0,
    },
  },
  "potion-cooldown": {
    id: "potion-cooldown",

    name: "Potion Cooldown",
    valueType: "integer",
    polarity: "lower-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    fullyImplemented: true,
  },
  "potion-duration": {
    id: "potion-duration",

    name: "Potion Duration",
    valueType: "integer",
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
      ],
    },
    fullyImplemented: true,
  },
  "power": {
    id: "power",

    name: "Power",
    category: "base",
    esoStatConstantName: "STAT_WEAPON_AND_SPELL_DAMAGE",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: POWER_LEVEL_BASE },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "sum",
                  effectType: "integer",
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
              ],
            },
          ],
        },
      ],
    },
  },
  "power-spell": {
    id: "power-spell",

    name: "Spell Power",
    category: "base",
    esoStatConstantName: "STAT_SPELL_POWER",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: POWER_LEVEL_BASE },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "sum",
                  effectType: "integer",
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
              ],
            },
          ],
        },
      ],
    },
  },
  "power-weapon": {
    id: "power-weapon",

    name: "Weapon Power",
    category: "base",
    esoStatConstantName: "STAT_POWER",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: POWER_LEVEL_BASE },
        {
          type: "multiply",
          operands: [
            {
              type: "add",
              operands: [
                {
                  type: "sum",
                  effectType: "integer",
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
              ],
            },
          ],
        },
      ],
    },
  },
  "resistance-bleed": {
    id: "resistance-bleed",

    name: "Bleed Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_BLEED",
    valueType: "rating",
    divisor: 66000,
    cap: 0.5,
    polarity: "higher-is-better",
    formula: {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "sum",
                effectType: "integer",
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
            ],
          },
        ],
      },
    },
    fullyImplemented: true,
  },
  "resistance-critical": {
    id: "resistance-critical",

    name: "Critical Resistance",
    category: "base",
    esoStatConstantName: "STAT_CRITICAL_RESISTANCE",
    valueType: "rating",
    divisor: 6600,
    polarity: "higher-is-better",
    formula: {
      type: "add",
      operands: [
        {
          type: "sum",
          effectType: "integer",
        },
        {
          type: "floor",
          operand: {
            type: "multiply",
            operands: [
              {
                type: "sum",
                effectType: "fractional-change",
              },
              { type: "metric-refs", metricIds: ["player-effective-level"] },
              { type: "constant", value: 100 },
            ],
          },
        },
      ],
    },
    fullyImplemented: true,
  },
  "resistance-disease": {
    id: "resistance-disease",

    name: "Disease Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_DISEASE",
    valueType: "rating",
    divisor: 66000,
    cap: 0.5,
    polarity: "higher-is-better",
    formula: {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "sum",
                effectType: "integer",
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
            ],
          },
        ],
      },
    },
    fullyImplemented: true,
  },
  "resistance-earth": {
    id: "resistance-earth",

    name: "Earth Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_EARTH",
    valueType: "rating",
    divisor: 66000,
    cap: 0.5,
    polarity: "higher-is-better",
    formula: {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "sum",
                effectType: "integer",
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
            ],
          },
        ],
      },
    },
    fullyImplemented: true,
  },
  "resistance-flame": {
    id: "resistance-flame",

    name: "Flame Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_FIRE",
    valueType: "rating",
    divisor: 66000,
    cap: 0.5,
    polarity: "higher-is-better",
    formula: {
      type: "floor",
      operand: {
        type: "multiply",
        operands: [
          {
            type: "add",
            operands: [
              {
                type: "sum",
                effectType: "integer",
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
            ],
          },
        ],
      },
    },
    fullyImplemented: true,
  },
}
