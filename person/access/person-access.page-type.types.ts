import type { Page } from "akasha/page/page.page-type.types.ts"
import type { PersonAccessDeed } from "akasha/person/access/properties/person-access-deed.relation-property.types.ts"
import type { PersonAccessKind } from "akasha/person/access/properties/person-access-kind.relation-property.types.ts"
import type { PersonAccessNarrow } from "akasha/person/access/properties/person-access-narrow.record-property.types.ts"
import type { PersonAccessPerson } from "akasha/person/access/properties/person-access-person.relation-property.types.ts"
import type { PersonAccessServes } from "akasha/person/access/properties/person-access-serves.relation-property.types.ts"
import type { PersonAccessTarget } from "akasha/person/access/properties/person-access-target.text-property.types.ts"

export type PersonAccess = Page & {
  person: PersonAccessPerson
  accessKind: PersonAccessKind
  target: PersonAccessTarget
  serves?: PersonAccessServes
  deed: PersonAccessDeed
  narrow?: PersonAccessNarrow
}
