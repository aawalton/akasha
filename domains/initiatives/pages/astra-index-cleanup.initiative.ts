import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "domain/index",
  persona: "astra",
  intents: [
    {
      statement: "A change refuses a path that is no page's.",
      workingMemory:
        "`remove-folder.change-mechanical-folder.code.ts` calls `remove-file` on every file under the folder, under the `relation-not-left-hanging` and `import-not-left-hanging` guards. Over `.git/data/index` that asked 409k times whether an index answer going left a page's relation hanging, and spent 1333 processor seconds against the 300 it is allowed.",
    },
    {
      statement: "What no page accounts for under the git directory is swept.",
      workingMemory:
        "`akasha infrastructure service sweep` has the shape: it takes away the systemd units the pages no longer account for. `.git/akasha-restored`, `.git/answers`, `.git/deploy`, `.git/pages` and `.git/pages-answers` each sat nine days after the code that wrote them went, because nothing could tell a store from debris.",
    },
    {
      statement: "A refusal over a path under the git directory names the sweep.",
      workingMemory:
        "`block-akasha-shell-writes` and `block-akasha-edits` answer a `.git` path with the line that the akasha commands check the change and commit it, and offer `akasha change apply`, which for an untracked path checks nothing and commits nothing.",
    },
    { statement: "Alan holds the schema index's structure correct." },
    { statement: "Alan holds the declaring index's structure correct." },
    { statement: "Alan holds the value index's structure correct." },
    { statement: "Alan holds the path index's structure correct." },
    { statement: "Alan holds the listing index's structure correct." },
    { statement: "Alan holds the import index's structure correct." },
    { statement: "Alan holds the rule index's structure correct." },
    {
      statement: "Alan holds the parse cache's structure correct.",
      workingMemory:
        "`.git/cache/parse` is 512 files at 150 MB, keyed by a digest, with a second generation beside each under `-shape-2`. `domains/plain-language/parse-cache/parse-cache.module.code.ts` writes it.",
    },
    {
      statement: "`.git/data` is gone.",
      workingMemory:
        "`index` is gone. What is left is `reads` and `sops`, both live. Under `reads`, `agent` is a dead layout of 487k files at 1.9 GB, replaced by `path` in b88f7238d4d, written and swept by nothing; `remove-folder` spends past the 300 processor seconds it is allowed on a folder that size, and `agent/id` divides into 4689 folders rather than into bites.",
    },
    { statement: "`.git/harness-push` is gone." },
  ],
} as const satisfies Initiative
