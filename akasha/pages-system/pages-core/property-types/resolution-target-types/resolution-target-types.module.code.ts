import { type PropertyDefinition, readString } from "../../page-data/page-data.module.code.ts"
import { type PageTypePropertiesMap, parseRollupConfig } from "../rollup/rollup.module.code.ts"

const MAX_DEPTH = 10

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

function collectRollupTargets(
  config: { readonly relationPropertyId: string; readonly targetPropertyId: string },
  pageTypeId: string,
  defsByTypeId: PageTypePropertiesMap,
  visited: Set<string>,
  depth: number,
  out: Set<string>
): undefined {
  if (depth >= MAX_DEPTH) return
  const visitKey = `${pageTypeId}:${config.relationPropertyId}:${config.targetPropertyId}`
  if (visited.has(visitKey)) return
  visited.add(visitKey)

  const targetTypeId = relationTargetTypeId(config.relationPropertyId, pageTypeId, defsByTypeId)
  if (targetTypeId === null) return
  out.add(targetTypeId)

  const targetDefs = defsByTypeId.get(targetTypeId)
  const targetProp = targetDefs?.find((p) => p.id === config.targetPropertyId)
  if (targetProp?.type === "rollup") {
    const nested = parseRollupConfig(targetProp.config)
    if (nested !== null) {
      collectRollupTargets(nested, targetTypeId, defsByTypeId, visited, depth + 1, out)
    }
  }
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
  if (propDef.type === "rollup") {
    const config = parseRollupConfig(propDef.config)
    if (config !== null) {
      collectRollupTargets(config, pageTypeId, defsByTypeId, new Set(), 0, out)
    }
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
