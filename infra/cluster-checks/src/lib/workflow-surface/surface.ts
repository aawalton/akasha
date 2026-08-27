import { z } from "zod"
import {
  commitSha40,
  inputsHash12,
  shortSha7,
  treeSha40,
} from "../../../../../../instructions/tools/lib/workflow-dsl/ci-identifiers.ts"
import type { CIContext, Workflow } from "../../../../../../instructions/tools/lib/workflow-dsl/types.ts"

const WorkflowKindSchema = z.enum(["preparation", "foundation", "checks", "apps", "cleanup"])

type _KindsAreComplete =
  NonNullable<Workflow["kind"]> extends z.infer<typeof WorkflowKindSchema> ? true : never

export const PROBE_CONTEXT_IDS = ["main-no-diff", "branch-with-diff"] as const

export type ProbeContextId = (typeof PROBE_CONTEXT_IDS)[number]

const PROBE_SHAS = {
  commitSha: commitSha40("abc1234567abc1234567abc1234567abc1234567"),
  treeSha: treeSha40("0".repeat(40)),
  shortSha: shortSha7("abc1234"),
  inputsHash: inputsHash12("abc123456789"),
} as const

export const PROBE_CONTEXTS: Readonly<Record<ProbeContextId, CIContext>> = {
  "main-no-diff": {
    ...PROBE_SHAS,
    workspace: "/workspace",
    seq: "1",
    branch: "main",
    changedFiles: [],
  },
  "branch-with-diff": {
    ...PROBE_SHAS,
    workspace: "/workspace",
    seq: "1",
    branch: "feature/probe",
    changedFiles: ["infra/cluster-checks/src/run-check.ts"],
  },
}

export const ResolvedCommandsSchema = z.discriminatedUnion("ok", [
  z.object({ ok: z.literal(true), commands: z.array(z.string()) }),
  z.object({ ok: z.literal(false), error: z.string() }),
])

export type ResolvedCommands = z.infer<typeof ResolvedCommandsSchema>

export const SurfaceStepSchema = z.object({
  name: z.string(),
  image: z.string(),
  dependsOn: z.array(z.string()).optional(),
  resolved: z.array(ResolvedCommandsSchema),
})

export type SurfaceStep = z.infer<typeof SurfaceStepSchema>

const DispatchNodeTypeSchema = z.union([
  z.string(),
  z.object({ kind: z.string(), under: z.string() }),
])

export const SurfaceWorkflowSchema = z.object({
  name: z.string(),
  kind: WorkflowKindSchema,
  declaredKind: WorkflowKindSchema.optional(),
  package: z.string().optional(),
  dependsOn: z.array(z.string()).optional(),
  when: z.object({ event: z.enum(["push", "manual"]).optional(), branch: z.string().optional() }),
  dispatchNodes: z.array(z.string()).optional(),
  dispatchNodeTypes: z.array(DispatchNodeTypeSchema).optional(),
  sourcePath: z.string(),
  steps: z.array(SurfaceStepSchema),
})

export type SurfaceWorkflow = z.infer<typeof SurfaceWorkflowSchema>

export const ScannedFileSchema = z.object({
  relativePath: z.string(),
  kind: WorkflowKindSchema,
})

export const WorkflowSurfaceSchema = z.object({
  contexts: z.array(z.string()),
  files: z.array(ScannedFileSchema),
  workflows: z.array(SurfaceWorkflowSchema),
})

export type WorkflowSurface = z.infer<typeof WorkflowSurfaceSchema>

export const surfaceFilePaths = (surface: WorkflowSurface): readonly string[] =>
  surface.files.map((file) => file.relativePath)

export const commandsFor = (step: SurfaceStep, contextId: ProbeContextId): readonly string[] => {
  const index = PROBE_CONTEXT_IDS.indexOf(contextId)
  const entry = step.resolved[index]
  if (entry === undefined) {
    throw new Error(
      `the workflow surface holds no resolution for step "${step.name}" under context "${contextId}"`
    )
  }
  if (!entry.ok) throw new Error(entry.error)
  return entry.commands
}
