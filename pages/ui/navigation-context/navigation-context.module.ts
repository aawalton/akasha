import type { Module } from "@akasha/code-system/module"

export const navigationContext = {
  id: "01a05cce-25ec-7499-ac36-739e7996488b",
  pageTypeSlug: "module",
  slug: "navigation-context",
  definition:
    "the pathname, the calls that navigate and the link component taken from the host router",
  code: "tsx",
} as const satisfies Module
