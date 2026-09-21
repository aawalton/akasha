import {
  type PropertyDefinition,
  readString,
} from "akasha/page/core/modules/page-data/page-data.module.code.ts"

export function collectResolutionTargetTypeIds(propDef: PropertyDefinition): ReadonlySet<string> {
  const out = new Set<string>()
  if (propDef.type === "relation" || propDef.type === "multi-relation") {
    const target = readString(propDef.config, "targetPageTypeId")
    if (target !== null) out.add(target)
    return out
  }
  return out
}
