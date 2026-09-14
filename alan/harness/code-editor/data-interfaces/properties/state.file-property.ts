import type { FileProperty } from "akasha/pages/file-properties/file-property.page-type.types.ts"

export const state = {
  id: "01a07235-8d04-7c15-8c68-fc8181d908e4",
  type: "file-property",
  slug: "state",
  propertySlug: "state",
  definition: "what a part of the editor draws now",
  extensions: ["json"],
  generated: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "invariant-kind/departure",
      statement: "The page is committed and the file beside that page is not.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A page's type puts this file beside the page.",
    },
    {
      invariantKind: "invariant-kind/absence",
      statement: "No page states this file.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A file with nothing yet is the editor's cue to draw nothing rather than to wait.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "One JSON document has the whole state a part of the editor draws.",
    },
    {
      invariantKind: "invariant-kind/departure",
      statement: "A write replaces the whole file rather than adding to the file.",
    },
  ],
  types: "ts",
} as const satisfies FileProperty
