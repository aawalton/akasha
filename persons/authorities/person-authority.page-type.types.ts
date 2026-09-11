import type { Page } from "akasha/pages/page.page-type.types.ts"
import type { PersonAuthorityKind } from "akasha/persons/authorities/properties/person-authority-kind.relation-property.types.ts"
import type { PersonAuthorityPerson } from "akasha/persons/authorities/properties/person-authority-person.relation-property.types.ts"
import type { PersonAuthorityTarget } from "akasha/persons/authorities/properties/person-authority-target.text-property.types.ts"

export type PersonAuthority = Page & {
  person: PersonAuthorityPerson
  authorityKind: PersonAuthorityKind
  target: PersonAuthorityTarget
}
