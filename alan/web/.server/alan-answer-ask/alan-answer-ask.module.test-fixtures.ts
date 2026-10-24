import { alanPageTypeAll } from "akasha/person/access/pages/alan-page-type-all.person-access.ts"
import { jennyPageTypeAlanAndJennyTopic } from "akasha/person/access/pages/jenny-page-type-alan-and-jenny-topic.person-access.ts"
import { jennyPageTypeAlanBook } from "akasha/person/access/pages/jenny-page-type-alan-book.person-access.ts"
import { jennyPageTypePageType } from "akasha/person/access/pages/jenny-page-type-page-type.person-access.ts"
import { jennyPageTypePerson } from "akasha/person/access/pages/jenny-page-type-person.person-access.ts"
import { jennyPageTypeSeat } from "akasha/person/access/pages/jenny-page-type-seat.person-access.ts"
import {
  DEEDS,
  type Grant,
  type Reach,
  reachOf,
} from "akasha/person/modules/page-type-access/page-type-access.module.code.ts"

type Access = {
  readonly target: string
  readonly deed: readonly string[]
  readonly narrow?: { readonly key: string; readonly is: string }
}

function grantOf(access: Access): Grant {
  return { target: access.target, deeds: [...access.deed], narrow: access.narrow ?? null }
}

const GRANTS: Readonly<Record<string, readonly Grant[]>> = {
  alan: [grantOf(alanPageTypeAll)],
  jenny: [
    jennyPageTypeSeat,
    jennyPageTypePerson,
    jennyPageTypePageType,
    jennyPageTypeAlanBook,
    jennyPageTypeAlanAndJennyTopic,
  ].map(grantOf),
}

export async function readsAsTheirPages(user: object | null, pageTypeSlug: string): Promise<Reach> {
  const person = (user as { person?: string } | null)?.person ?? "anonymous"
  return reachOf(GRANTS[person] ?? [], pageTypeSlug, DEEDS.READ, person)
}
