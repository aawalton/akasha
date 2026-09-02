import type { Domain } from "@akasha/domain-system/domain"
import type { PageType } from "@akasha/pages-system/page-type"
import type { Markup } from "./properties/markup.file-property.ts"

export type EsoInterface = Domain & {
  markup: Markup
}

export const esoInterface = {
  id: "01a06036-9b76-7bf2-b21b-2f45a8b14ac4",
  pageTypeSlug: "page-type",
  slug: "eso-interface",
  definition: "one XML document the game reads",
  pluralSlug: "eso-interfaces",
  partSlugs: ["file-property/markup"],
  extendsSlug: "page-type/domain",
  properties: [{ pagePropertySlug: "markup", required: true, many: false }],
  invariants: [
    {
      invariantKind: "departure",
      statement: "An interface's XML is held in a file beside the page.",
    },
    {
      invariantKind: "departure",
      statement: "Nothing here is imported.",
    },
    {
      invariantKind: "departure",
      statement: "The game reads the XML rather than running it.",
    },
    {
      invariantKind: "departure",
      statement: "A control the XML declares is reached from Lua by the control's name.",
    },
    {
      invariantKind: "departure",
      statement: "The addon loading an interface names that interface.",
    },
  ],
} as const satisfies PageType
