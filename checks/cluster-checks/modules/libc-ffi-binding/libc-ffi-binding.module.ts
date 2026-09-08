import type { Module } from "@akasha/code/module"

export const libcFfiBinding = {
  id: "01a08171-e610-76b7-863f-bc09fb6a3594",
  pageTypeSlug: "module",
  slug: "libc-ffi-binding",
  definition: "the dlopen calls in a source that name a libc object by its soname",
  code: "ts",
} as const satisfies Module
