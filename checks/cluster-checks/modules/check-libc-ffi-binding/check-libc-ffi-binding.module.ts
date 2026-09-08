import type { Module } from "@akasha/code/module"

export const checkLibcFfiBinding = {
  id: "01a0815f-df7b-7b45-9de5-80c65abe2a52",
  pageTypeSlug: "module",
  slug: "check-libc-ffi-binding",
  definition: "the run refusing a dlopen call that reaches libc by soname",
  code: "ts",
} as const satisfies Module
