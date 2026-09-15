import type { Page } from "akasha/page/page.page-type.types.ts"
import type { PersonAuthorityKind } from "akasha/person/authority/properties/person-authority-kind.relation-property.types.ts"
import type { PersonAuthorityPerson } from "akasha/person/authority/properties/person-authority-person.relation-property.types.ts"
import type { PersonAuthorityTarget } from "akasha/person/authority/properties/person-authority-target.text-property.types.ts"

export type PersonAuthority = Page & {
  person: PersonAuthorityPerson
  authorityKind: PersonAuthorityKind
  target: PersonAuthorityTarget
}
