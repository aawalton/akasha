import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const deploySubject = {
  id: "01a094ff-7a04-7c50-8f97-e1dca1e73810",
  type: "argument",
  slug: "deploy-subject",
  said: "--slug",
  takes: "the app or service to put up, named by the slug its page carries",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
