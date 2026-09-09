import type { Module } from "@akasha/code/module"

export const payload = {
  id: "01a06984-c896-7000-ada1-908266f4c9b0",
  pageTypeSlug: "module",
  type: "module",
  slug: "payload",
  definition: "a call's --file-path paired with the body its --content-file holds",
  code: "ts",
} as const satisfies Module
