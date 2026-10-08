import type { Argument } from "akasha/command/argument/argument.page-type.types.ts"

export const workstationService = {
  id: "01a094c8-25d3-784a-9528-7962c141db1d",
  type: "page-type/argument",
  slug: "workstation-service",
  said: "--service",
  takes: "the workstation service acted on, named by the slug its page carries",
  value: "text",
  placeholder: "slug",
  createdAt: "2026-09-12T08:42:19.987Z",
  updatedAt: "2026-09-15T15:49:36.000Z",
} as const satisfies Argument
