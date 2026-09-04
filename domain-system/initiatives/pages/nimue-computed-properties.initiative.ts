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
        "Nothing in pages-system carries a calculation today. `pages-system/page-queries` states `reduction` and `targetKey` and sums a key a page already holds, so a key nothing writes sums to nothing rather than refusing. Start from `pages-system/page-properties/page-property.page-type.ts` and `code-system/modules/module.page-type.ts`, which the new type extends both of.",
    },
    {
      statement: "A calculation names its inputs rather than reaching for what it likes.",
      workingMemory:
        "The point of the sub-types is control of inputs. A rollup, an aggregate and a formula each hand their function a different shape, and the function reaches only what its shape hands it. Unsettled: whether the shape is enforced by the type alone or by a check as well.",
    },
    {
      statement: "Sleep hours and surplus hours answer from a calculation.",
      workingMemory:
        "`wake-day` declares no sleep-hours, spend-hours or surplus-hours, and 0 of 136 day pages carries one. `pages-system/page-queries/pages/sleep-hours-on-day.page-query.ts` sums sleep-hours over wake-day. The markdown deriver computed these at query time; the migration took it away without moving the arithmetic, and `alan/tracking/daily/day-place/day-place.module.code.ts` lines 169-176 names sixteen such keys. Last true answer Sep 3 06:45, dark since 06:50 at commit fb018236ed.",
    },
    {
      statement: "No page query sums a key no page type declares.",
      workingMemory:
        "Sixteen keys are named at day-place.module.code.ts:169-176 and only three are diagnosed here. The rest are uncounted. A check refusing a query whose target key no page type declares would have caught all sixteen at the migration rather than one reading at a time.",
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
