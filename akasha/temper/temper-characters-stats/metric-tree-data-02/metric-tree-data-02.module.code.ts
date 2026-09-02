import type { MetricTree } from "../metric-tree-types/metric-tree-types.module.code.ts"

export const METRIC_TREE_DATA_02 = {
  "sustain": {
    "id": "sustain",
    "name": "Sustain",
    "children": [
      {
        "type": "subcategory",
        "id": "magicka",
        "name": "Magicka",
        "children": [
          { "type": "metric", "id": "magicka-ability-cost" },
          { "type": "metric", "id": "magicka-maximum" },
          { "type": "metric", "id": "magicka-recovery" },
          { "type": "metric", "id": "magicka-restore" },
        ],
      },
      {
        "type": "subcategory",
        "id": "stamina",
        "name": "Stamina",
        "children": [
          { "type": "metric", "id": "stamina-ability-cost" },
          { "type": "metric", "id": "stamina-non-core-ability-cost" },
          { "type": "metric", "id": "stamina-block-cost" },
          { "type": "metric", "id": "stamina-dodge-cost" },
          { "type": "metric", "id": "stamina-maximum" },
          { "type": "metric", "id": "stamina-recovery" },
          { "type": "metric", "id": "stamina-restore" },
          { "type": "metric", "id": "stamina-sprint-cost" },
        ],
      },
      {
        "type": "subcategory",
        "id": "ultimate",
        "name": "Ultimate",
        "children": [
          { "type": "metric", "id": "ultimate-ability-cost" },
          { "type": "metric", "id": "ultimate-generation" },
          { "type": "metric", "id": "ultimate-recovery" },
          { "type": "metric", "id": "ultimate-restore" },
        ],
      },
      {
        "type": "subcategory",
        "id": "ha-restore",
        "name": "HA Restore",
        "children": [
          { "type": "metric", "id": "ha-restore-1hs" },
          { "type": "metric", "id": "ha-restore-2h" },
          { "type": "metric", "id": "ha-restore-bow" },
          { "type": "metric", "id": "ha-restore-dw" },
          { "type": "metric", "id": "ha-restore-fire-frost-staff" },
          { "type": "metric", "id": "ha-restore-rest-staff" },
          { "type": "metric", "id": "ha-restore-shock-staff" },
          { "type": "metric", "id": "ha-restore-unarmed" },
          { "type": "metric", "id": "ha-restore-werewolf" },
          { "type": "metric", "id": "constitution" },
        ],
      },
      {
        "type": "subcategory",
        "id": "costs",
        "name": "Costs",
        "children": [
          { "type": "metric", "id": "break-free-cost" },
          { "type": "metric", "id": "health-ability-cost" },
          { "type": "metric", "id": "sneak-cost" },
        ],
      },
    ],
  },
  "toughness": {
    "id": "toughness",
    "name": "Toughness",
    "children": [
      { "type": "metric", "id": "effective-health-physical", "useAccentColor": true },
      { "type": "metric", "id": "effective-health-spell", "useAccentColor": true },
      {
        "type": "subcategory",
        "id": "health",
        "name": "Health",
        "children": [
          { "type": "metric", "id": "health-maximum" },
          { "type": "metric", "id": "health-restore" },
        ],
      },
      {
        "type": "metric",
        "id": "resistance",
        "includeInChildAggregates": true,
        "children": [
          { "type": "metric", "id": "resistance-generic" },
          {
            "type": "metric",
            "id": "resistance-physical",
            "includeInChildAggregates": true,
            "children": [
              { "type": "metric", "id": "resistance-bleed" },
              { "type": "metric", "id": "resistance-disease" },
              { "type": "metric", "id": "resistance-poison" },
            ],
          },
          {
            "type": "metric",
            "id": "resistance-spell",
            "includeInChildAggregates": true,
            "children": [
              { "type": "metric", "id": "resistance-earth" },
              { "type": "metric", "id": "resistance-flame" },
              { "type": "metric", "id": "resistance-frost" },
              { "type": "metric", "id": "resistance-magic" },
              { "type": "metric", "id": "resistance-oblivion" },
              { "type": "metric", "id": "resistance-shock" },
            ],
          },
        ],
      },
      {
        "type": "subcategory",
        "id": "critical-defense",
        "name": "Critical Defense",
        "children": [
          { "type": "metric", "id": "critical-damage-taken" },
          { "type": "metric", "id": "resistance-critical" },
        ],
      },
      {
        "type": "subcategory",
        "id": "damage-taken",
        "name": "Damage Taken",
        "children": [
          { "type": "metric", "id": "damage-taken" },
          { "type": "metric", "id": "damage-taken-arena" },
          { "type": "metric", "id": "damage-taken-direct" },
          { "type": "metric", "id": "damage-taken-dungeon" },
          { "type": "metric", "id": "damage-taken-from-area" },
          { "type": "metric", "id": "damage-taken-trial" },
        ],
      },
      {
        "type": "subcategory",
        "id": "damage-taken-by-type",
        "name": "Damage Taken by Type",
        "children": [
          { "type": "metric", "id": "damage-taken-dot" },
          { "type": "metric", "id": "damage-taken-fall" },
          { "type": "metric", "id": "damage-taken-ha" },
          { "type": "metric", "id": "damage-taken-la" },
        ],
      },
      {
        "type": "subcategory",
        "id": "defense-mitigation",
        "name": "Defense Mitigation",
        "children": [
          { "type": "metric", "id": "defense-crit-dmg" },
          { "type": "metric", "id": "defense-physical-aoe-mitigation" },
          { "type": "metric", "id": "defense-physical-dd-mitigation" },
          { "type": "metric", "id": "defense-physical-mitigation" },
          { "type": "metric", "id": "defense-spell-aoe-mitigation" },
          { "type": "metric", "id": "defense-spell-dd-mitigation" },
          { "type": "metric", "id": "defense-spell-mitigation" },
        ],
      },
      {
        "type": "subcategory",
        "id": "damage-shields",
        "name": "Damage Shields",
        "children": [
          { "type": "metric", "id": "damage-shield" },
          { "type": "metric", "id": "damage-shield-cost" },
        ],
      },
    ],
  },
  "healing": {
    "id": "healing",
    "name": "Healing",
    "children": [
      {
        "type": "subcategory",
        "id": "healing-done",
        "name": "Healing Done",
        "children": [
          { "type": "metric", "id": "healing-done-aoe" },
          { "type": "metric", "id": "healing-done-base" },
          { "type": "metric", "id": "healing-done-direct" },
          { "type": "metric", "id": "healing-done-dot" },
          { "type": "metric", "id": "healing-done-single-target" },
        ],
      },
      {
        "type": "subcategory",
        "id": "healing-power",
        "name": "Healing Power",
        "children": [
          {
            "type": "subcategory",
            "id": "effective-healing",
            "name": "Effective Healing Power",
            "children": [
              { "type": "metric", "id": "effective-healing" },
              { "type": "metric", "id": "effective-healing-spell" },
              { "type": "metric", "id": "effective-healing-weapon" },
            ],
          },
          { "type": "metric", "id": "healing-effective-power-base" },
          { "type": "metric", "id": "healing-effective-self-power" },
        ],
      },
      {
        "type": "subcategory",
        "id": "healing-critical",
        "name": "Healing Critical",
        "children": [
          {
            "type": "metric",
            "id": "healing-critical-bonus",
            "includeInChildAggregates": true,
            "children": [
              { "type": "metric", "id": "healing-critical-bonus-spell" },
              { "type": "metric", "id": "healing-critical-bonus-weapon" },
            ],
          },
        ],
      },
      {
        "type": "subcategory",
        "id": "healing-received",
        "name": "Healing Received",
        "children": [
          { "type": "metric", "id": "healing-received-base" },
          { "type": "metric", "id": "healing-taken-base" },
        ],
      },
      { "type": "metric", "id": "healing-reduction-base" },
      {
        "type": "subcategory",
        "id": "resurrection",
        "name": "Resurrection",
        "children": [
          { "type": "metric", "id": "resurrect-time" },
          { "type": "metric", "id": "resurrect-speed" },
        ],
      },
      { "type": "metric", "id": "healing-total" },
      { "type": "metric", "id": "health-recovery" },
    ],
  },
  "mobility": {
    "id": "mobility",
    "name": "Mobility",
    "children": [
      {
        "type": "metric",
        "id": "movement-speed",
        "includeInChildAggregates": true,
        "children": [
          { "type": "metric", "id": "movement-run-speed" },
          { "type": "metric", "id": "movement-swim-speed" },
          { "type": "metric", "id": "movement-walk-speed" },
        ],
      },
      { "type": "metric", "id": "movement-sprint-speed" },
      {
        "type": "metric",
        "id": "movement-sneak-speed",
        "children": [{ "type": "metric", "id": "movement-sneak-penalty" }],
      },
      {
        "type": "metric",
        "id": "mounted-speed",
        "includeInChildAggregates": true,
        "children": [
          { "type": "metric", "id": "mounted-run-speed" },
          { "type": "metric", "id": "mounted-walk-speed" },
        ],
      },
      { "type": "metric", "id": "mount-stamina-maximum" },
      {
        "type": "subcategory",
        "id": "block",
        "name": "Block",
        "children": [
          { "type": "metric", "id": "block-cost-reduction" },
          { "type": "metric", "id": "block-mitigation" },
          { "type": "metric", "id": "block-speed" },
        ],
      },
      {
        "type": "subcategory",
        "id": "stealth",
        "name": "Stealth",
        "children": [
          { "type": "metric", "id": "stealth-detection" },
          { "type": "metric", "id": "sneak-range" },
        ],
      },
    ],
  },
  "target": {
    "id": "target",
    "name": "Target",
    "children": [
      {
        "type": "subcategory",
        "id": "target-damage",
        "name": "Damage",
        "children": [
          { "type": "metric", "id": "target-attack-bonus" },
          { "type": "metric", "id": "target-critical-damage" },
          { "type": "metric", "id": "target-critical-damage-done" },
          { "type": "metric", "id": "target-critical-rating" },
          { "type": "metric", "id": "target-damage-done" },
          { "type": "metric", "id": "target-penetration" },
          {
            "type": "metric",
            "id": "target-power",
            "includeInChildAggregates": true,
            "children": [
              { "type": "metric", "id": "target-spell-power" },
              { "type": "metric", "id": "target-weapon-power" },
            ],
          },
        ],
      },
      {
        "type": "subcategory",
        "id": "target-sustain",
        "name": "Sustain",
        "children": [
          { "type": "metric", "id": "target-magicka-ability-cost" },
          { "type": "metric", "id": "target-stamina-ability-cost" },
          { "type": "metric", "id": "target-ultimate-restoration" },
        ],
      },
      {
        "type": "subcategory",
        "id": "target-toughness",
        "name": "Toughness",
        "children": [
          { "type": "metric", "id": "target-armor" },
          { "type": "metric", "id": "target-critical-resistance" },
          { "type": "metric", "id": "target-defense-bonus" },
          { "type": "metric", "id": "target-physical-debuff" },
          {
            "type": "metric",
            "id": "target-resistance",
            "includeInChildAggregates": true,
            "children": [
              { "type": "metric", "id": "target-physical-resistance" },
              { "type": "metric", "id": "target-spell-resistance" },
            ],
          },
          { "type": "metric", "id": "target-spell-debuff" },
          { "type": "metric", "id": "target-damage-taken" },
          { "type": "metric", "id": "target-damage-taken-poison" },
        ],
      },
      {
        "type": "subcategory",
        "id": "target-healing",
        "name": "Healing",
        "children": [
          { "type": "metric", "id": "target-healing-received" },
          { "type": "metric", "id": "target-health-recovery" },
        ],
      },
      {
        "type": "subcategory",
        "id": "target-other",
        "name": "Other",
        "children": [
          { "type": "metric", "id": "target-effective-level" },
          { "type": "metric", "id": "target-percent-health" },
        ],
      },
    ],
  },
  "other": {
    "id": "other",
    "name": "Other",
    "children": [
      {
        "type": "subcategory",
        "id": "potions",
        "name": "Potions",
        "children": [
          { "type": "metric", "id": "potion-cooldown" },
          { "type": "metric", "id": "potion-duration" },
        ],
      },
      { "type": "metric", "id": "synergy-effectiveness" },
      { "type": "metric", "id": "experience-gain" },
      {
        "type": "subcategory",
        "id": "traits",
        "name": "Traits",
        "children": [
          { "type": "metric", "id": "divines" },
          { "type": "metric", "id": "sturdy" },
          { "type": "metric", "id": "training" },
        ],
      },
      {
        "type": "subcategory",
        "id": "crowd-control",
        "name": "Crowd Control",
        "children": [
          { "type": "metric", "id": "break-free-duration" },
          { "type": "metric", "id": "fear-duration" },
        ],
      },
      { "type": "metric", "id": "player-effective-level" },
    ],
  },
} satisfies MetricTree
