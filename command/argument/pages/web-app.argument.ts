import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const webApp = {
  id: "01a094b5-b34b-7163-b5b1-7e00a8ef3ddf",
  type: "page-type/argument",
  slug: "web-app",
  said: "--app",
  takes: "which web app, named by the slug that app's page carries",
  value: "text",
  placeholder: "name",
  createdAt: "2026-09-12T08:22:11.019Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
