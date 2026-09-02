export interface FlaskTable {
  reagent: Record<number, unknown>
  noBad: boolean
  solvent: Record<number, number>
  reagentTrait: Record<number, Record<number, number>>
  solventSelection: number
  traitSelection: Record<number, number>
  traitIcon: Record<number, string>
}

export const FLASK: FlaskTable = {
  reagent: {},
  noBad: false,
  solvent: {
    1: 883,
    2: 1187,
    3: 4570,
    4: 23265,
    5: 23266,
    6: 23267,
    7: 23268,
    8: 64500,
    9: 64501,
  },
  reagentTrait: {
    1: { 1: 30165, 2: 2, 3: 14, 4: 12, 5: 23 },
    2: { 1: 30158, 2: 9, 3: 3, 4: 18, 5: 13 },
    3: { 1: 30155, 2: 6, 3: 8, 4: 1, 5: 22 },
    4: { 1: 30152, 2: 18, 3: 2, 4: 9, 5: 4 },
    5: { 1: 30162, 2: 7, 3: 5, 4: 16, 5: 11 },
    6: { 1: 30148, 2: 4, 3: 10, 4: 1, 5: 23 },
    7: { 1: 30149, 2: 16, 3: 2, 4: 7, 5: 6 },
    8: { 1: 30161, 2: 3, 3: 9, 4: 2, 5: 24 },
    9: { 1: 30160, 2: 17, 3: 1, 4: 10, 5: 3 },
    10: { 1: 30154, 2: 10, 3: 4, 4: 17, 5: 12 },
    11: { 1: 30157, 2: 5, 3: 7, 4: 2, 5: 21 },
    12: { 1: 30151, 2: 2, 3: 4, 4: 6, 5: 20 },
    13: { 1: 30164, 2: 1, 3: 3, 4: 5, 5: 19 },
    14: { 1: 30159, 2: 11, 3: 22, 4: 24, 5: 19 },
    15: { 1: 30163, 2: 15, 3: 1, 4: 8, 5: 5 },
    16: { 1: 30153, 2: 13, 3: 21, 4: 23, 5: 19 },
    17: { 1: 30156, 2: 8, 3: 6, 4: 15, 5: 12 },
    18: { 1: 30166, 2: 1, 3: 13, 4: 11, 5: 20 },
  },
  solventSelection: 1,
  traitSelection: { 1: 1 },
  traitIcon: {
    1: "restorehealth",
    2: "ravagehealth",
    3: "restoremagicka",
    4: "ravagemagicka",
    5: "restorestamina",
    6: "ravagestamina",
    7: "increaseweaponpower",
    8: "lowerweaponpower",
    9: "increasespellpower",
    10: "lowerspellpower",
    11: "weaponcrit",
    12: "lowerweaponcrit",
    13: "spellcrit",
    14: "lowerspellcrit",
    15: "increasearmor",
    16: "lowerarmor",
    17: "increasespellresist",
    18: "lowerspellresist",
    19: "unstoppable",
    20: "stun",
    21: "speed",
    22: "reducespeed",
    23: "invisible",
    24: "detection",
  },
}
