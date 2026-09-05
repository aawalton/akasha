import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/checks",
  personaSlug: "thea",
  intents: [
    {
      statement: "The tests beside a changed file judge the change that carries it.",
      workingMemory:
        "36 of 43 checks run on no phase and this is one, so nothing is ever refused for a red test. Patch is the ratchet and starts before the tree reaches zero, so a green tree is not the bar. The work is the world: tests run in a tree written from the change, carrying the index it leaves, swept however it ends. `akasha test` takes no root override and `bun test` is hook-refused, so nothing runs a test elsewhere. First the root override, then the world, then re-entrancy, then measure what patch refuses.",
    },
    {
      statement:
        "A page type narrows an inherited property's reach to the collection it is part of.",
      workingMemory:
        "168 routes across 7 apps share one page type and `slug` is unique per type, so `home` repeats 7 times, `sign-in` 6, `api.errors` 6; 5 route tests wait on this. `part-of` is declared and branched at index-identity.index.code.ts:29 but never written, read back or tested. The `unique` declaration field landed. Order: seed a test against the PART_OF branch, which has never run; then the identity map; then the consumers handing a page-type slug as the scope, each answering empty rather than erroring.",
    },
    {
      statement: "Every check is clean.",
      workingMemory:
        "Six steps per check: 1 the failure category prevented, 2 the file set covered, 3 the cost over one file not judged, 4 over one judged, 5 over the whole repository, 6 whether green. The entries jsonl holds every run. 43 checks, alphabetical over all 43 whether or not one runs already. Done: domain-is-named-by-a-parent, email-address-is-well-formed. Now: file-has-its-page, steps 1 and 2 done; it judges what a change carries, so audit waits on routes and the old system.",
    },
    {
      statement: "Every file the repository tracks is claimed by a page.",
      workingMemory:
        "630 tracked files no page claims, measured by diffing .git/data/index/path against `git ls-files`, seeded both ways: dotfiles/bin/akasha reads unclaimed, akasha.domain.ts reads claimed. 155 are routes; 149 are cluster-check module bodies whose pages were never written, though 129 claimed check bodies import them; 114 are lua-compiler/lualib/src; the rest are spread over service-system, infrastructure and alan. file-has-its-page cannot reach audit until this is zero.",
    },
    {
      statement: "The new system carries every check of the old system that still applies.",
      workingMemory:
        "Ninety old scanners: 11 already carried, 12 hold no rule, 49 judge what has no subject under `akasha/` and wait on the migration, 18 had a subject and are all settled. Carried: no-non-null-assertion, no-angle-bracket-cast, manifest-names-what-is-reached, shell-clean, the property-id taboo term. The other 13 were left, most having nothing here to judge. Twenty-one of the ninety cannot run at all, the graph layer they read being deleted. Resume at the 49 once the migration reaches them.",
    },
    { statement: "The old system carries no check." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
    {
      statement: "Every page property is in a properties folder for the page type defining it.",
      workingMemory:
        "Found while making the parts a spanning tree: the folder holding a property's file and the page type introducing that property disagree in real cases. `category-slug` sits under `monarch-months` while `category-rule` introduces the property; `effect-type` and `metric-id` sit under `temper-catalog-things` while `temper-companion-trait` introduces both. `introduced-property-is-a-part` judges the declaration and says outright that the folder is not judged. No check judges the folder.",
    },
    {
      statement: "No persona and no value carries a stored lifetime points total.",
      workingMemory:
        "Alan ruled the figures wrong and confusing: aelwyn holds 50,909 against a computed 22,537, unsettled. Retire leaf-first — `recompute-totals`, `health-total-points`, `landTotalPoints` out of `session-points-totals`, `persona-total-landing`. Then the field off `session-points-compute` and `persona-recipe-rows`, 3 persona views, `persona-all`, 10 persona pages, 6 value pages, the declarations on `persona` and `value`, the property page, and the finding. The command that opened this list went with the ops CLI.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
