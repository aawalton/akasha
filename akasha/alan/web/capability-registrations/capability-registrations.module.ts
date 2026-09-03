import type { Module } from "@akasha/code-system/module"

export const capabilityRegistrations = {
  id: "01a0655d-daa6-7e06-8e4b-c7091e3bc5e4",
  pageTypeSlug: "module",
  slug: "capability-registrations",
  definition: "the capabilities this site puts on the page runtime at boot",
  code: "ts",
} as const satisfies Module
