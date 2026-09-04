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
        "`pages/formula-properties/formula-property.page-type.ts` already does the formula case, so this generalises rather than starts. It states `holds` and a `formula` string and extends page-property alone. `code-system/modules/module.page-type.ts` carries exactly code, test and test-fixtures, so extending it hands over the three file properties rather than declaring them. Start from `pages/page-properties/page-property.page-type.ts`.",
    },
    {
      statement: "A calculation names its inputs rather than reaching for what it likes.",
      workingMemory:
        "The point of the sub-types is control of inputs. A rollup, an aggregate and a formula each hand their function a different shape, and the function reaches only what its shape hands it.",
    },
    {
      statement:
        "A check refuses a calculation reaching outside its shape or answering twice over.",
      workingMemory:
        "Two guarantees the expression language gave for nothing. formula-property carries `A formula answers the same over one page however often the formula is asked`, which an expression cannot break and a function can by reading a clock or a network. And a signature settles what is handed in rather than what a code file imports. This check judges both the imports of a computed property's code file and its purity. Whether one type with three signatures is enough depends on this check.",
    },
    {
      statement: "No calculation is written as an expression the system parses.",
      workingMemory:
        "`pages/page-formulas` parses text like `case({faith-points} >= 2 -> 4, otherwise -> 0)` and `({active-calories} ?? 0) + ({strength-calories} ?? 0)`. wake-day carries sixteen formula properties: six *-level, six *-stoplight, stoplights, total-level, activity-calories, strength-calories. `pages/service/page-asking` imports the parser, and `alan/tracking/daily/day-figures` has no code importer. All sixteen are carried to functions before the parser goes.",
    },
    {
      statement: "Sleep hours and surplus hours answer from a calculation.",
      workingMemory:
        "`wake-day` declares no sleep-hours, spend-hours or surplus-hours and no formula property for them, while every other key of the sixteen has one. `surplusIn` short-circuits on `heldNothing` before it reads surplus-hours, so the reading is null rather than 0. Dispatch is settled: page-asking imports workingOver, works formulas per pageTypeSlug through declaredFor, and unworked refuses by name at line 263.",
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
