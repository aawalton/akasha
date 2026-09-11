import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { PersonAccessKind } from "akasha/persons/accesses/properties/person-access-kind.relation-property.types.ts"
import type { PersonAccessPerson } from "akasha/persons/accesses/properties/person-access-person.relation-property.types.ts"
import type { PersonAccessServes } from "akasha/persons/accesses/properties/person-access-serves.text-property.types.ts"
import type { PersonAccessTarget } from "akasha/persons/accesses/properties/person-access-target.text-property.types.ts"

export type PersonAccess = Page & {
  person: PersonAccessPerson
  accessKind: PersonAccessKind
  target: PersonAccessTarget
  serves?: PersonAccessServes
}
