import type { FileProperty } from "@akasha/pages/file-property"

export type State = "json"

export const state = {
  id: "01a07235-8d04-7c15-8c68-fc8181d908e4",
  pageTypeSlug: "file-property",
  type: "file-property",
  slug: "state",
  propertySlug: "state",
  definition: "what a part of the editor draws now",
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page is committed and the file beside that page is not.",
    },
    {
      invariantKind: "departure",
      statement: "A page's type puts this file beside the page.",
    },
    {
      invariantKind: "absence",
      statement: "No page states this file.",
    },
    {
      invariantKind: "departure",
      statement: "A file with nothing yet is the editor's cue to draw nothing rather than to wait.",
    },
    {
      invariantKind: "departure",
      statement: "One JSON document has the whole state a part of the editor draws.",
    },
    {
      invariantKind: "departure",
      statement: "A write replaces the whole file rather than adding to the file.",
    },
  ],
} as const satisfies FileProperty
