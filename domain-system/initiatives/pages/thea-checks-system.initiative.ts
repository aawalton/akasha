import type { Initiative } from "../initiative.page-type.ts"

export const theaChecksSystem = {
  id: "01a04e69-e40a-7287-a2e2-2c49c76c0dee",
  pageTypeSlug: "initiative",
  slug: "thea-checks-system",
  domainSlug: "workspace-package/checks",
  personaSlug: "thea",
  intents: [
    {
      statement: "Every check is clean.",
      workingMemory:
        "Six steps for each check: 1 the failure category the check prevents, 2 the file set the check covers, 3 the cost of a full-repo run, 4 whether a patch run does only the minimum, 5 the cost of the limited run, 6 whether the check is green. Alphabetical, over 43 code-checks. Cursor: declarations-agree closed; domain-is-named-by-a-parent step 1 closed and the check widened to the whole spanning tree, now at step 2. The `outside akasha` concept is cleaned up at file-has-its-page, check 4.",
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
        "Alan ruled the figures wrong and confusing: aelwyn holds 50,909 against a computed 22,537, unsettled. Retire leaf-first — command `ops tracking recompute-totals`, then `recompute-totals`, `health-total-points`, `landTotalPoints` out of `session-points-totals`, `persona-total-landing`. Then the field off `session-points-compute` and `persona-recipe-rows`, 3 persona views, `persona-all`, 10 persona pages, 6 value pages, the declarations on `persona` and `value`, the property page, and the finding.",
    },
  ],
  constraints: ["Each check takes one turn per step, and no turn carries two steps."],
} as const satisfies Initiative
