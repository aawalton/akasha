import type { Id } from "../../properties/id.text-property.ts"

export type ById = {
  readonly id: Id
}

export function isById(one: object): one is ById {
  return "id" in one
}
