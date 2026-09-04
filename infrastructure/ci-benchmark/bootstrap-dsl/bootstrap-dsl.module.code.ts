import type { CIContext, Step } from "@akasha/workflow-language/workflow-types"
import { isBunNative } from "../local-step-execution/local-step-execution.module.code.ts"
import type { StepConfig } from "../local-step-types/local-step-types.module.code.ts"

export type StepStatus = "pending" | "running" | "completed" | "failed" | "skipped"

export interface StepNode {
  name: string
  dependsOn: readonly string[]
  when?: { status?: readonly StepStatus[]; event?: string }
}

function resolveCommands(step: Step, ci: CIContext): readonly string[] {
  return typeof step.commands === "function" ? step.commands(ci) : step.commands
}

export function dslStepToConfig(step: Step, ci: CIContext, hostWorkspace: string): StepConfig {
  const effectiveWorkspace = isBunNative(step.image) ? hostWorkspace : "/workspace"
  const stepCi: CIContext = { ...ci, workspace: effectiveWorkspace }
  return {
    name: step.name,
    image: step.image,
    commands: resolveCommands(step, stepCi),
    environment: step.environment,
    serviceAccountName: step.backendOptions?.kubernetes?.serviceAccountName,
    volumes: step.volumes,
    resources: step.backendOptions?.kubernetes?.resources,
    dependsOn: step.dependsOn,
    shell: step.shell,
    skipIfTagExists:
      step.skipIfTagExists != null
        ? typeof step.skipIfTagExists === "function"
          ? step.skipIfTagExists(stepCi)
          : step.skipIfTagExists
        : undefined,
    outputs: step.outputs,
    runAsUser: step.backendOptions?.kubernetes?.runAsUser,
    secretMounts: step.backendOptions?.kubernetes?.secretMounts,
  }
}

export function dslStepToNode(step: Step): StepNode {
  const whenStatuses: StepStatus[] = []
  let whenEvent: string | undefined
  if (step.when != null) {
    for (const w of step.when) {
      if (w.status === "failure") whenStatuses.push("failed")
      if (w.status === "success") whenStatuses.push("completed")
      if (w.event != null) whenEvent = w.event
    }
  }
  return {
    name: step.name,
    dependsOn: step.dependsOn ?? [],
    when:
      whenStatuses.length > 0 || whenEvent != null
        ? {
            ...(whenStatuses.length > 0 && { status: whenStatuses }),
            ...(whenEvent != null && { event: whenEvent }),
          }
        : undefined,
  }
}
