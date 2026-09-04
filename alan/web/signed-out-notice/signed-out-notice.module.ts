import type { Module } from "@akasha/code-system/module"

export const signedOutNotice = {
  id: "01a0655d-dab9-769e-9db5-ee314f862058",
  pageTypeSlug: "module",
  slug: "signed-out-notice",
  definition: "what a reader is shown once their sign-in has lapsed",
  code: "tsx",
} as const satisfies Module
