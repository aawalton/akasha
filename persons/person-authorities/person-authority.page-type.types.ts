import type { Page } from "../../pages/page.page-type.types.ts"
import type { PersonAuthorityKind } from "./properties/person-authority-kind.relation-property.ts"
import type { PersonAuthorityPerson } from "./properties/person-authority-person.relation-property.ts"
import type { PersonAuthorityTarget } from "./properties/person-authority-target.text-property.ts"

export type PersonAuthority = Page & {
  person: PersonAuthorityPerson
  authorityKind: PersonAuthorityKind
  target: PersonAuthorityTarget
}
