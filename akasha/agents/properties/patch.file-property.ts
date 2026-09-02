import type { FileProperty } from "@akasha/pages-system/file-property"

export type Patch = "diff"

export const patch = {
  id: "01a0627a-4a7e-7c42-a957-2ae0f6d02f9e",
  pageTypeSlug: "file-property",
  slug: "patch",
  propertySlug: "patch",
  definition: "the change an agent has drafted and not yet landed",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A patch is written in the format git already reads.",
    },
    {
      invariantKind: "departure",
      statement: "A patch names the blob a hunk started from.",
    },
    {
      invariantKind: "departure",
      statement: "A patch states no base of its own.",
    },
    {
      invariantKind: "departure",
      statement: "The blobs a patch names are the base the patch is read against.",
    },
    {
      invariantKind: "departure",
      statement: "A patch is kept outside the commit.",
    },
    {
      invariantKind: "departure",
      statement: "No page states a patch.",
    },
    {
      invariantKind: "departure",
      statement: "A page's type is what puts the patch file beside the page.",
    },
  ],
} as const satisfies FileProperty
