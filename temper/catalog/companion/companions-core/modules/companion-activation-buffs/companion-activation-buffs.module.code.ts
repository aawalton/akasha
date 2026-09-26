import { companionCatalog } from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export function companionActivationBuffName(id: string): string | undefined {
  return companionCatalog().activationBuffs.find((one) => one.id === id)?.name
}
