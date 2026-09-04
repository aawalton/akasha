import type { Initiative } from "../initiative.page-type.ts"

export const nimueComputedProperties = {
  id: "01a06d12-61e3-7c20-b357-a7a04f16e903",
  pageTypeSlug: "initiative",
  slug: "nimue-computed-properties",
  domainSlug: "workspace-package/pages-system",
  personaSlug: "nimue",
  intents: [
    {
      statement: "A property states the calculation that fills it.",
      workingMemory:
        "`pages/formula-properties/formula-property.page-type.ts` already does the formula case, so this generalises rather than starts. It states `holds` and a `formula` string. What is missing is rollup and aggregate, and a calculation that is a function rather than text. Start from `pages/page-properties/page-property.page-type.ts` and `code-system/modules/module.page-type.ts`, which the new type extends both of.",
    },
    {
      statement: "A calculation names its inputs rather than reaching for what it likes.",
      workingMemory:
        "The point of the sub-types is control of inputs. A rollup, an aggregate and a formula each hand their function a different shape, and the function reaches only what its shape hands it. Unsettled: whether the shape is enforced by the type alone or by a check as well.",
    },
    {
      statement: "No calculation is written as an expression the system parses.",
      workingMemory:
        "`pages/page-formulas` parses text like `case({faith-points} >= 2 -> 4, otherwise -> 0)` and `({active-calories} ?? 0) + ({strength-calories} ?? 0)`. wake-day carries sixteen formula properties: six *-level, six *-stoplight, stoplights, total-level, activity-calories, strength-calories. `pages/service/page-asking` imports the parser, and `alan/tracking/daily/day-figures` has no code importer. All sixteen are carried to functions before the parser goes.",
    },
    {
      statement: "Sleep hours and surplus hours answer from a calculation.",
      workingMemory:
        "`wake-day` declares no sleep-hours, spend-hours or surplus-hours and no formula property for them, while every other key of the sixteen has one. `surplusIn` short-circuits on `heldNothing` before it reads surplus-hours, so the reading is null rather than 0. Settle first whether a day answers the same through the store's page-asking, which applies formulas, as through day-place's local asking, which shows no formula step.",
    },
    {
      statement: "No page query sums a key no page type declares.",
      workingMemory:
        "Two page queries name wake-day for keys it does not declare: activity-calories-on-day and surplus-hours-on-day. The census found an inversion: the ten keys with no code reader are the ten wake-day declares, and the three with live readers are the three it does not. The views tracking-value-levels and tracking-value-points draw the levels and stoplights.",
    },
  ],
  constraints: [
    "A computed property extends a module and a page property both.",
    "A calculation is a function exported from the computed property's own code file.",
    "Rollup, aggregate and formula are each a computed property type of their own, each with its own function shape.",
    "A calculation reaches only what its shape hands it.",
    "Activity is not part of this work: its keys are declared and written, and its silence is an outage.",
  ],
} as const satisfies Initiative
