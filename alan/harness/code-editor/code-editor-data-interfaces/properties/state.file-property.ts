import type { FileProperty } from "@akasha/pages-system/file-property"

export type State = "json"

export const state = {
  id: "01a07235-8d04-7c15-8c68-fc8181d908e4",
  pageTypeSlug: "file-property",
  slug: "state",
  propertySlug: "state",
  definition: "what a part of the editor draws now",
  machineWritten: true,
  runsFileLength: false,
  invariants: [
    {
      invariantKind: "departure",
      statement: "The page is committed and the file beside it is not.",
    },
    {
      invariantKind: "departure",
      statement: "A page's type is what puts this file beside the page.",
    },
    {
      invariantKind: "absence",
      statement: "No page states this file.",
    },
    {
      invariantKind: "departure",
      statement:
        "A file holding nothing yet is the editor's cue to draw nothing rather than to wait.",
    },
  ],
} as const satisfies FileProperty
