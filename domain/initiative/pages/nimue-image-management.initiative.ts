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
        "Met for every image page: `file-property/image-bytes` is an uncommitted png beside each, written by plain copy since the guard lets an ignored path through, and a jpg is converted on the way in. Still elsewhere: 167 objects in the SeaweedFS bucket `agent-sessions` under `images/`, 38 of them persona covers that are pages already, which `/api/image/:imageId` serves; and 80 committed PNGs beside persona pages as `desktop-wallpaper` and `mobile-wallpaper`, byte-identical to image pages.",
    },
    {
      statement: "No two images akasha holds are the same bytes.",
      workingMemory:
        "Among image pages it holds by construction: a slug is `image-` and the first sixteen hex of the sha256 of the bytes, so a second copy is the same page. Still doubled: the 80 committed PNGs beside persona pages, each byte-identical to an image page, which go once `desktop-wallpaper` and `mobile-wallpaper` are relations to images; and 38 persona covers held again in the object store.",
    },
    {
      statement:
        "Every image a deployed reader shows comes from the pages service on the workstation.",
      workingMemory:
        "`/api/image/:imageId` on the web app asks the pages service for the image page of that id and then for its `bytes`, and answers them with the slug as the ETag; the object store is not read. Deployed at `f8292dfbcc8`, and proven from inside the web pod, where `/ask` then `/file` over the page-forwarder answered Nimue's cover, 1,137,978 png bytes. `/api/wallpaper` reads a persona's `mobile-wallpaper` file the same way. No other deployed reader shows an image.",
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
