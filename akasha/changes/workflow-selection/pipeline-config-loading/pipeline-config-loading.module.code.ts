import { createHash } from "node:crypto"
import { existsSync } from "node:fs"
import { join } from "node:path"
import { getCommitTreeSha } from "@akasha/git/tree-sha"
import {
  type PopulationEntry,
  type SeedFile,
  type SeedSource,
  seedFilesFor,
} from "@akasha/old-graph/old-graph-queries"
import { buildSnapshot } from "@akasha/old-graph/old-graph-snapshots"
import type { Graph, NodeId } from "@akasha/old-graph/old-graph-types"
import {
  commitSha40,
  type InputsHash12,
  inputsHash12,
  toShortSha7,
  treeSha40,
} from "@akasha/workflow-language/ci-identifiers"
import {
  computeInputsHash,
  computeInputsHashAtCommit,
  makeDegradedInputsGraphError,
} from "@akasha/workflow-language/inputs-hash"
import type {
  CIContext,
  DiscoveredWorkflow,
  WorkflowKind,
} from "@akasha/workflow-language/workflow-types"
import { discoverWorkflows } from "@tools/lib/workflow-dsl/discovery"
import {
  intersectWithTreePaths,
  listCommitTreePaths,
} from "../pipeline-config-file-set/pipeline-config-file-set.module.code.ts"
import type { LoadConfigsTimings } from "../pipeline-config-types/pipeline-config-types.module.code.ts"

