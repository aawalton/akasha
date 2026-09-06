import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/checks",
  personaSlug: "thea",
  intents: [
    {
      statement: "Every check is cheap enough for patch and runs there.",
      workingMemory:
        "Four steps: 1 category, 2 right files at patch, 3 cheap at patch, 4 turned on. Seed a fault before believing a zero: a flag set true is no proof a check runs, but the count of checks judging rises when one goes on. Measure the replacement before believing it cheaper. Peers add 0-3 MiB a run at patch. key-names-one-property is on refusing 57. lint-clean is on refusing 302 of 80388. manifest-lands-on-a-file is on and green, flat at 39ms. manifest-names-what-is-reached next.",
    },
    {
      statement: "The tests beside a changed file judge the change that carries it.",
      workingMemory:
        "36 of 43 checks run on no phase and this is one, so nothing is ever refused for a red test. Patch is the ratchet and starts before the tree reaches zero, so a green tree is not the bar. The work is the world: tests run in a tree written from the change, carrying the index it leaves, swept however it ends. `akasha test` takes no root override and `bun test` is hook-refused, so nothing runs a test elsewhere. First the root override, then the world, then re-entrancy, then measure what patch refuses.",
    },
    {
      statement:
        "A page type narrows an inherited property's reach to the collection it is part of.",
      workingMemory:
        "168 routes across 7 apps share one page type and `slug` is unique per type, so `home` repeats 7 times, `sign-in` 6, `api.errors` 6; 5 route tests wait on this. `part-of` works and is not the gap: book-section declares it over 455 pages, the index files them under the parent's slug, and a clash is refused both within one change and against the index. Try declaring `part-of` on the route slug, the same shape. Then the identity map, then the consumers handing a page-type slug as the scope.",
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
      statement: "Every check is cheap enough for audit.",
      workingMemory:
        "Split off the patch sequence, which ends at turning a check on at patch. The cost over the whole repository is judged here. runsOnAudit is false on every check by Alan's call, an audit being asked for one check at a time. file-has-its-page over the whole tree read 120804 paths, 4.15s wall and 1.74GB peak added, but that count is the change's size rather than the check's own. file-length reads it in 1.9s but peaks 2.8GB. It cannot reach audit until no tracked file is unclaimed.",
    },
    {
      statement: "Every check is green.",
      workingMemory:
        "Was the last of the steps taken over each check, split off because a check goes on at patch before the tree reaches zero and so is on while still refusing. Nothing measures greenness per check yet. file-has-its-page is the worked case: 629 files claimed by no page, none refused today because patch judges only what a change carries. instant-property-slug-closes-with-at is on and green. Touching a file no page claims is refused, so a rename cannot reach one: atlas-web has 21 routes and no pages.",
    },
  ],
  constraints: [
    "Each check takes one turn per step, and no turn carries two steps.",
    "Work a step turns up is finished rather than filed, however long that makes the initiative.",
  ],
} as const satisfies Initiative
