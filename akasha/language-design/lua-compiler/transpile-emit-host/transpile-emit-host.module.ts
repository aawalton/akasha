import type { Module } from "@akasha/code-system/module"

export const transpileEmitHost = {
  id: "01a06758-8ed1-7000-9826-eaa2aead9981",
  pageTypeSlug: "module",
  slug: "transpile-emit-host",
  definition: "the file-system interface of directory checks, reads, and writes",
  code: "ts",
} as const satisfies Module
