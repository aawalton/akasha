import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const idleSave = {
  id: "01a06826-794a-7698-b659-62bf92ba16c3",
  pageTypeSlug: "page-type",
  type: "page-type",
  slug: "idle-save",
  definition: "where one player's idle game is",
  pluralSlug: "idle-saves",
  extends: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A player has one save and no second save.",
    },
    {
      invariantKind: "departure",
      statement: "A write replaces the whole save rather than amending part of that save.",
    },
    {
      invariantKind: "departure",
      statement: "The tick banks a save on its own cadence whether or not the player is watching.",
    },
    {
      invariantKind: "gap",
      statement: "A save is kept in Supabase and no save yet exists as a page of this type.",
    },
    {
      invariantKind: "gap",
      statement:
        "The state a save has and that save's player are properties this type does not yet declare.",
    },
  ],
  types: "ts",
} as const satisfies PageType
