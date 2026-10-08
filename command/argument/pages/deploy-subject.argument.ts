import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const deploySubject = {
  id: "01a094ff-7a04-7c50-8f97-e1dca1e73810",
  type: "page-type/argument",
  slug: "deploy-subject",
  said: "--slug",
  takes: "the app or service to put up, named by the slug its page carries",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T09:42:46.020Z",
  updatedAt: "2026-09-15T15:49:18.000Z",
} as const satisfies Argument
