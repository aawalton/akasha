import type { Module } from "@akasha/code-system/module"

export const deviceSecretSync = {
  id: "01a0655d-dab9-7b76-a767-7101666ee41b",
  pageTypeSlug: "module",
  slug: "device-secret-sync",
  definition: "the device secret minted and kept in the shell's keychain",
  code: "tsx",
  test: "tsx",
} as const satisfies Module
