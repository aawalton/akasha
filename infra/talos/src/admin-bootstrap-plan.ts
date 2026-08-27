import { type WorkloadClass, workloadClassMemberSelector } from "@infra/k8s-types/hostnames"

const DEFAULT_CONTROL_CLASS: WorkloadClass = "control"

export type ControlClassOption = WorkloadClass | "none"

const METALLB_MANIFEST = "packages/infra/k8s/src/metallb/k8s/metallb-native.yaml"
const CERT_MANAGER_MANIFEST = "packages/infra/k8s/src/cert-manager/k8s/cert-manager-native.yaml"
const CNPG_MANIFEST = "packages/infra/k8s/src/cloudnative-pg/k8s/cloudnative-pg-native.yaml"
const BARMAN_MANIFEST = "packages/infra/k8s/src/cloudnative-pg/k8s/plugin-barman-cloud.yaml"
const METRICS_SERVER_MANIFEST =
  "packages/infra/k8s/src/metrics-server/k8s/metrics-server-native.yaml"
const ESCALATE_RBAC_GENERATOR = "tools/lib/cluster-rbac/escalate-manifest.ts"

export interface ApplyFileStep {
  readonly kind: "apply-file"
  readonly description: string
  readonly manifestPath: string
  readonly serverSide?: boolean
}

export interface ApplyGeneratedStep {
  readonly kind: "apply-generated"
  readonly description: string
  readonly generatorScript: string
}

export interface PatchNodeSelectorStep {
  readonly kind: "patch-nodeselector"
  readonly description: string
  readonly namespace: string
  readonly deployment: string
  readonly selector: Readonly<Record<string, string>>
}

export interface RolloutStep {
  readonly kind: "rollout"
  readonly namespace: string
  readonly resource: string
  readonly timeoutSeconds: number
}

export type AdminBootstrapStep =
  | ApplyFileStep
  | ApplyGeneratedStep
  | PatchNodeSelectorStep
  | RolloutStep

export interface AdminBootstrapPlan {
  readonly steps: readonly AdminBootstrapStep[]
}

export interface BuildAdminBootstrapPlanOptions {
  readonly controlClass?: ControlClassOption
}

export function buildAdminBootstrapPlan(
  opts: BuildAdminBootstrapPlanOptions = {}
): AdminBootstrapPlan {
  const controlClass = opts.controlClass ?? DEFAULT_CONTROL_CLASS
  const noPin = controlClass === "none"
  const selector: Readonly<Record<string, string>> = noPin
    ? {}
    : workloadClassMemberSelector(controlClass)

  const pin = (namespace: string, deployment: string): PatchNodeSelectorStep => ({
    kind: "patch-nodeselector",
    description: noPin
      ? `unpin ${namespace}/${deployment} (schedule on any node)`
      : `pin ${namespace}/${deployment} to workload-class.${controlClass} membership`,
    namespace,
    deployment,
    selector,
  })

  const rollout = (namespace: string, resource: string, timeoutSeconds: number): RolloutStep => ({
    kind: "rollout",
    namespace,
    resource,
    timeoutSeconds,
  })

  const steps: AdminBootstrapStep[] = [
    { kind: "apply-file", description: "install MetalLB", manifestPath: METALLB_MANIFEST },
    pin("metallb-system", "controller"),
    rollout("metallb-system", "deployment/controller", 180),
    rollout("metallb-system", "daemonset/speaker", 180),

    {
      kind: "apply-file",
      description: "install cert-manager",
      manifestPath: CERT_MANAGER_MANIFEST,
    },
    pin("cert-manager", "cert-manager"),
    pin("cert-manager", "cert-manager-webhook"),
    pin("cert-manager", "cert-manager-cainjector"),
    rollout("cert-manager", "deployment/cert-manager", 180),
    rollout("cert-manager", "deployment/cert-manager-webhook", 180),
    rollout("cert-manager", "deployment/cert-manager-cainjector", 180),

    {
      kind: "apply-file",
      description: "install CloudNativePG operator",
      manifestPath: CNPG_MANIFEST,
      serverSide: true,
    },
    pin("cnpg-system", "cnpg-controller-manager"),
    rollout("cnpg-system", "deployment/cnpg-controller-manager", 180),

    {
      kind: "apply-file",
      description: "install CloudNativePG Barman Cloud plugin",
      manifestPath: BARMAN_MANIFEST,
    },
    ...(noPin ? [pin("cnpg-system", "barman-cloud")] : []),
    rollout("cnpg-system", "deployment/barman-cloud", 300),

    {
      kind: "apply-generated",
      description: "grant pipeline-engine ClusterRole self-escalation",
      generatorScript: ESCALATE_RBAC_GENERATOR,
    },

    {
      kind: "apply-file",
      description: "install metrics-server",
      manifestPath: METRICS_SERVER_MANIFEST,
    },
    pin("kube-system", "metrics-server"),
    rollout("kube-system", "deployment/metrics-server", 180),
  ]

  return { steps }
}
