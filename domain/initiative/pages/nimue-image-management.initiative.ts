import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueImageManagement = {
  id: "01a0c505-ddbf-7d4f-bf21-7231bba0728f",
  type: "page-type/initiative",
  slug: "nimue-image-management",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
    {
      statement: "Every image akasha holds sits beside its page as a file property.",
      workingMemory:
        "Not met. Four mechanisms are live: bytes in the SeaweedFS bucket `agent-sessions` served at `/api/image/:imageId`, holding 37 of 38 persona covers and 112 generation-log rows; bytes beside the page as a png file property, 80 PNGs and 298MB under `persona/pages`; a path against a named root that no code resolves, 39 anchors, 44 wallpapers and 2,873 rows over ~15GB in `~/To Process`; and an absolute path, 999 rows, 970 of them under a `~/Pictures/Generated` that is gone.",
    },
    {
      statement: "Every image outside the repository is a page, or is gone.",
      workingMemory:
        "Reaches about 11,200 files and 15GB under `~/To Process`, of which 2,873 are already generation-log rows; 37 persona covers in the SeaweedFS bucket `agent-sessions`, which `/api/image/:imageId` and the `cover` field on 54 committed pages serve; and 999 run-made images at absolute paths, 970 of them lost with the old workstation. Nothing resolves an `image-root`, so the `~/To Process` tree is unreachable from code today.",
    },
  ],
  constraints: [
    "An image's bytes are a file property akasha does not commit, and the image's page is committed.",
  ],
} as const satisfies Initiative
