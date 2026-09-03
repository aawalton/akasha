import type { Module } from "@akasha/code-system/module"

export const atlasAuthProvider = {
  id: "01a06582-6b30-7761-90bd-02db7aa863c8",
  pageTypeSlug: "module",
  slug: "atlas-auth-provider",
  definition: "the signed-in user Atlas holds and the session it pushes to the page store",
  code: "tsx",
} as const satisfies Module
