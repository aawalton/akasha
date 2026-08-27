import { resolveRoots } from "../../../../../repo/roots/roots"
import {
  discoverWorkflows,
  workflowPages,
} from "../../../../../tools/lib/workflow-dsl/discovery.ts"
import type { DiscoveredWorkflow, Step } from "../../../../../tools/lib/workflow-dsl/types.ts"
import { errorMessage } from "../../../../../tools/lib/check-workflow/error-message"
import {
  PROBE_CONTEXT_IDS,
  PROBE_CONTEXTS,
  type ResolvedCommands,
  type SurfaceStep,
  type SurfaceWorkflow,
  type WorkflowSurface,
  WorkflowSurfaceSchema,
} from "./surface"

const instructionsRoot = (): string => {
  const root = resolveRoots().akasha
  if (root === undefined) {
    throw new Error(
      "`resolveRoots()` names no `instructions` root, so the workflow pages a surface is " +
        "built from cannot be found"
    )
  }
  return root
}

export const scannedFilePaths = async (repoRoot: string): Promise<readonly string[]> =>
  workflowPages(instructionsRoot()).map((page) => page.sourcePath)

const resolveStep = (step: Step): readonly ResolvedCommands[] =>
  PROBE_CONTEXT_IDS.map((id): ResolvedCommands => {
    try {
      const commands =
        typeof step.commands === "function" ? step.commands(PROBE_CONTEXTS[id]) : step.commands
      return { ok: true, commands: [...commands] }
    } catch (err) {
      return { ok: false, error: errorMessage(err) }
    }
  })

const toSurfaceStep = (step: Step): SurfaceStep => ({
  name: step.name,
  image: step.image,
  dependsOn: step.dependsOn === undefined ? undefined : [...step.dependsOn],
  resolved: [...resolveStep(step)],
})

const toSurfaceWorkflow = (workflow: DiscoveredWorkflow): SurfaceWorkflow => ({
  name: workflow.name,
  kind: workflow.kind,
  declaredKind: workflow.declaredKind,
  package: workflow.package,
  dependsOn: workflow.dependsOn === undefined ? undefined : [...workflow.dependsOn],
  when: { event: workflow.when.event, branch: workflow.when.branch },
  dispatchNodes: workflow.dispatchNodes === undefined ? undefined : [...workflow.dispatchNodes],
  dispatchNodeTypes:
    workflow.dispatchNodeTypes === undefined ? undefined : [...workflow.dispatchNodeTypes],
  sourcePath: workflow.sourcePath,
  steps: (workflow.steps ?? []).map(toSurfaceStep),
})

export const buildWorkflowSurface = async (repoRoot: string): Promise<WorkflowSurface> => {
  const root = instructionsRoot()
  const pages = workflowPages(root)
  const discovered = await discoverWorkflows(root, { codeRoot: repoRoot })
  return WorkflowSurfaceSchema.parse({
    contexts: [...PROBE_CONTEXT_IDS],
    files: pages.map((page) => ({ relativePath: page.sourcePath, kind: page.kind })),
    workflows: discovered.map(toSurfaceWorkflow),
  })
}
