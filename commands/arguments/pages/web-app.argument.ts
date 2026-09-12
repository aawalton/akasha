import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const webApp = {
  id: "01a094b5-b34b-7163-b5b1-7e00a8ef3ddf",
  type: "argument",
  slug: "web-app",
  said: "--app",
  takes: "which web app, named by the slug that app's page carries",
  value: "text",
  placeholder: "name",
} as const satisfies Argument
