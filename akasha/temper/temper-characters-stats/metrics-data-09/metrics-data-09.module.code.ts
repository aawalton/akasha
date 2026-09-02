import type { MetricId } from "@akasha/temper-formula-framework/metric-id"
import type { MetricTemplate } from "../metric-template/metric-template.module.code.ts"

export const METRICS_DATA_09: Partial<Record<MetricId, MetricTemplate>> = {
  "la-flame-staff": {
    id: "la-flame-staff",

    name: "LA Flame Staff",
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
                        { type: "metric-refs", metricIds: ["la-flame-spell-damage"] },
                        { type: "metric-refs", metricIds: ["la-flame-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-flame"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-flame-weapon-damage": {
    id: "la-flame-weapon-damage",

    name: "LA Flame Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "la-frost-spell-damage": {
    id: "la-frost-spell-damage",

    name: "LA Frost Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "la-frost-staff": {
    id: "la-frost-staff",

    name: "LA Frost Staff",
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
                        { type: "metric-refs", metricIds: ["la-frost-spell-damage"] },
                        { type: "metric-refs", metricIds: ["la-frost-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-frost"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-frost-weapon-damage": {
    id: "la-frost-weapon-damage",

    name: "LA Frost Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "la-magic-spell-damage": {
    id: "la-magic-spell-damage",

    name: "LA Magic Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "la-magic-weapon-damage": {
    id: "la-magic-weapon-damage",

    name: "LA Magic Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "la-melee-speed": {
    id: "la-melee-speed",

    name: "LA Melee Speed",
    valueType: "fractional-change",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "add",
      operands: [
        { type: "constant", value: 1 },
        { type: "sum", effectType: "fractional-change" },
      ],
    },
  },
  "la-one-hand": {
    id: "la-one-hand",

    name: "LA One Hand",
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
  "la-overload": {
    id: "la-overload",

    name: "LA Overload",
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
                { type: "constant", value: 0.1 },
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
                { type: "constant", value: 1.05 },
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
        {
          type: "add",
          operands: [
            { type: "constant", value: 1 },
            {
              type: "sum",
              effectType: "fractional-change",
            },
            { type: "metric-refs", metricIds: ["damage-done-shock"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-direct"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
            { type: "metric-refs", metricIds: ["overload-damage"] },
          ],
        },
      ],
    },
  },
  "la-physical-spell-damage": {
    id: "la-physical-spell-damage",

    name: "LA Physical Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
  "la-physical-weapon-damage": {
    id: "la-physical-weapon-damage",

    name: "LA Physical Weapon Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-weapon"],
    },
  },
  "la-restoration-staff": {
    id: "la-restoration-staff",

    name: "LA Restoration Staff",
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
                        { type: "metric-refs", metricIds: ["la-magic-spell-damage"] },
                        { type: "metric-refs", metricIds: ["la-magic-weapon-damage"] },
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
            { type: "metric-refs", metricIds: ["damage-done-magic"] },
            { type: "metric-refs", metricIds: ["damage-done-dot"] },
            { type: "metric-refs", metricIds: ["damage-done-single-target"] },
            { type: "metric-refs", metricIds: ["damage-done-base"] },
          ],
        },
      ],
    },
  },
  "la-shock-spell-damage": {
    id: "la-shock-spell-damage",

    name: "LA Shock Spell Damage",
    valueType: "integer",
    polarity: "higher-is-better",
    fullyImplemented: true,
    formula: {
      type: "metric-refs",
      metricIds: ["power-spell"],
    },
  },
}
