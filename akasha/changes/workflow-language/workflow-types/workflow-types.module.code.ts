import type {
  CommitSha40,
  InputsHash12,
  ShortSha7,
  TreeSha40,
} from "../ci-identifiers/ci-identifiers.module.code.ts"

export type NodeId = string

export type ScopedPopulation = {
  readonly kind: string
  readonly under: string
}

export type PopulationEntry = string | ScopedPopulation

export type WorkflowKind = "preparation" | "foundation" | "checks" | "apps" | "cleanup"

export interface Workflow {
  name: string
  kind?: WorkflowKind
  when: WorkflowWhen
  dependsOn?: readonly string[]
  triggeredBy?: readonly string[]
  steps?: readonly Step[]
  package?: string
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly PopulationEntry[]
  disabled?: boolean
  alwaysRun?: boolean
}

export interface Step {
  name: string
  image: string
  commands: readonly string[] | ((ci: CIContext) => readonly string[])
  script?: string
  dependsOn?: readonly string[]
  when?: readonly StepWhen[]
  environment?: Record<string, string | SecretRef>
  backendOptions?: BackendOptions
  volumes?: readonly string[]
  shell?: readonly string[]
  dispatchNodes?: readonly NodeId[]
  dispatchNodeTypes?: readonly PopulationEntry[]
  closurePolicy?: "import-graph"
  skipIfTagExists?: string | ((ci: CIContext) => string)
  outputs?: readonly string[]
  alwaysRun?: boolean
}

interface WorkflowWhen {
  event: "push" | "manual"
  branch?: "main" | "*" | "!main" | string
}

interface StepWhen {
  status?: "success" | "failure"
  branch?: string
  event?: "push" | "manual"
}

export interface SecretRef {
  fromSecret: string
}

export interface SecretMount {
  secretName: string
  key: string
  mountPath: string
  mode?: number
}

export interface BackendOptions {
  kubernetes?: {
    serviceAccountName?: string
    resources?: {
      requests?: { cpu?: string; memory?: string }
      limits?: { cpu?: string; memory?: string }
    }
    runAsUser?: number
    secretMounts?: ReadonlyArray<SecretMount>
  }
}

export type NodeType =
  | "biome-config-file"
  | "certificate-file"
  | "cluster-check"
  | "conf-file"
  | "css-file"
  | "csv-file"
  | "db-function"
  | "db-table"
  | "db-trigger"
  | "dockerfile-file"
  | "dockerfile-recipe"
  | "env-file"
  | "file"
  | "html-file"
  | "ignore-file"
  | "image-file"
  | "inference-service"
  | "ios-app"
  | "js-file"
  | "json-file"
  | "jsonl-file"
  | "jsx-file"
  | "k8s-missing"
  | "k8s-resource"
  | "lock-file"
  | "lockfile-package"
  | "lua-file"
  | "md-file"
  | "namespace-role"
  | "node-hostname"
  | "package"
  | "python-file"
  | "rust-file"
  | "rust-package"
  | "sh-file"
  | "sops-config-file"
  | "sops-secret-file"
  | "sql-file"
  | "step"
  | "swift-file"
  | "systemd-unit-file"
  | "temper-addon"
  | "toml-file"
  | "ts-file"
  | "tsconfig-file"
  | "tsx-file"
  | "tunnel-config-recipe"
  | "tunnel-route"
  | "txt-file"
  | "web-app"
  | "workflow"
  | "workspace-root"
  | "xml-file"
  | "yaml-file"
  | "yml-file"

export interface ScopedNodeTypePopulation {
  kind: NodeType
  under: string
}

export const isScopedPopulation = (
  entry: NodeType | ScopedNodeTypePopulation
): entry is ScopedNodeTypePopulation => typeof entry === "object" && entry !== null

export interface CIContext {
  workspace: string
  commitSha: CommitSha40
  shortSha: ShortSha7
  inputsHash: InputsHash12
  treeSha: TreeSha40
  seq: string
  branch: string
  changedFiles: readonly string[]
}

export interface DiscoveredWorkflow extends Workflow {
  kind: WorkflowKind
  sourcePath: string
  declaredKind?: Workflow["kind"]
}
