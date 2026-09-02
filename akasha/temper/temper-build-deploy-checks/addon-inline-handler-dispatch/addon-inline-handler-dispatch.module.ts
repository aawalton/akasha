import type { Module } from "../../../code-system/modules/module.page-type.ts"

export const addonInlineHandlerDispatch = {
  id: "01a062a8-e76a-7191-8366-e4e515c97683",
  pageTypeSlug: "module",
  slug: "addon-inline-handler-dispatch",
  definition: "whether an inline markup handler's body is one call to a named global and no more",
  code: "ts",
  invariants: [
    {
      invariantKind: "constraint",
      statement: "A body naming no governed namespace is not judged.",
    },
    {
      invariantKind: "constraint",
      statement: "A body mentioning the namespace a second time is no single dispatch.",
    },
    {
      invariantKind: "constraint",
      statement: "A body carrying anything after the closing bracket is no single dispatch.",
    },
    {
      invariantKind: "constraint",
      statement: "A body starting anywhere but at the namespace is no single dispatch.",
    },
    {
      invariantKind: "constraint",
      statement: "A handler whose body is blank is not judged.",
    },
  ],
} as const satisfies Module
