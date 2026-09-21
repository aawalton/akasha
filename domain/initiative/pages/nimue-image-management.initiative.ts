import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueImageManagement = {
  id: "01a0c505-ddbf-7d4f-bf21-7231bba0728f",
  type: "page-type/initiative",
  slug: "nimue-image-management",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "Every image akasha holds is a page.",
      workingMemory:
        "Not met. `image.page-type.ts` declares no properties, while `persist-image.module.code.ts` writes title, engine, service, operation, model, prompt, seed, image-path and inference-run, which land as 3,872 rows in `alan.generation-log.images.jsonl` rather than as pages. About 11,200 files under `~/To Process` are recorded nowhere, or only as one of those rows. 121 image pages exist today: 39 anchors, 38 covers and 44 wallpapers.",
    },
    {
      statement: "Every image page and its bytes sit in one folder.",
      workingMemory:
        "Today they are scattered over four page types in three trees: 39 anchors under `persona/anchor-image/pages`, 38 covers under `persona/cover-image/pages`, 44 wallpapers under `persona/wallpaper/pages`, the `image` page type under `infrastructure/inference/generation/image` with no pages at all, and 80 committed PNGs beside persona pages under `persona/pages`. One folder is within what akasha already does: `alan/music/catalog/track/pages` holds 8,118 entries.",
    },
    {
      statement: "Every image akasha holds sits beside its page as a file property.",
      workingMemory:
        "Not met. Four mechanisms are live: bytes in the SeaweedFS bucket `agent-sessions` served at `/api/image/:imageId`, holding 37 of 38 persona covers and 112 generation-log rows; bytes beside the page as a png file property, 80 PNGs and 298MB under `persona/pages`; a path against a named root that no code resolves, 39 anchors, 44 wallpapers and 2,873 rows over ~15GB in `~/To Process`; and an absolute path, 999 rows, 970 of them under a `~/Pictures/Generated` that is gone.",
    },
    {
      statement: "An image states the grade Alan marked it.",
      workingMemory:
        "`grade` is a grade property, `Alan's mark for how good a thing is`, on a ladder from `F` up to `S+` stated once on `page/grade-property/grade-property.page-type.ts` with a color for each rung. It is declared on `page` itself and optional, so every page may state one and `image` needs no declaration of its own. What is left here is that no image is a page yet, so nothing carries a grade.",
    },
    {
      statement: "No two images akasha holds are the same bytes.",
      workingMemory:
        "Not met. Of 11,287 image files under `~/To Process` and `persona/pages`, 4,468 are a copy of something: 2,080 pictures are held more than once, 2,388 copies are redundant, and those redundant copies hold 3.09GB. The heaviest are 1,511 in `zimage-outputs`, 875 in `Personas`, 747 in `To Sort` and 624 in `Sorted`, and 78 of the 80 committed persona PNGs are byte-identical to a file under `~/To Process`. Measured by sha256 over every file whose size another file shares.",
    },
    {
      statement: "Every image Alan has already graded keeps that grade.",
      workingMemory:
        "`~/To Process/Sorted` holds the grade as a folder and nowhere else: S+ 1, S 19, S- 29, A+ 97, A 160, A- 299, B+ 402, B 222, B- 166, 1,395 files in all. A migration reading only bytes loses every mark. 624 of those files are byte-identical to a file elsewhere in the tree, so a dedup keeping an arbitrary copy loses the mark too, and the graded copy is the one to keep. `To Sort` holds 1,520 files carrying no mark.",
    },
    {
      statement: "Every image outside the repository is a page, or is gone.",
      workingMemory:
        "Reaches about 11,200 files and 15GB under `~/To Process`, of which 2,873 are already generation-log rows; 37 persona covers in the SeaweedFS bucket `agent-sessions`, which `/api/image/:imageId` and the `cover` field on 54 committed pages serve; and 999 run-made images at absolute paths, 970 of them lost with the old workstation. Nothing resolves an `image-root`, so the `~/To Process` tree is unreachable from code today.",
    },
    {
      statement:
        "Every image a deployed reader shows comes from the pages service on the workstation.",
      workingMemory:
        "The path exists. No web manifest sets `PAGES_SERVICE_ORIGIN`, so `originOf` falls through to `page-forwarder.page-forwarder.svc.cluster.local:8787`, a socat deployment carrying a pod's request over the tailnet to the workstation. `filing` in `file-answering.module.code.ts` already reads an uncommitted file property, taking the extension off the property page where the page states none. `/api/wallpaper` fetches this way today. What is missing is that no image is a file property.",
    },
    {
      statement: "No image's bytes are in the object store.",
      workingMemory:
        "Not met, and not worked before the migration above. `/api/image/:imageId` serves 37 persona covers, 112 generation-log rows and 14 food entries out of the SeaweedFS bucket `agent-sessions` under `images/<pageId>.png`, with a legacy `persona-images/` prefix costing a third HEAD on every miss. 54 committed pages hold a literal `/api/image/<uuid>` in `cover`, and `PageCover` writes an arbitrary pasted URL into that same field.",
    },
  ],
  constraints: [
    "An image's bytes are a file property akasha does not commit, and the image's page is committed.",
  ],
} as const satisfies Initiative
