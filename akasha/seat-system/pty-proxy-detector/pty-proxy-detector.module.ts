import type { Module } from "@akasha/code-system/module"

export const ptyProxyDetector = {
  id: "01a069c2-9357-7001-9948-0152b29b3de9",
  pageTypeSlug: "module",
  slug: "pty-proxy-detector",
  definition:
    "the first arrival of the dev-channel marker in a terminal's bytes, escape codes removed",
  code: "ts",
} as const satisfies Module
