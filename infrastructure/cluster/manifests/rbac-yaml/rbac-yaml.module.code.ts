import type { NonResourceRule, Rule } from "@akasha/workflow-language/rbac-types"
import { LABELS } from "../rbac-identity/rbac-identity.module.code.ts"

function inlineArray(values: readonly string[]): string {
  return `[${values.map((one) => `"${one}"`).join(", ")}]`
}

export function formatLabels(
  indent: number,
  labels: Readonly<Record<string, string>> = LABELS
): string {
  const pad = " ".repeat(indent)
  return Object.entries(labels)
    .map(([key, value]) => `${pad}${key}: ${value}`)
    .join("\n")
}

export function formatClusterRule(rule: (Rule | NonResourceRule) & { comment?: string }): string {
  const lines: string[] = []
  if (rule.comment != null) {
    lines.push(`  # ${rule.comment}`)
  }
  if ("nonResourceURLs" in rule) {
    lines.push(`  - nonResourceURLs: ${inlineArray(rule.nonResourceURLs)}`)
    lines.push(`    verbs: ${inlineArray(rule.verbs)}`)
  } else {
    lines.push(`  - apiGroups: ${inlineArray(rule.apiGroups)}`)
    lines.push(`    resources: ${rule.resourcesRaw ?? inlineArray(rule.resources)}`)
    lines.push(`    verbs: ${inlineArray(rule.verbs)}`)
    const { resourceNames } = rule
    if (resourceNames) {
      lines.push("    resourceNames:")
      for (const name of resourceNames) {
        lines.push(`      - ${name}`)
      }
    }
  }
  return lines.join("\n")
}

export function serviceAccount(
  saName: string,
  saNamespace: string,
  labels: Readonly<Record<string, string>>
): string {
  return `apiVersion: v1
kind: ServiceAccount
metadata:
  name: ${saName}
  namespace: ${saNamespace}
  labels:
${formatLabels(4, labels)}`
}

export function namespacedRole(
  name: string,
  namespace: string,
  labels: Readonly<Record<string, string>>,
  rules: ReadonlyArray<(Rule | NonResourceRule) & { comment?: string }>
): string {
  return `apiVersion: rbac.authorization.k8s.io/v1
kind: Role
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
${formatLabels(4, labels)}
rules:
${rules.map(formatClusterRule).join("\n")}`
}

export function namespacedRoleBinding(
  name: string,
  namespace: string,
  labels: Readonly<Record<string, string>>,
  roleName: string,
  subjects: string
): string {
  return `apiVersion: rbac.authorization.k8s.io/v1
kind: RoleBinding
metadata:
  name: ${name}
  namespace: ${namespace}
  labels:
${formatLabels(4, labels)}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: Role
  name: ${roleName}
subjects:
${subjects}`
}

export function clusterRoleWithRules(
  name: string,
  labels: Readonly<Record<string, string>>,
  rules: ReadonlyArray<(Rule | NonResourceRule) & { comment?: string }>
): string {
  const rulesStr = rules.map(formatClusterRule).join("\n")

  return `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRole
metadata:
  name: ${name}
  labels:
${formatLabels(4, labels)}
rules:
${rulesStr}`
}

export function clusterRoleBinding(
  name: string,
  labels: Readonly<Record<string, string>>,
  subjects: string
): string {
  return `apiVersion: rbac.authorization.k8s.io/v1
kind: ClusterRoleBinding
metadata:
  name: ${name}
  labels:
${formatLabels(4, labels)}
roleRef:
  apiGroup: rbac.authorization.k8s.io
  kind: ClusterRole
  name: ${name}
subjects:
${subjects}`
}
