import { MEMBERSHIP_ALL, membershipCoversPath } from "@tools/lib/graph/queries/membership"
import {
  TERMINAL_PIPELINE_STATUSES,
  TERMINAL_WORKFLOW_STATUSES,
} from "../ci-status-vocabulary/ci-status-vocabulary.module.code.ts"
import type {
  PipelineEntity,
  WorkflowEntity,
} from "../pipeline-entities/pipeline-entities.module.code.ts"
import {
  matchesBranch,
  selectWorkflows,
} from "../workflow-branch-filter/workflow-branch-filter.module.code.ts"
import type {
  AbsorbedWorkflow,
  PipelineConfig,
  WorkflowConfig,
} from "../workflow-config/workflow-config.module.code.ts"
import {
  isMergedGraphAcyclic,
  topologicallySortWorkflows,
} from "../workflow-topology/workflow-topology.module.code.ts"
import {
  workflowWatchMatches,
  workflowWatchMembership,
} from "../workflow-watch-gate/workflow-watch-gate.module.code.ts"

const CODE_REPO = "code"

export type SelectWorkflowsInput = {
  pipeline: PipelineEntity
  config: PipelineConfig
  sameBranchPipelines: readonly PipelineEntity[]
  sameBranchWorkflows: Record<string, WorkflowEntity[]>
}

export type SelectWorkflowsResult = {
  selected: readonly {
    workflow: WorkflowConfig
    changedFiles: readonly string[]
  }[]
  skipped: readonly {
    workflow: WorkflowConfig
    reason: "watch_paths" | "branch"
  }[]
  toSupersede: readonly PipelineEntity[]
  absorbedFromPriorPipelines: readonly AbsorbedWorkflow[]
  absorptionDropped?: {
    reason: "cycle"
    droppedNames: readonly string[]
  }
}

export function selectPipelineWorkflows(input: SelectWorkflowsInput): SelectWorkflowsResult {
  const { pipeline, config, sameBranchPipelines, sameBranchWorkflows } = input
  const graph = config.graph

  const selectedRaw = selectWorkflows(config, pipeline.branch)
  const selectedSorted = topologicallySortWorkflows(selectedRaw)
  const createdWorkflowNames = new Set<string>(selectedSorted.map((wf) => wf.name))

  const toSupersede = sameBranchPipelines.filter(
    (p) =>
      !TERMINAL_PIPELINE_STATUSES.has(p.status) &&
      p.seq < pipeline.seq &&
      (pipeline.branch !== "main" || p.status === "pending")
  )

  const pipelineChanged = config.changedPaths
  const changedFilesByName = new Map<string, string[]>()

  const predecessorByName = new Map<string, Set<string>>()
  for (const older of toSupersede) {
    const orphanedWorkflows = sameBranchWorkflows[older.id] ?? []
    for (const wf of orphanedWorkflows) {
      if (TERMINAL_WORKFLOW_STATUSES.has(wf.status)) continue
      const bucket = predecessorByName.get(wf.name) ?? new Set<string>()
      for (const f of wf.changedFiles ?? []) bucket.add(f)
      predecessorByName.set(wf.name, bucket)
    }
  }

  const namesToCompute = new Set<string>([
    ...selectedSorted.map((wf) => wf.name),
    ...predecessorByName.keys(),
  ])
  const configByName = new Map<string, WorkflowConfig>()
  for (const wf of config.workflows) configByName.set(wf.name, wf)
  for (const name of namesToCompute) {
    const wfConfig = configByName.get(name)
    const membership =
      wfConfig === undefined ? MEMBERSHIP_ALL : workflowWatchMembership(config, wfConfig)
    const matchesFile = (f: string): boolean =>
      graph === undefined || membershipCoversPath(graph, membership, f, CODE_REPO)
    const ownFiltered = pipelineChanged.filter(matchesFile)
    const fromPredecessors = predecessorByName.get(name) ?? new Set<string>()
    const merged = new Set<string>([...ownFiltered, ...fromPredecessors])
    const filtered = [...merged].filter(matchesFile)
    changedFilesByName.set(name, filtered)
  }

  const absorbedNames = new Set<string>()
  for (const older of toSupersede) {
    for (const wf of sameBranchWorkflows[older.id] ?? []) {
      if (TERMINAL_WORKFLOW_STATUSES.has(wf.status)) continue
      if (createdWorkflowNames.has(wf.name)) continue
      const hasConfig = config.workflows.some((c) => c.name === wf.name)
      const isStateful = wf.kind === "stateful"
      if (!hasConfig && !isStateful) continue
      absorbedNames.add(wf.name)
    }
  }
  const validAbsorbedTargets = new Set<string>([
    ...config.workflows.map((c) => c.name),
    ...absorbedNames,
  ])

  const absorbed: AbsorbedWorkflow[] = []
  for (const older of toSupersede) {
    const orphanedWorkflows = sameBranchWorkflows[older.id] ?? []
    for (const wf of orphanedWorkflows) {
      if (TERMINAL_WORKFLOW_STATUSES.has(wf.status)) continue

      if (createdWorkflowNames.has(wf.name)) continue

      const hasConfig = config.workflows.some((c) => c.name === wf.name)
      const isStateful = wf.kind === "stateful"
      if (!hasConfig && !isStateful) continue

      const matchingConfig = config.workflows.find((c) => c.name === wf.name)
      const baseConfig: Record<string, unknown> = matchingConfig
        ? {
            kind: matchingConfig.kind,
            dependsOn: matchingConfig.dependsOn,
            alwaysRun: matchingConfig.alwaysRun,
            ...matchingConfig.config,
          }
        : {
            kind: wf.kind,
            dependsOn: (wf.dependsOn ?? []).filter((t) => validAbsorbedTargets.has(t)),
            absorbed: true,
            absorbedFrom: older.id,
          }
      const changedFiles = changedFilesByName.get(wf.name) ?? []
      if (changedFiles.length > 0) {
        baseConfig.changedFiles = changedFiles
      }

      absorbed.push({ workflow: wf, fromPipeline: older, config: baseConfig })
      createdWorkflowNames.add(wf.name)
    }
  }

  let absorptionDropped: SelectWorkflowsResult["absorptionDropped"]
  if (absorbed.length > 0 && !isMergedGraphAcyclic(selectedSorted, absorbed)) {
    absorptionDropped = {
      reason: "cycle",
      droppedNames: absorbed.map((a) => a.workflow.name),
    }
    absorbed.length = 0
  }

  const selected = selectedSorted.map((wf) => ({
    workflow: wf,
    changedFiles: changedFilesByName.get(wf.name) ?? [],
  }))

  type SkippedEntry = {
    workflow: WorkflowConfig
    reason: "branch" | "watch_paths"
  }
  const skippedBuf: SkippedEntry[] = []
  const selectedSet = new Set(selectedSorted.map((wf) => wf.name))
  for (const wf of config.workflows) {
    if (selectedSet.has(wf.name)) continue
    if (!workflowWatchMatches(config, wf)) {
      skippedBuf.push({ workflow: wf, reason: "watch_paths" })
      continue
    }
    if (!matchesBranch(wf, pipeline.branch)) {
      skippedBuf.push({ workflow: wf, reason: "branch" })
    }
  }
  const skipped: SelectWorkflowsResult["skipped"] = skippedBuf

  return {
    selected,
    skipped,
    toSupersede,
    absorbedFromPriorPipelines: absorbed,
    ...(absorptionDropped ? { absorptionDropped } : {}),
  }
}
