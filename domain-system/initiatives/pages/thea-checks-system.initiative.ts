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
        "Six steps for each check: 1 the failure category the check prevents, 2 the file set the check covers, 3 the cost of a full-repo run, 4 whether a patch run does only the minimum, 5 the cost of the limited run, 6 whether the check is green. The order is alphabetical over `akasha audit --check`, 44 checks in all. Cursor: declarations-agree is closed, and the next check is domain-is-named-by-a-parent, at step 1.",
    },
    {
      statement: "The new system carries every check of the old system that still applies.",
      workingMemory:
        "Ninety old scanners: 11 already carried, 12 hold no rule, 49 judge what has no subject under `akasha/` and wait on the migration, 18 had a subject and are all settled. Carried: no-non-null-assertion, no-angle-bracket-cast, manifest-names-what-is-reached, shell-clean, the property-id taboo term. The other 13 were left, most having nothing here to judge. Twenty-one of the ninety cannot run at all, the graph layer they read being deleted. Resume at the 49 once the migration reaches them.",
    },
    { statement: "The old system carries no check." },
    { statement: "No finding is filed on checks-system or any part beneath it." },
    { statement: "No gap invariant is written on checks-system or any part beneath it." },
  ],
  constraints: ["Each check takes one turn per step, and no turn carries two steps."],
} as const satisfies Initiative
