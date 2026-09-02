import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_13: Partial<Record<MetricId, MetricTemplate>> = {
  "resistance-frost": {
    id: "resistance-frost",

    name: "Frost Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_COLD",
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
  "resistance-generic": {
    id: "resistance-generic",

    name: "Generic Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_GENERIC",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: false,
  },
  "resistance-magic": {
    id: "resistance-magic",

    name: "Magic Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_MAGIC",
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
  "resistance": {
    id: "resistance",

    name: "Armor",
    category: "base",
    esoStatConstantName: "STAT_ARMOR_RATING",
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
  "resistance-oblivion": {
    id: "resistance-oblivion",

    name: "Oblivion Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_OBLIVION",
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
  "resistance-physical": {
    id: "resistance-physical",

    name: "Physical Resistance",
    category: "base",
    esoStatConstantName: "STAT_PHYSICAL_RESIST",
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
  "resistance-poison": {
    id: "resistance-poison",

    name: "Poison Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_POISON",
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
  "resistance-shock": {
    id: "resistance-shock",

    name: "Shock Resistance",
    category: "base",
    esoStatConstantName: "STAT_DAMAGE_RESIST_SHOCK",
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
  "resistance-spell": {
    id: "resistance-spell",

    name: "Spell Resistance",
    category: "base",
    esoStatConstantName: "STAT_SPELL_RESIST",
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
  "resurrect-speed": {
    id: "resurrect-speed",

    name: "Resurrect Time",
    valueType: "number-per-second",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 7 },
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
            { type: "sum", categories: ["skills"], effectType: "fractional-change" },
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
            { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              categories: ["armor", "weapons", "jewelry"],
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
  },
  "resurrect-time": {
    id: "resurrect-time",

    name: "Resurrect Time",
    valueType: "number-per-second",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 7 },
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
            { type: "sum", categories: ["skills"], effectType: "fractional-change" },
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
            { type: "sum", categories: ["champion-points"], effectType: "fractional-change" },
          ],
        },
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              categories: ["armor", "weapons", "jewelry"],
              effectType: "fractional-change",
            },
          ],
        },
      ],
    },
  },
  "sneak-cost": {
    id: "sneak-cost",

    name: "Sneak Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_SNEAK_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    fullyImplemented: true,
    formula: {
      type: "multiply",
      operands: [
        { type: "constant", value: 105 },
        { type: "product", effectType: "fractional-change" },
      ],
    },
  },
  "sneak-range": {
    id: "sneak-range",

    name: "Sneak Range",
    valueType: "number-per-second",
    polarity: "lower-is-better",
    fullyImplemented: true,
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
  },
  "stamina-ability-cost": {
    id: "stamina-ability-cost",
    fullyImplemented: true,

    name: "Stamina Ability Cost",
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
  "stamina-block-cost": {
    id: "stamina-block-cost",
    fullyImplemented: true,

    name: "Block Cost",
    category: "advanced",
    esoStatConstantName: "ADVANCED_STAT_DISPLAY_TYPE_BLOCK_COST",
    esoStatValuePart: "flat",
    valueType: "integer",
    polarity: "lower-is-better",
    formula: {
      type: "multiply",
      operands: [
        { type: "sum", effectType: "integer" },
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
}
