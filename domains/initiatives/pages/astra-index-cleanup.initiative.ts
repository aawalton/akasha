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
