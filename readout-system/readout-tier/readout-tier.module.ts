import type { Module } from "@akasha/code-system/module"

export const readoutTier = {
  id: "01a05f42-92f5-7001-98d7-66166fa0b0f6",
  pageTypeSlug: "module",
  slug: "readout-tier",
  definition: "the rung a reading reaches on the scale it is read against",
  code: "ts",
  test: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The rungs are read off a scale page rather than named here.",
    },
    {
      invariantKind: "departure",
      statement: "A rung stated as text is read as the number that rung spells.",
    },
    {
      invariantKind: "departure",
      statement: "A rung a scale states nothing for is no rung.",
    },
    {
      invariantKind: "departure",
      statement:
        "The rungs are ordered from black through blue rather than by the numbers the rungs state.",
    },
    {
      invariantKind: "departure",
      statement: "A reading reaches the highest rung whose number the reading has gone over.",
    },
    {
      invariantKind: "departure",
      statement: "A reading under every rung is black.",
    },
    {
      invariantKind: "departure",
      statement:
        "The color a reading under every rung is given is named here rather than by a reader.",
    },
    {
      invariantKind: "departure",
      statement: "The tier above the one reached is the next rung the scale states.",
    },
    {
      invariantKind: "departure",
      statement: "A rung the scale states nothing for is never named as the tier above.",
    },
    {
      invariantKind: "departure",
      statement:
        "How far a reading has climbed is the fraction between the rung reached and the rung above.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading under every rung has climbed a fraction that is unknown rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "A reading on the highest rung has no tier above that rung.",
    },
    {
      invariantKind: "departure",
      statement: "A scale of fewer than two rungs says nothing about which way a reading runs.",
    },
    {
      invariantKind: "departure",
      statement: "A scale whose numbers shrink from black through blue is read as a falling scale.",
    },
    {
      invariantKind: "departure",
      statement: "A scale whose rungs neither climb nor fall is refused.",
    },
    {
      invariantKind: "departure",
      statement:
        "A falling reading reaches the first rung from black whose number the reading has not gone under.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading under every rung of a falling scale is on the best rung that scale states.",
    },
    {
      invariantKind: "departure",
      statement:
        "A falling rung holds the band from that rung's number up to the number of the rung before.",
    },
    {
      invariantKind: "departure",
      statement:
        "How far a falling reading has come is the fraction of the rung's band the reading has come down.",
    },
    {
      invariantKind: "departure",
      statement:
        "A reading over every rung of a falling scale has come a fraction that is unknown rather than zero.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that is no finite number reaches no rung.",
    },
    {
      invariantKind: "departure",
      statement: "How wide a reading is written is the format the readout states.",
    },
    {
      invariantKind: "departure",
      statement: "A figure written as an integer is written to the nearest whole number.",
    },
    {
      invariantKind: "departure",
      statement: "A figure written as a decimal is written to no more than two places.",
    },
    {
      invariantKind: "departure",
      statement: "A figure written as a decimal drops trailing zeros.",
    },
    {
      invariantKind: "departure",
      statement: "A figure that rounds onto zero is written as zero rather than as a signed zero.",
    },
    {
      invariantKind: "departure",
      statement: "A readout stating no format has its reading written as the number it is.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here names a readout.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here reaches the store.",
    },
    {
      invariantKind: "absence",
      statement: "Nothing here decides a reading is too old to show.",
    },
  ],
} as const satisfies Module
