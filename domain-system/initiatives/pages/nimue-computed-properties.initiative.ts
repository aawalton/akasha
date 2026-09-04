import type { Initiative } from "../initiative.page-type.ts"

export const nimueComputedProperties = {
  id: "01a06d12-61e3-7c20-b357-a7a04f16e903",
  pageTypeSlug: "initiative",
  slug: "nimue-computed-properties",
  domainSlug: "workspace-package/pages-system",
  personaSlug: "nimue",
  intents: [
    {
      statement: "A page type takes its properties from more than one type.",
      workingMemory:
        "441 page type files each state one extendsSlug and each becomes a list. The readers that matter are pages-core/schema/page-type-inheritance, page-types/descent, page-types/declared-properties, indexes/property-carrying, and carriedBy in index-entries, which climbs the chain to settle which file properties a page type carries. Three more readers are in markdown-pages and leave anyway. Unsettled: what happens where two parents declare one property differently.",
    },
    {
      statement: "A property states the calculation that fills it.",
      workingMemory:
        "The surface is settled. One export named `work`, typed `Work<Page, Held>`, taking `(page, reach)`. The page hands over stored and computed reads alike, `page.faithPoints` and `page.faithLevel` written the same way, the computed ones lazy getters over the synchronous index. `pages/formula-properties/formula-property.page-type.ts` is what this generalises, and `code-system/modules/module.page-type.ts` hands over code, test and test-fixtures.",
    },
    {
      statement: "A calculation names its inputs rather than reaching for what it likes.",
      workingMemory:
        "One shape rather than three. A same-page read needs no surface at all, the page type already declaring every key and typing it, which is why all sixteen existing formulas need nothing but `page`. A cross-page read goes through `reach.target<T>(slug)`, answering the same lazily worked page so hops compose. A generated slug-to-type registry would make that generic inferrable without one call site changing.",
    },
    {
      statement:
        "A check refuses a calculation reaching outside its shape or answering twice over.",
      workingMemory:
        "Two guarantees the expression language gave for nothing: a function can read a clock or a network, and a signature settles what is handed in rather than what a code file imports. The check judges the imports of a computed property's code file, that its one export is named `work` and matches `Work<Page, Held>`, and that `holds` agrees with the return type.",
    },
    {
      statement: "A cycle among calculations is refused by name rather than run.",
      workingMemory:
        "Transitive computed properties are supported, so one page's calculation may read another's and that one may read back. The evaluator carries a stack of pageId#propertySlug frames, entering a lazy getter pushes one, and a frame already there is the ring. Refuse in the shape `unworked` already uses at page-asking line 263: name the key, name the fault, then name every key darkened by it.",
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
    "One computed property type carries every calculation rather than one type for each shape.",
    "A calculation reaches only what its shape hands it.",
    "A rollup writes a stored value, so a rollup is no computed property and is not this work.",
    "Following a relation backwards is out of scope, so a calculation reaches forward alone.",
    "A stored read and a computed read are written the same way on the page handed in.",
    "A fault of the evaluator is repaired in the evaluator rather than handed to whoever writes a calculation.",
    "A page file may state no value for a computed property, so what is stored and what is worked are two types.",
    "Activity is not part of this work: its keys are declared and written, and its silence is an outage.",
  ],
} as const satisfies Initiative
