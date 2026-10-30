import type { ComputedPropertyModule } from "akasha/page/computed-property-module/computed-property-module.page-type.types.ts"

export const readoutTier = {
  id: "01a05f42-92f5-7001-98d7-66166fa0b0f6",
  type: "page-type/computed-property-module",
  slug: "readout-tier",
  definition: "how code finds the color a readout reaches on its readout scale",
  code: "ts",
  test: "ts",
  decisions: [
    {
      decisionKind: "decision-kind/departure",
      statement: "The rungs are read off a scale page rather than named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung stated as text is taken as the number that rung spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure given as text is taken as the number that text spells.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung a scale states nothing for is no rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A climbing scale stating no black rung has its black rung read at zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The black rung read in is taken only where the rungs then climb.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The rungs are ordered from black through blue rather than by the numbers the rungs state.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number reaches the highest rung whose number it has gone over.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number under every rung is black.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "The color a number under every rung is given is named here rather than by a reader.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tier above the tier reached is the next rung the scale states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rung the scale states nothing for is never named as the tier above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The tier above a number under every rung is the first rung that is not black.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How far a number has climbed is the fraction between the rung reached and the rung above.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number under every rung has climbed a fraction that is unknown rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number on the highest rung has no tier above that rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scale of fewer than two rungs says nothing about which way a number runs.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A scale whose numbers shrink from black through blue is taken as a falling scale.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A scale whose rungs neither climb nor fall is refused.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number on a falling scale reaches the first rung from black whose number it has not gone under.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number under every rung of a falling scale is on the best rung that scale states.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A falling rung holds the band from that rung's number up to the number of the rung before.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "How far a number on a falling scale has come is the fraction of the rung's band it has come down.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement:
        "A number over every rung of a falling scale has come a fraction that is unknown rather than zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite reaches no rung.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure is floored rather than rounded.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure has one decimal place at most.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure reaching ten is written whole.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure that is a whole number is written without a decimal place.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A figure that floors onto zero is written as zero rather than as a signed zero.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A number that is not finite is written as JavaScript names that number.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "Each tier has one glyph named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A readout is blue on a rest day it names, whatever its number and with none.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A rest day is read off the readout's page rather than named here.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "The day a color is worked out for is handed in rather than read off the clock.",
    },
    {
      decisionKind: "decision-kind/departure",
      statement: "A day's weekday is the weekday of its calendar date.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here names a readout.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here reaches the store.",
    },
    {
      decisionKind: "decision-kind/absence",
      statement: "Nothing here decides a number is too old to show.",
    },
  ],
  createdAt: "2026-09-01T23:16:33.653Z",
  updatedAt: "2026-10-30T17:36:47.597Z",
} as const satisfies ComputedPropertyModule
