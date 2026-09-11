import type { Module } from "akasha/code-system/modules/module.page-type.types.ts"

export const urlBadge = {
  id: "01a05b55-a539-7bc7-91a9-d5b91de4f605",
  type: "module",
  slug: "url-badge",
  definition: "a badge showing a url's host as a link out",
  code: "tsx",
  invariants: [
    {
      invariantKind: "departure",
      statement: "The host of a url is read here rather than by each badge showing one.",
    },
    {
      invariantKind: "departure",
      statement: "Text that is no url is answered with no host and shown as the text it is.",
    },
  ],
} as const satisfies Module