export interface WorkflowStepConfig {
  readonly name: string
  readonly dependsOn: readonly string[]
  readonly stepConfig: unknown
  readonly whenConditions?: { readonly status?: readonly string[]; readonly event?: string }
  readonly dispatchNodes?: readonly NodeId[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly alwaysRun?: boolean
}

export interface WorkflowConfig {
  readonly name: string
  readonly dispatchNodes?: readonly NodeId[]
  readonly dispatchNodeTypes?: readonly PopulationEntry[]
  readonly kind?: WorkflowKind
  readonly dependsOn: readonly string[]
  readonly triggeredBy?: readonly string[]
  readonly disabled?: boolean
  readonly alwaysRun?: boolean
  readonly whenBranch?: string
  readonly inputsHash: InputsHash12
  readonly steps: readonly WorkflowStepConfig[]
}

const ANY_BRANCH = "*"

const CODE_REPO = "code"

const NAMED_CAP = 5

const INPUTS_HASH_LEN = 12

export function toWorkflowConfig(pipeline: DiscoveredWorkflow, ci: CIContext): WorkflowConfig {
  const steps: WorkflowStepConfig[] = (pipeline.steps ?? []).map((step) => ({
    name: step.name,
    dependsOn: step.dependsOn ?? [],
    stepConfig: {
      name: step.name,
      image: step.image,
      commands: typeof step.commands === "function" ? step.commands(ci) : step.commands,
      environment: step.environment,
      serviceAccountName: step.backendOptions?.kubernetes?.serviceAccountName,
      volumes: step.volumes,
      resources: step.backendOptions?.kubernetes?.resources,
      runAsUser: step.backendOptions?.kubernetes?.runAsUser,
      secretMounts: step.backendOptions?.kubernetes?.secretMounts,
      dependsOn: step.dependsOn,
      shell: step.shell,
      skipIfTagExists:
        typeof step.skipIfTagExists === "function"
          ? step.skipIfTagExists(ci)
          : step.skipIfTagExists,
      outputs: step.outputs,
    },
    whenConditions:
      step.when === undefined || step.when.length === 0
        ? undefined
        : {
            status: step.when
              .filter((w) => w.status !== undefined)
              .map((w) => (w.status === "failure" ? "failed" : "passed")),
            event: step.when.find((w) => w.event !== undefined)?.event,
          },
    ...(step.dispatchNodes === undefined ? {} : { dispatchNodes: step.dispatchNodes }),
    ...(step.dispatchNodeTypes === undefined ? {} : { dispatchNodeTypes: step.dispatchNodeTypes }),
    alwaysRun: step.alwaysRun,
  }))

  const dslBranch = pipeline.when.branch
  const whenBranch = dslBranch !== undefined && dslBranch !== ANY_BRANCH ? dslBranch : undefined

  return {
    name: pipeline.name,
    ...(pipeline.dispatchNodes === undefined ? {} : { dispatchNodes: pipeline.dispatchNodes }),
    ...(pipeline.dispatchNodeTypes === undefined
      ? {}
      : { dispatchNodeTypes: pipeline.dispatchNodeTypes }),
    kind: pipeline.kind,
    dependsOn: pipeline.dependsOn ?? [],
    triggeredBy: pipeline.triggeredBy,
    disabled: pipeline.disabled,
    alwaysRun: pipeline.alwaysRun,
    ...(whenBranch === undefined ? {} : { whenBranch }),
    inputsHash: ci.inputsHash,
    steps,
  }
}

const seedSourcesOf = (discovered: readonly DiscoveredWorkflow[]): readonly SeedSource[] =>
  discovered.map((one) => ({
    name: one.name,
    ...(one.package === undefined ? {} : { package: one.package }),
    ...(one.dispatchNodes === undefined ? {} : { nodes: one.dispatchNodes }),
    ...(one.dispatchNodeTypes === undefined ? {} : { nodeTypes: one.dispatchNodeTypes }),
  }))

const standsIn = (root: string, path: string): boolean => existsSync(join(root, path))

const hashOfParts = (parts: readonly string[]): InputsHash12 => {
  const [only] = parts
  if (only !== undefined && parts.length === 1) return inputsHash12(only)
  const rolled = createHash("sha256")
  for (const part of parts) rolled.update(part)
  return inputsHash12(rolled.digest("hex").slice(0, INPUTS_HASH_LEN))
}

export interface LoadWorkflowConfigsArgs {
  readonly akashaRoot: string
  readonly codeRoot: string
  readonly gitDir: string
  readonly commitSha: string
  readonly branch: string
  readonly changedFiles?: readonly string[]
  readonly graph?: Graph
  readonly timings?: LoadConfigsTimings
}

export async function loadAllWorkflowConfigs(
  args: LoadWorkflowConfigsArgs
): Promise<readonly WorkflowConfig[]> {
  const discoveryStart = performance.now()
  const discovered = await discoverWorkflows(args.akashaRoot, {
    codeRoot: args.codeRoot,
  })
  if (args.timings) args.timings.discoveryImportMs = performance.now() - discoveryStart

  const fullSha = commitSha40(args.commitSha)
  const treePaths = await listCommitTreePaths(args.gitDir, fullSha)
  const treePathsSet = new Set<string>(treePaths)

  const graph = args.graph ?? (await buildGraphAtSha(fullSha, args.timings))

  const seedFiles = new Map<string, readonly SeedFile[]>(
    seedFilesFor(graph, seedSourcesOf(discovered)).map((one) => [one.name, one.files])
  )

  const shortSha = toShortSha7(fullSha)
  const fullTreeSha = treeSha40(await getCommitTreeSha(args.gitDir, fullSha))

  const settled = await Promise.allSettled(
    discovered.map(async (pipeline): Promise<WorkflowConfig> => {
      const named = seedFiles.get(pipeline.name) ?? []
      const codeNamed = named.filter((one) => one.repo === CODE_REPO).map((one) => one.path)
      const instructionsNamed = named.filter((one) => one.repo !== CODE_REPO).map((one) => one.path)
      const fromCode = intersectWithTreePaths(codeNamed, treePathsSet)
      const fromInstructions = instructionsNamed
        .filter((path) => standsIn(args.akashaRoot, path))
        .sort()
      const heldNowhere = [
        ...codeNamed.filter((path) => !treePathsSet.has(path)),
        ...instructionsNamed.filter((path) => !standsIn(args.akashaRoot, path)),
      ]
      if (heldNowhere.length > 0) {
        throw new Error(
          `inputsHash: ${pipeline.name} watches ${heldNowhere.length} file(s) the graph names that neither tree read here holds — absent from the code repository at ${fullSha}, and absent from the instructions tree extracted at the revision this pipeline fixes. The graph reads the instructions repository as it stands rather than at a revision, so a file written there and not yet committed is named here and has no bytes to hash. Hashing only what is left would key a cache namespace on a smaller input set than this workflow really has, and that namespace would then not roll when the missing file changed. Commit the file, or take it out of what this workflow watches. Named: ${heldNowhere.slice(0, NAMED_CAP).join(", ")}`
        )
      }
      if (fromCode.length === 0 && fromInstructions.length === 0) {
        throw makeDegradedInputsGraphError({ sha: fullSha })
      }
      const parts: string[] = []
      if (fromCode.length > 0) {
        parts.push(
          await computeInputsHashAtCommit({
            gitDir: args.gitDir,
            sha: fullSha,
            graphFileSet: fromCode,
          })
        )
      }
      if (fromInstructions.length > 0) {
        parts.push(
          await computeInputsHash({
            workspace: args.akashaRoot,
            graphFileSet: fromInstructions,
          })
        )
      }
      const ci: CIContext = {
        workspace: "$WORKSPACE",
        commitSha: fullSha,
        shortSha,
        inputsHash: hashOfParts(parts),
        treeSha: fullTreeSha,
        seq: "0",
        branch: args.branch,
        changedFiles: args.changedFiles ?? [],
      }
      return toWorkflowConfig(pipeline, ci)
    })
  )
  const configs: WorkflowConfig[] = []
  for (const one of settled) {
    if (one.status !== "fulfilled") throw one.reason
    configs.push(one.value)
  }
  return configs
}

async function buildGraphAtSha(
  sha: string,
  timings: LoadConfigsTimings | undefined
): Promise<Graph> {
  const started = performance.now()
  const built = await buildSnapshot(sha)
  if (timings) timings.engineBuildMs = performance.now() - started
  return built
}
