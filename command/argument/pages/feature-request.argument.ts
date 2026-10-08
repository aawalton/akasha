import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const featureRequest = {
  id: "01a0c501-03d8-7b61-b47b-2c800016371f",
  type: "page-type/argument",
  slug: "feature-request",
  said: "--feature-request",
  takes: "a feature request, named by the slug that request declares",
  value: "text",
  placeholder: "feature-request",
  createdAt: "2026-09-21T17:26:13.208Z",
  updatedAt: "2026-09-21T17:26:50.000Z",
} as const satisfies Argument
