import type { Initiative } from "../initiative.page-type.ts"

export const amyEditorExtension = {
  id: "01a04e9f-4572-71a8-add9-ad391912fd18",
  pageTypeSlug: "initiative",
  slug: "amy-editor-extension",
  domainSlug: "domain/editor-extension",
  personaSlug: "amy",
  parentSlug: "amy-akasha-alone",
  invariants: [
    {
      invariantKind: "gap",
      statement: "Nothing the work panel draws comes from outside the akasha folder.",
    },
    {
      invariantKind: "gap",
      statement: "The old system carries no initiative.",
    },
    {
      invariantKind: "gap",
      statement: "An initiative's persona is drawn beside it.",
    },
    {
      invariantKind: "gap",
      statement: "A seat's initiative is one the akasha system holds.",
    },
  ],
} as const satisfies Initiative
