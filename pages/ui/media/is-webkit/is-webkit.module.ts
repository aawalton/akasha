import type { Module } from "akasha/code/modules/module.page-type.types.ts"

export const isWebkit = {
  id: "01a05c27-31ee-7145-9758-a40473555cdb",
  type: "module",
  slug: "is-webkit",
  definition: "whether a user agent is WebKit rather than a browser built on its engine",
  code: "ts",
} as const satisfies Module
