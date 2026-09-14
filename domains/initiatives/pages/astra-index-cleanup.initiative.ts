import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "page-type/index",
  persona: "astra",
  intentStack: [
    {
      statement: "A change lands the index entries its own file changes imply, and no others.",
      workingMemory:
        "`index-answers-are-level-with-the-change` judges at change since `b0bd8841`, both ways, reading `shadow.filed()` against `change.carried`, so nothing is built again. It has refused no landing of mine since. The hazard it does not reach is the one relation carries: a change to a page type turns answers for every page of that type, far outside the files that change has, and those are left out.\n",
    },
    { statement: "Alan holds the value index's structure correct." },
    {
      statement: "Alan holds the listing index's structure correct.",
      workingMemory:
        "`everyPath` has thirty-three callers and none needs every path. Eight want `package.json`, which `manifestsBeside` answers. Four want the pages of a type, which `everyOfType` answers. Ten read every `.ts` for a spelling. Two want folders, two ask membership. Three are left, two of them the check that polices index use. The file is 15 MB, gitignored, machine-local, and holds about two hundred dead `.uncommitted.` entries.\n",
    },
    { statement: "Alan holds the import index's structure correct." },
    { statement: "Alan holds the rule index's structure correct." },
    {
      statement: "Alan holds the parse cache's structure correct.",
      workingMemory:
        "`.git/cache/parse` is 512 files at 150 MB, keyed by a digest, with a second generation beside each under `-shape-2`. `domains/plain-language/modules/parse-cache/parse-cache.module.code.ts` writes it.",
    },
  ],
} as const satisfies Initiative
