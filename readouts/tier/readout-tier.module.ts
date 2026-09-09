import type { Module } from "@akasha/code/module"

export const readoutTier = {
  id: "01a05f42-92f5-7001-98d7-66166fa0b0f6",
  pageTypeSlug: "module",
  type: "module",
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
      statement: "A figure given as text is read as the number that text spells.",
    },
    {
      invariantKind: "departure",
      statement: "A rung a scale states nothing for is no rung.",
    },
    {
      invariantKind: "departure",
      statement: "A climbing scale stating no black rung has its black rung read at zero.",
    },
    {
      invariantKind: "departure",
      statement: "The black rung read in is taken only where the rungs then climb.",
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
      statement: "The tier above the tier reached is the next rung the scale states.",
    },
    {
      invariantKind: "departure",
      statement: "A rung the scale states nothing for is never named as the tier above.",
    },
    {
      invariantKind: "departure",
      statement: "The tier above a reading under every rung is the first rung that is not black.",
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
      statement: "A figure is floored rather than rounded.",
    },
    {
      invariantKind: "departure",
      statement: "A figure has two significant figures at least.",
    },
    {
      invariantKind: "departure",
      statement: "A figure reaching ten is written whole.",
    },
    {
      invariantKind: "departure",
      statement: "A figure that is a whole number is written without a decimal place.",
    },
    {
      invariantKind: "departure",
      statement: "A figure that floors onto zero is written as zero rather than as a signed zero.",
    },
    {
      invariantKind: "departure",
      statement: "A reading that is no finite number is written as the number that reading is.",
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
