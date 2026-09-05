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
        "Every wake-day property and every collection property is a calculation now, and no formula-property page remains anywhere in akasha. A calculation loads by transpiling its code file's text, so the pages package reaches one without naming the domain holding it. Left here: the generated registry the compiler checks, moving `holds` off formula-properties when that type goes, and the WorkedX types each page type hand-writes beside its stored type.",
    },
    {
      statement: "A calculation names its inputs rather than reaching for what it likes.",
      workingMemory:
        "One shape rather than three. A same-page read needs no surface at all, the page type already declaring every key and typing it, which is why all twenty-eight landed calculations read `page` alone and none has used `reach` yet. A cross-page read goes through `reach.target<T>(slug)`, answering the same lazily worked page so hops compose. A generated slug-to-type registry would make that generic inferrable without one call site changing.",
    },
    {
      statement:
        "A check refuses a calculation reaching outside its shape or answering twice over.",
      workingMemory:
        "`calculation-imports-only-types` is landed and judging at every phase. It refuses a value import in a computed property's code file, which typecheck passes and which fails only at query time. Proved by a seeded import that resolves: one refusal, typecheck silent. Left here: that the one export is named `work`, which `workIn` already states so a second statement would be one rule in two files, and that `holds` agrees with the return type.",
    },
    {
      statement: "A cycle among calculations is refused by name rather than run.",
      workingMemory:
        "Transitive computed properties are supported, so one page's calculation may read another's and that one may read back. The evaluator carries a stack of pageId#propertySlug frames, entering a lazy getter pushes one, and a frame already there is the ring. Refuse in the shape `unworked` already uses at page-asking line 263: name the key, name the fault, then name every key darkened by it.",
    },
    {
      statement: "No calculation is written as an expression the system parses.",
      workingMemory:
        "No formula-property page remains in akasha. Sixteen went from wake-day, twelve from collection, and three on persona-day were ablated rather than carried because that page type is being rebuilt. Every migration was held to answering exactly what the formula answered, measured over the pages of each type. The parser at `pages/formula` and the formula-property page type can go now, and `holds` moves to computed-properties with them.",
    },
    {
      statement: "Sleep hours and surplus hours answer from a calculation.",
      workingMemory:
        "`wake-day` declares no sleep-hours, spend-hours or surplus-hours and no formula property for them, while every other key of the sixteen has one. `surplusIn` short-circuits on `heldNothing` before it reads surplus-hours, so the reading is null rather than 0. Dispatch is settled: page-asking imports workingOver, works formulas per pageTypeSlug through declaredFor, and unworked refuses by name at line 263.",
    },
    {
      statement: "No page query sums a key no page type declares.",
      workingMemory:
        "Eight page queries reduce and seven of them sum a key no page type declares: activity-calories-on-day, surplus-hours-on-day, sleep-hours-on-day, episodes-watched, episodes-watched-on-day and the two claude-account mean-used queries. Only the first is a spelling fault, its target written kebab where wake-day carries camel; the rest are absent under any spelling. food-entry-plants-since-waking is the one healthy reducer.",
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
