import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "page-type/index",
  persona: "persona/astra",
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
        "The only readers of `everyPath` left outside its own definition are the path-reaching check and that check's audit. `everyFileIn` and `everyFileOf` are deleted, `import-repointing` asks the world whether a path names something, and the manifest check lists a package's files through the overlay. That check conflates a vocabulary of real paths, which wants every file, with the page set, which the index answers from its own pages. `claimingIn` leaves the index's code last.\n",
    },
    {
      statement: "A file property declares one extension.",
      workingMemory:
        "A case that diverges splits into its own page type rather than taking a second optional property: a module is `.ts`, a component `.tsx`. Four properties vary today. `code` and `test` on modules and `route-code` on routes run `ts` against `tsx`, and `content` on provisioned files runs `conf`, `sh` and `json`. Of 140 stated properties 136 are constant, and 35 of those reach no path at all, their property page setting a `fileName`.\n",
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
