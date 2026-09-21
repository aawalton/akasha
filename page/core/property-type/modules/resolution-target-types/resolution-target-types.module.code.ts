import {
  type PageTypePropertiesMap,
  type PropertyDefinition,
  readString,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"

function relationTargetTypeId(
  relationPropertyId: string,
  pageTypeId: string,
  defsByTypeId: PageTypePropertiesMap
): string | null {
  const defs = defsByTypeId.get(pageTypeId)
  if (!defs) return null
  const relationProp = defs.find((p) => p.id === relationPropertyId)
  if (!relationProp) return null
  if (relationProp.type !== "relation" && relationProp.type !== "multi-relation") return null
  return readString(relationProp.config, "targetPageTypeId")
}

export function collectResolutionTargetTypeIds(
  propDef: PropertyDefinition,
  pageTypeId: string,
  defsByTypeId: PageTypePropertiesMap
): ReadonlySet<string> {
  const out = new Set<string>()
  if (propDef.type === "relation" || propDef.type === "multi-relation") {
    const target = readString(propDef.config, "targetPageTypeId")
    if (target !== null) out.add(target)
    return out
  }
  if (propDef.type === "aggregate") {
    const rel = readString(propDef.config, "relationPropertyId")
    if (rel !== null) {
      const target = relationTargetTypeId(rel, pageTypeId, defsByTypeId)
      if (target !== null) out.add(target)
    }
    return out
  }
  return out
}
