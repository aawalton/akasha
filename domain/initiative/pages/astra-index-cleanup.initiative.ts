import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const astraIndexCleanup = {
  id: "01a09108-ec5e-7c3f-9b3c-200822a1ef9b",
  type: "initiative",
  slug: "astra-index-cleanup",
  domain: "page-type/index",
  persona: "persona/astra",
  intentStack: [
    {
      statement:
        "Every file a page's code imports belongs to a page, and a check refuses a new one that does not.",
      workingMemory:
        "339 of 10,935 import targets belong to no page: 312 under `.react-router/types/` and 27 under `+types/`, both written by a tool and held out of git. The two tracked ones, `alan/web/routes.ts` and `temper/web/deploy/addon-bundle-image.ts`, do belong to pages through a declared `fileName`, and what missed them was the reader rather than the pages. The check is `landingOf` and then `claimantOf`, a pair nine checks hold one half of and none joins.\n",
    },
  ],
} as const satisfies Initiative
