import type { Initiative } from "../initiative.page-type.ts"

export const nimueComputedProperties = {
  id: "01a06d12-61e3-7c20-b357-a7a04f16e903",
  pageTypeSlug: "initiative",
  slug: "nimue-computed-properties",
  domainSlug: "workspace-package/pages",
  personaSlug: "nimue",
  intents: [
    {
      statement: "A property states the calculation that fills it.",
      workingMemory:
        "strength-calories is landed as the first computed property, and a query answers volume/7 exactly on every day carrying strength work. Its code file exports `work`, which page-asking loads by transpiling that file's text rather than importing it, so the pages package reaches a calculation without naming the domain holding it. Left here: the generated registry the compiler checks, and moving `holds` off formula-properties when that type goes.",
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
        "`pages/formulas` parses text like `case({faith-points} >= 2 -> 4, otherwise -> 0)`. Fifteen formula properties are left on wake-day: six *-level, six *-stoplight, stoplights, total-level and activity-calories. strength-calories is already a calculation, and a formula reads a computed key as a formula reads a stored one, so the rest carry one at a time. `alan/tracking/daily/day-figures` has no code importer. All fifteen are carried before the parser goes.",
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
    "Where two parents declare one property, the last one named decides.",
    "A page type with two parents shows under each, so a tree shows that type twice.",
    "A property two parents declare is taken from the nearer, and from the last named where both are equally near.",
    "A shape change is carried by a second property rather than by one batch, because a property declares `many` for every page at once.",
    "A calculation is a function exported from the computed property's own code file.",
    "One computed property type carries every calculation rather than one type for each shape.",
    "A calculation reaches only what its shape hands it.",
    "A rollup writes a stored value, so a rollup is no computed property and is not this work.",
    "Following a relation backwards is out of scope, so a calculation reaches forward alone.",
    "A stored read and a computed read are written the same way on the page handed in.",
    "A fault of the evaluator is repaired in the evaluator rather than handed to whoever writes a calculation.",
    "A page file may state no value for a computed property, so what is stored and what is worked are two types.",
    "Activity is not part of this work: its keys are declared and written, and its silence is an outage.",
    "A registry naming each calculation is machine-written rather than composed by an agent.",
    "A registry is generated where `bun.lock` is generated, so a mechanical change leaves it current.",
    "The pages package imports no domain, so a calculation is loaded at boot rather than compiled in.",
  ],
} as const satisfies Initiative
