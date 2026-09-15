import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "page-type/index",
  persona: "persona/astra",
  intentStack: [
    {
      statement: "A file property declares one extension.",
      workingMemory:
        "A case that diverges splits into its own page type rather than taking a second optional property: a module is `.ts`, a component `.tsx`. Five of 162 file properties vary today: `code`, `test`, `route-code` and `route-test` run `ts` against `tsx`, and `content` on provisioned files runs `sh`, `conf` and `json`. Nothing refuses a second extension, and `extensions.text-property.ts` states an invariant blessing one, so that page turns as well.\n",
    },
    {
      statement: "Alan holds the parse cache's structure correct.",
      workingMemory:
        "`.git/cache/parse` holds a folder per model, each sharded into 256 `.jsonl` by the first two characters of a key, the key being a sha256 over the model and the text cut to 32 characters and the line carrying the whole text back to compare. 512 files at 162 MB over two folders, one of them a dead first shape. `domain/plain-language/modules/parse-cache/parse-cache.module.code.ts` writes it.\n",
    },
    {
      statement:
        "Every file a page's code imports belongs to a page, and a check refuses a new one that does not.",
      workingMemory:
        "339 of 10,935 import targets belong to no page: 312 under `.react-router/types/` and 27 under `+types/`, both written by a tool and held out of git. The two tracked ones, `alan/web/routes.ts` and `temper/web/deploy/addon-bundle-image.ts`, do belong to pages through a declared `fileName`, and what missed them was the reader rather than the pages. The check is `landingOf` and then `claimantOf`, a pair nine checks hold one half of and none joins.\n",
    },
    {
      statement:
        "The edge and import indexes go, what references a page being read from the file beside it.",
      workingMemory:
        "The import index is gone whole, and the edge index has no reader left. What remains: its writers in `index-settling` and `indexing`, `relationFiled` in the reading fixtures, `index/index-edge` in this page type's parts, four invariants here written about the import index, and the `index` property on `graph-edge` with the three invariants around it. `.index/edge/` is 108,664 tracked files and 12.4 MB of paths against a 2 MB argument ceiling, so no change can land its removal.\n",
    },
  ],
} as const satisfies Initiative
