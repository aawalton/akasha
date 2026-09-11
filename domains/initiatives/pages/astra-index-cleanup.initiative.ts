import type { Initiative } from "akasha/domains/initiatives/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  pageTypeSlug: "initiative",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "domain/index",
  persona: "astra",
  intents: [
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
        "Holds `index`, `reads` and `sops`. `index` is a stale copy nothing writes or reads since 234f8ddeac03; taking it away waits on the pty proxies and gateways started before that, which read it and throw where it is absent. `reads/agent` is a dead layout of 487k files, replaced by `reads/path` in b88f7238d4d, and nothing writes or sweeps it.",
    },
    { statement: "`.git/akasha-restored` is gone." },
    { statement: "`.git/answers` is gone." },
    { statement: "`.git/deploy` is gone." },
    { statement: "`.git/harness-push` is gone." },
  ],
} as const satisfies Initiative
