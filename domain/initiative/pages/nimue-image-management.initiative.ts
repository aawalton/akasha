import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueImageManagement = {
  id: "01a0c505-ddbf-7d4f-bf21-7231bba0728f",
  type: "page-type/initiative",
  slug: "nimue-image-management",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "An image page states the fields an image carries.",
      workingMemory:
        "`image.page-type.ts` declares no properties at all, while `persist-image.module.code.ts` writes title, engine, service, operation, model, prompt, seed, image-path and inference-run. Those land as rows in `alan.generation-log.images.jsonl` rather than as pages. The type also states that an image catalogued from disk names no run, and no command catalogues one.",
    },
    {
      statement: "No persona's picture bytes are committed to git.",
      workingMemory:
        "`desktop-wallpaper` and `mobile-wallpaper` are png file properties holding bytes, so 80 PNGs sit in `persona/pages`, 298MB, one pair per persona and up to 6.4MB each. They are read off disk for `plasma-apply-wallpaperimage` and served unauthenticated at `/api/wallpaper`, the one image route with no sign-in.",
    },
  ],
} as const satisfies Initiative
