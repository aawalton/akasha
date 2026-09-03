import { z } from "zod"
import type { RbacRequirement } from "../rbac-permissions/rbac-permissions.module.code.ts"

export const FIRST_CAPTURE_SCHEMA = z.tuple([z.string(), z.string()])

export interface UnmodelledResource {
  subcommand: string
  resourceToken: string
}

export interface ParsedKubectlCommand {
  namespace: string | null
  reqs: readonly RbacRequirement[]
  unmodelled: readonly UnmodelledResource[]
}

const KUBECTL_RESOURCE_MAP: Record<string, { apiGroup: string; resource: string }> = {
  deployment: { apiGroup: "apps", resource: "deployments" },
  deployments: { apiGroup: "apps", resource: "deployments" },
  statefulset: { apiGroup: "apps", resource: "statefulsets" },
  statefulsets: { apiGroup: "apps", resource: "statefulsets" },
  daemonset: { apiGroup: "apps", resource: "daemonsets" },
  daemonsets: { apiGroup: "apps", resource: "daemonsets" },
  job: { apiGroup: "batch", resource: "jobs" },
  jobs: { apiGroup: "batch", resource: "jobs" },
  cronjob: { apiGroup: "batch", resource: "cronjobs" },
  cronjobs: { apiGroup: "batch", resource: "cronjobs" },
  limitrange: { apiGroup: "", resource: "limitranges" },
  limitranges: { apiGroup: "", resource: "limitranges" },
  storageclass: { apiGroup: "storage.k8s.io", resource: "storageclasses" },
  storageclasses: { apiGroup: "storage.k8s.io", resource: "storageclasses" },
  runtimeclass: { apiGroup: "node.k8s.io", resource: "runtimeclasses" },
  runtimeclasses: { apiGroup: "node.k8s.io", resource: "runtimeclasses" },
  configmap: { apiGroup: "", resource: "configmaps" },
  configmaps: { apiGroup: "", resource: "configmaps" },
  secret: { apiGroup: "", resource: "secrets" },
  secrets: { apiGroup: "", resource: "secrets" },
  pod: { apiGroup: "", resource: "pods" },
  pods: { apiGroup: "", resource: "pods" },
  service: { apiGroup: "", resource: "services" },
  svc: { apiGroup: "", resource: "services" },
  services: { apiGroup: "", resource: "services" },
  pvc: { apiGroup: "", resource: "persistentvolumeclaims" },
  persistentvolumeclaim: { apiGroup: "", resource: "persistentvolumeclaims" },
  persistentvolumeclaims: { apiGroup: "", resource: "persistentvolumeclaims" },
  sa: { apiGroup: "", resource: "serviceaccounts" },
  serviceaccount: { apiGroup: "", resource: "serviceaccounts" },
  serviceaccounts: { apiGroup: "", resource: "serviceaccounts" },
  namespace: { apiGroup: "", resource: "namespaces" },
  namespaces: { apiGroup: "", resource: "namespaces" },
  role: { apiGroup: "rbac.authorization.k8s.io", resource: "roles" },
  roles: { apiGroup: "rbac.authorization.k8s.io", resource: "roles" },
  rolebinding: { apiGroup: "rbac.authorization.k8s.io", resource: "rolebindings" },
  rolebindings: { apiGroup: "rbac.authorization.k8s.io", resource: "rolebindings" },
  clusterrole: { apiGroup: "rbac.authorization.k8s.io", resource: "clusterroles" },
  clusterroles: { apiGroup: "rbac.authorization.k8s.io", resource: "clusterroles" },
  clusterrolebinding: { apiGroup: "rbac.authorization.k8s.io", resource: "clusterrolebindings" },
  clusterrolebindings: { apiGroup: "rbac.authorization.k8s.io", resource: "clusterrolebindings" },
  rs: { apiGroup: "apps", resource: "replicasets" },
  replicaset: { apiGroup: "apps", resource: "replicasets" },
  replicasets: { apiGroup: "apps", resource: "replicasets" },
}

