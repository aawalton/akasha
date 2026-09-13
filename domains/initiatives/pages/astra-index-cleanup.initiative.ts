import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "domain/index",
  persona: "astra",
  intents: [
    {
      statement: "Every worktree has its own identity index and relation index.",
      workingMemory:
        "`.indexes` under each checkout landed in 2e262f8, so a worktree reads the index of the pages that worktree holds. `pinnedTree` builds one as it pins a tree, and refuses a tree whose index will not build. Three trees — container-recipe, service-cluster, service-inference — are still pinned at commits reading `.git/indexes`, and get their own on the next deploy. `akasha git sweep` takes `.git/indexes` once they have.",
    },
    {
      statement: "Git tracks the identity index and the relation index.",
      workingMemory:
        "A change queues its identity and relation entries among its file changes, and the landing lock applies them like any other. `Shadow.filed()` already answers those entries, keyed by path under `.indexes`. `heldBack` splits a landing's edits by `git check-ignore`, so an entry stays out of the commit until `.gitignore` stops naming it. Measured on 251,831 files: +7.0 MiB packed, `git status` 0.45 s to 1.10 s, full checkout 7.8 s to 19.2 s.",
    },
    {
      statement: "A change lands the index entries its own file changes imply, and no others.",
      workingMemory:
        "Both ways: an entry the files do not imply, and an entry the files imply that the change leaves out. The cost is the change's size rather than the repository's, since entries are derived one page at a time already. The hazard is relation: it derives through the type system, so a change to a page type implies entries for every page of that type, far outside the files that change carries, and those are the ones left out.",
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
    {
      statement: "`.git/data` is gone.",
      workingMemory:
        "What is left is `reads/path` and `sops`, both live and together 83 MB. `reads` is what an agent has read, which belongs beside the seat rather than in a store of its own; `sops` holds the age key the secrets are read with.",
    },
    { statement: "`.git/harness-push` is gone." },
  ],
} as const satisfies Initiative
