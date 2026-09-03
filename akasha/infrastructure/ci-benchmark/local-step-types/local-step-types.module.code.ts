export interface SecretRef {
  fromSecret: string
}

export interface SecretMount {
  secretName: string
  key: string
  mountPath: string
  mode?: number
}

export interface StepConfig {
  name: string
  image: string
  commands: readonly string[]
  environment?: Record<string, string | SecretRef>
  serviceAccountName?: string
  volumes?: readonly string[]
  resources?: {
    limits?: { memory?: string; cpu?: string }
    requests?: { memory?: string; cpu?: string }
  }
  dependsOn?: readonly string[]
  shell?: readonly string[]
  skipIfTagExists?: string
  outputs?: readonly string[]
  runAsUser?: number
  secretMounts?: readonly SecretMount[]
}

export interface PipelineContext {
  sha: string
  seq: number
  workflowName: string
  workspaceName: string
  namespace: string
  secrets: Map<string, string>
  branch: string
  repoFullName: string
  commitAuthor: string
  commitMessage: string
}

export interface StepResult {
  success: boolean
  logs: string
  exitCode: number
  duration: number
}
