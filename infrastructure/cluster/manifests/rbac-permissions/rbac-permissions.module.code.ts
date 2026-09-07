import type { NonResourceRule, Rule } from "@akasha/workflow-language/rbac-types"

export interface RbacRequirement {
  readonly apiGroup: string
  readonly resource: string
  readonly verb: string
  readonly resourceName?: string
}

export interface PermissionSet {
  readonly unrestricted: ReadonlySet<string>
  readonly named: ReadonlyMap<string, ReadonlySet<string>>
}

export const tupleOf = (apiGroup: string, resource: string, verb: string): string =>
  `${apiGroup}|${resource}|${verb}`

export const isResourceRule = (rule: Rule | NonResourceRule): rule is Rule =>
  !("nonResourceURLs" in rule)

export function buildPermissions(rules: Iterable<Rule>): PermissionSet {
  const unrestricted = new Set<string>()
  const named = new Map<string, Set<string>>()
  for (const rule of rules) {
    const names = rule.resourceNames
    for (const apiGroup of rule.apiGroups) {
      for (const resource of rule.resources) {
        for (const verb of rule.verbs) {
          const tuple = tupleOf(apiGroup, resource, verb)
          if (names === undefined || names.length === 0) {
            unrestricted.add(tuple)
            continue
          }
          const allowed = named.get(tuple) ?? new Set<string>()
          for (const name of names) allowed.add(name)
          named.set(tuple, allowed)
        }
      }
    }
  }
  return { unrestricted, named }
}

export function isCovered(perms: PermissionSet, req: RbacRequirement): boolean {
  const tuple = tupleOf(req.apiGroup, req.resource, req.verb)
  if (perms.unrestricted.has(tuple)) return true
  if (req.resourceName === undefined) return false
  return perms.named.get(tuple)?.has(req.resourceName) === true
}

export function tupleSet(
  rules: Iterable<Rule | NonResourceRule>,
  options: { readonly skipNamed: boolean }
): ReadonlySet<string> {
  const held = new Set<string>()
  for (const rule of rules) {
    if (!isResourceRule(rule)) continue
    if (options.skipNamed && rule.resourceNames) continue
    for (const apiGroup of rule.apiGroups) {
      for (const resource of rule.resources) {
        for (const verb of rule.verbs) held.add(tupleOf(apiGroup, resource, verb))
      }
    }
  }
  return held
}

export function patchRuleWhitelist(rules: Iterable<Rule | NonResourceRule>): ReadonlySet<string> {
  const names = new Set<string>()
  for (const rule of rules) {
    if (!isResourceRule(rule)) continue
    if (!rule.apiGroups.includes("rbac.authorization.k8s.io")) continue
    const resources = new Set(rule.resources)
    if (!resources.has("clusterroles") && !resources.has("clusterrolebindings")) continue
    if (!rule.verbs.includes("patch")) continue
    if (rule.resourceNames === undefined) continue
    for (const name of rule.resourceNames) names.add(name)
  }
  return names
}
