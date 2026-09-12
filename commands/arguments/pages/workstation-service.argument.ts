import type { Argument } from "akasha/commands/arguments/argument.page-type.types.ts"

export const workstationService = {
  id: "01a094c8-25d3-784a-9528-7962c141db1d",
  type: "argument",
  slug: "workstation-service",
  said: "--service",
  takes: "the workstation service acted on, named by the slug its page carries",
  value: "text",
  placeholder: "slug",
} as const satisfies Argument
