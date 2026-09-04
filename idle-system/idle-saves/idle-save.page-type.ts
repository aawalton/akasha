import type { Page } from "@akasha/pages-system/page"
import type { PageType } from "@akasha/pages-system/page-type"

export type IdleSave = Page

export const idleSave = {
  id: "01a06826-794a-7698-b659-62bf92ba16c3",
  pageTypeSlug: "page-type",
  slug: "idle-save",
  definition: "where one player's idle game stands",
  pluralSlug: "idle-saves",
  extendsSlug: ["page-type/page"],
  invariants: [
    {
      invariantKind: "departure",
      statement: "A player has one save and no more.",
    },
    {
      invariantKind: "departure",
      statement: "A write replaces the whole save rather than amending part of it.",
    },
    {
      invariantKind: "departure",
      statement: "The tick banks a save on its own cadence whether or not the player is watching.",
    },
    {
      invariantKind: "gap",
      statement: "A save is kept in Supabase and no save yet stands as a page of this type.",
    },
    {
      invariantKind: "gap",
      statement:
        "The state a save holds and the player it belongs to are properties this type does not yet declare.",
    },
  ],
} as const satisfies PageType
