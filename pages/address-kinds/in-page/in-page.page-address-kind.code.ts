import type { Id } from "../../properties/id.text-property.ts"

export type InPage = {
  readonly id: Id
}

export function isInPage(one: object): one is InPage {
  return "id" in one
}
