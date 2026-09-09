import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonHookEagerCapture = {
  id: "01a062b7-adf2-779a-abcc-18497baaf891",
  pageTypeSlug: "module",
  slug: "addon-hook-eager-capture",
  definition: "whether a hook installed at load calls a field read before the field was published",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A field read off a name the file declares of its own is no ambient read.",
    },
    {
      invariantKind: "constraint",
      statement: "A capture the closure itself declares again is not the outer capture.",
    },
    {
      invariantKind: "constraint",
      statement: "A capture read but never called inside the closure is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A closure declared inside the capture's own extent is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "The hook installers recognised are named in the code rather than worked out.",
    },
  ],
} as const satisfies Module
