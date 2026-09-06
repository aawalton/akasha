import type { Initiative } from "../initiative.page-type.ts"

export const nimueComputedProperties = {
  id: "01a06d12-61e3-7c20-b357-a7a04f16e903",
  pageTypeSlug: "initiative",
  slug: "nimue-computed-properties",
  domainSlug: "workspace-package/page",
  personaSlug: "nimue",
  intents: [
    {
      statement:
        "A check refuses a calculation reaching outside its shape or answering twice over.",
      workingMemory:
        "`calculation-imports-only-types` is landed and judging at patch alone. It refuses a value import in a computed property's code file, which typecheck passes and which fails only at query time. Proved by a seeded import that resolves: one refusal, typecheck silent. Left here: that the one export is named `work`, which `workIn` already states so a second statement would be one rule in two files, and that `holds` agrees with the return type.",
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
    "The type carrying a page type's calculations beside its stored keys is machine-written rather than composed by an agent.",
    "That type is generated where `bun.lock` is generated, so a mechanical change leaves it current.",
    "The pages package imports no domain, so a calculation is loaded at boot rather than compiled in.",
  ],
} as const satisfies Initiative
