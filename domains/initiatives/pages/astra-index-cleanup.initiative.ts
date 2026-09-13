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
        "`indexIn` hops through `gitFolderIn` to the main repository in `index-surface`, so all six `.git/trees/*` worktrees read one index. `<repoRoot>/.index` kills that hop, and a worktree with no index refuses every read `answered` guards, so whatever makes a worktree builds it — 19 s for 71,151 pages. `.index` is skipped by `tree-reading`, `code-tests`, `stale-folders`, `.dockerignore` and `biome.json`, and stays in `.gitignore`, which is also what lets the indexer write it.",
    },
    {
      statement: "Git tracks the identity index and the relation index.",
      workingMemory:
        "A change queues its identity and relation entries among its file changes, and the landing lock applies them like any other. Build that while `.index` is still in `.gitignore` — the name there is what grants `repository-is-written-by-a-change` leave to write, so dropping it without the generated case leaves the indexer unable to write. Measured on 251,831 files: +7.0 MiB packed, `git status` 0.45 s → 1.10 s, `.git/index` 26 MB → 68 MB, full checkout 7.8 s → 19.2 s.",
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