function plainToken(token: string | undefined): string | undefined {
  if (token === undefined) return undefined
  if (token.startsWith("-") || token.includes("=") || token.includes("$")) return undefined
  const unquoted = token.replace(/^["']|["']$/g, "")
  return unquoted === "" ? undefined : unquoted
}

interface ResourceTarget {
  apiGroup: string
  resource: string
  resourceName?: string
}

function resolveTarget(resourceStr: string, nameToken?: string): ResourceTarget | null {
  const [head, ...rest] = resourceStr.split("/")
  if (head === undefined) return null
  const mapping = KUBECTL_RESOURCE_MAP[head.toLowerCase()]
  if (mapping === undefined) return null
  const inlineName = rest.join("/")
  const resourceName = inlineName !== "" ? inlineName : plainToken(nameToken)
  if (resourceName === undefined) return { ...mapping }
  return { ...mapping, resourceName }
}

export function parseKubectlCommands(text: string): readonly ParsedKubectlCommand[] {
  const results: ParsedKubectlCommand[] = []

  const parts = text.split(/\bkubectl\b/)
  for (const fragment of parts.slice(1)) {
    const joined = fragment.replace(/\\\n\s*/g, " ")
    const cmdMatchResult = FIRST_CAPTURE_SCHEMA.safeParse(
      joined.match(/^([^|;`$()]*?)(?:[|;`]|$|\n)/)
    )
    const cmdStr = cmdMatchResult.success ? cmdMatchResult.data[1] : joined
    const tokens = cmdStr.trim().split(/\s+/)

    if (tokens.length === 0) continue

    let namespace: string | null = null
    const cleanTokens: string[] = []
    for (let j = 0; j < tokens.length; j++) {
      const token = tokens[j]
      if (token === undefined) continue
      const next = tokens[j + 1]
      if ((token === "-n" || token === "--namespace") && next !== undefined) {
        namespace = next
        j++
      } else if (token.startsWith("-n=") || token.startsWith("--namespace=")) {
        const [, value] = token.split("=")
        namespace = value ?? null
      } else {
        cleanTokens.push(token)
      }
    }

    if (cleanTokens.length === 0) continue
    const [subcommand] = cleanTokens
    if (subcommand === undefined) continue

    if (["apply", "cluster-info", "auth", "diff"].includes(subcommand)) continue

    if (namespace != null && /\$/.test(namespace)) {
      namespace = null
    }

    const reqs: RbacRequirement[] = []
    const unmodelled: UnmodelledResource[] = []

    const demand = (
      resourceToken: string,
      verb: string,
      options: { nameToken?: string; subresource?: string } = {}
    ): undefined => {
      const target = resolveTarget(resourceToken, options.nameToken)
      if (target === null) {
        unmodelled.push({ subcommand, resourceToken })
        return
      }
      const resource =
        options.subresource === undefined
          ? target.resource
          : `${target.resource}/${options.subresource}`
      reqs.push(
        target.resourceName === undefined
          ? { apiGroup: target.apiGroup, resource, verb }
          : { apiGroup: target.apiGroup, resource, verb, resourceName: target.resourceName }
      )
    }

    if (subcommand === "set" && cleanTokens[1] === "image") {
      const resourceToken = cleanTokens.find(
        (t) =>
          !t.startsWith("-") && !t.includes("=") && t !== "set" && t !== "image" && t.includes("/")
      )
      if (resourceToken != null) demand(resourceToken, "patch")
    } else if (subcommand === "rollout") {
      const action = cleanTokens[1]
      const resourceToken = cleanTokens.find(
        (t) =>
          !t.startsWith("-") &&
          t !== "rollout" &&
          t !== action &&
          (t.includes("/") || KUBECTL_RESOURCE_MAP[t.toLowerCase()])
      )
      if (resourceToken != null) {
        if (action === "status") {
          demand(resourceToken, "get")
        } else if (action === "undo" || action === "restart") {
          demand(resourceToken, "patch")
        }
      }
    } else if (subcommand === "delete") {
      const resourceToken = cleanTokens[1]
      if (resourceToken != null) {
        demand(resourceToken, "delete", { nameToken: cleanTokens[2] })
      }
    } else if (subcommand === "get") {
      const resourceToken = cleanTokens[1]
      if (resourceToken != null) demand(resourceToken, "get", { nameToken: cleanTokens[2] })
    } else if (subcommand === "exec") {
      reqs.push({ apiGroup: "", resource: "pods/exec", verb: "create" })
    } else if (subcommand === "logs") {
      reqs.push({ apiGroup: "", resource: "pods/log", verb: "get" })
    } else if (subcommand === "scale") {
      const resourceToken = cleanTokens.find(
        (t) => !t.startsWith("-") && t !== "scale" && (t.includes("/") || KUBECTL_RESOURCE_MAP[t])
      )
      if (resourceToken != null) demand(resourceToken, "patch", { subresource: "scale" })
    } else if (subcommand === "patch") {
      const resourceToken = cleanTokens[1]
      if (resourceToken != null) demand(resourceToken, "patch", { nameToken: cleanTokens[2] })
    } else if (subcommand === "create") {
      const resourceToken = cleanTokens[1]
      if (resourceToken != null) demand(resourceToken, "create")
    } else if (subcommand === "annotate") {
      const resourceToken = cleanTokens[1]
      if (resourceToken != null) demand(resourceToken, "patch", { nameToken: cleanTokens[2] })
    }

    if (reqs.length > 0 || unmodelled.length > 0) {
      results.push({ namespace, reqs, unmodelled })
    }
  }

  return results
}

export const SHELL_SCRIPT_PATTERNS: Record<string, (args: readonly string[]) => readonly string[]> =
  {}
