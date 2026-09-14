import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "domain/index",
  persona: "astra",
  intentStack: [
    {
      statement: "A change lands the index entries its own file changes imply, and no others.",
      workingMemory:
        "`index-answers-are-level-with-the-change` judges at change since `b0bd8841`, both ways, reading `shadow.filed()` against `change.carried`, so nothing is built again. It has refused no landing of mine since. The hazard it does not reach is the one relation carries: a change to a page type turns answers for every page of that type, far outside the files that change has, and those are left out.\n",
    },
    { statement: "Alan holds the value index's structure correct." },
    {
      statement: "Alan holds the path index's structure correct.",
      workingMemory:
        "The path index is gone. `claimantOf` in `path-claiming` answers which page a file belongs to off that file's own name, and the listing index composes the paths a page claims rather than reading them off a tree. `.indexes/path` still holds 498 MB nothing writes, which the next whole refresh sweeps, no index page naming that folder.\n",
    },
    { statement: "Alan holds the listing index's structure correct." },
    { statement: "Alan holds the import index's structure correct." },
    { statement: "Alan holds the rule index's structure correct." },
    {
      statement: "Alan holds the parse cache's structure correct.",
      workingMemory:
        "`.git/cache/parse` is 512 files at 150 MB, keyed by a digest, with a second generation beside each under `-shape-2`. `domains/plain-language/modules/parse-cache/parse-cache.module.code.ts` writes it.",
    },
  ],
} as const satisfies Initiative
