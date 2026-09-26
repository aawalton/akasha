import {
  type CompanionTable,
  type CompanionTemplate,
  companionCatalog,
} from "akasha/temper/catalog/companion/companions-core/modules/companion-catalog/companion-catalog.module.code.ts"

export type CompanionId = string

export function companions(): CompanionTable<CompanionTemplate> {
  const catalog = companionCatalog()
  return {
    data: catalog.companionsById,
    ids: catalog.companions.map((companion) => companion.id),
    list: catalog.companions,
    has: (id) => catalog.companionsById[id] !== undefined,
  }
}

export function companionAt(companionId: CompanionId): CompanionTemplate {
  const companion = companionCatalog().companionsById[companionId]
  if (companion === undefined) throw new Error(`no companion page answers to \`${companionId}\``)
  return companion
}

export function getCompanionName(companionId: CompanionId): string {
  return companionAt(companionId).name
}

export function getCompanionIdByDefId(defId: number): CompanionId | undefined {
  if (defId === 0) return undefined
  return companionCatalog().companions.find((companion) => companion.esoCompanionId === defId)?.id
}

export function getDefIdByCompanionId(companionId: CompanionId): number | undefined {
  return companionCatalog().companionsById[companionId]?.esoCompanionId
}
