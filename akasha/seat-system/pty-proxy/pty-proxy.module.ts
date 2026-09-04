import type { Module } from "@akasha/code-system/module"

export const ptyProxy = {
  id: "01a069c2-9357-7003-bbea-553c17c4e0dd",
  pageTypeSlug: "module",
  slug: "pty-proxy",
  definition:
    "a pseudo-terminal around a seat's supervisor, carrying keys, size and death both ways",
  code: "ts",
} as const satisfies Module
