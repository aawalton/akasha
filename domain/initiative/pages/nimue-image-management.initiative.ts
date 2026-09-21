import type { Initiative } from "akasha/domain/initiative/initiative.page-type.types.ts"

export const nimueImageManagement = {
  id: "01a0c505-ddbf-7d4f-bf21-7231bba0728f",
  type: "page-type/initiative",
  slug: "nimue-image-management",
  domain: "domain/technology",
  persona: "persona/nimue",
  intentStack: [
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
