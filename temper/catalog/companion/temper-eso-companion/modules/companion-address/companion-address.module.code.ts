import { namedAs, slugIn } from "akasha/page/modules/address/page-address.module.code.ts"
import {
  type CompanionId,
  companions,
} from "akasha/temper/catalog/companion/companions-core/modules/companions/companions.module.code.ts"
import { temperEsoCompanion } from "akasha/temper/catalog/companion/temper-eso-companion/temper-eso-companion.page-type.ts"

export type CompanionValues = {
  readonly slug: string
  readonly title: string
  readonly companionId: string
}

export function companionAddressOf(companionId: string): string {
  return namedAs(temperEsoCompanion.slug, companionId, null)
}

export function companionIdIn(address: string): CompanionId | undefined {
  const named = slugIn(address)
  return named !== null && companions.has(named) ? named : undefined
}

export function companionValuesOf(companionId: string): CompanionValues {
  const title = companions.has(companionId) ? companions.data[companionId].name : companionId
  return { slug: companionId, title, companionId: companionAddressOf(companionId) }
}
