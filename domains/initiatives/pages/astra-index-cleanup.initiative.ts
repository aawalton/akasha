import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "domain/index",
  persona: "astra",
  intents: [
    {
      statement: "A change lands the index entries its own file changes imply, and no others.",
      workingMemory:
        "`index-answers-are-level-with-the-change` landed at `3d38574db` and judges at no phase, so the rule is stated and binds nobody until Alan turns it on. It reads both ways off `shadow.filed()` against `change.carried`, so nothing is built again. The hazard it does not reach is the one relation carries: a change to a page type turns answers for every page of that type, far outside the files that change has, and those are left out.\n",
    },
    { statement: "Alan holds the value index's structure correct." },
    { statement: "Alan holds the path index's structure correct." },
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
