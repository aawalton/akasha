import type { PageType } from "akasha/pages/types/page-type.page-type.types.ts"

export const namedExtensionProperty = {
  id: "01a09135-c42e-7d48-a589-1fe7b7baca81",
  type: "page-type",
  slug: "named-extension-property",
  definition: "a page property held in the files beside a page closing with one extension",
  pluralSlug: "named-extension-properties",
  parts: ["text-property/extension-name"],
  extends: ["page-type/page-property"],
  properties: [
    { pageProperty: "text-property/extension-name", required: true, many: false },
    { pageProperty: "boolean-property/holds-bytes", required: false, many: false },
    { pageProperty: "boolean-property/runs-file-length", required: false, many: false },
  ],
  invariants: [
    {
      invariantKind: "departure",
      statement: "The property speaks for every file beside the page with that extension.",
    },
    {
      invariantKind: "departure",
      statement: "A file under a folder beside the page is left to the folder's own property.",
    },
    {
      invariantKind: "departure",
      statement: "A page beside those files claims them, so nothing names each file one at a time.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying these files hold bytes says so of every one of them.",
    },
    {
      invariantKind: "departure",
      statement: "A property saying these files are judged for no length says so of each of them.",
    },
  ],
  types: "ts",
} as const satisfies PageType
