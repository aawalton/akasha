import type { Page } from "../../pages/page.page-type.types.ts"
import type { PersonAccessKind } from "./properties/person-access-kind.relation-property.ts"
import type { PersonAccessPerson } from "./properties/person-access-person.relation-property.ts"
import type { PersonAccessServes } from "./properties/person-access-serves.text-property.ts"
import type { PersonAccessTarget } from "./properties/person-access-target.text-property.ts"

export type PersonAccess = Page & {
  person: PersonAccessPerson
  accessKind: PersonAccessKind
  target: PersonAccessTarget
  serves?: PersonAccessServes
}
