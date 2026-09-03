import type { FunctionalType } from "../../../../../tools/lib/check-workflow/functional-type.ts"
import {
  hasIoWorkspaceDep,
  hasOnlyPureWorkspaceDeps,
} from "../functional-type-dep-walkers/functional-type-dep-walkers.module.code.ts"
import { passesPurityScan } from "../functional-type-purity-scan/functional-type-purity-scan.module.code.ts"
import {
  hasAppsWorkflowAtRoot,
  hasBinAndNoLibrarySurface,
  hasDirectDbSdkDep,
  hasHostedByDecl,
  hasK8sSynthKind,
  hasReactRuntimeDep,
  hasTstlTsconfig,
  hasVscodeEngine,
} from "../functional-type-row-discriminators/functional-type-row-discriminators.module.code.ts"
import type { InferFunctionalTypeInput } from "../functional-type-shapes/functional-type-shapes.module.code.ts"

export { passesPurityScan }

interface Discriminator {
  readonly type: FunctionalType
  readonly matches: (input: InferFunctionalTypeInput) => boolean
}

const DISCRIMINATOR_CHAIN: readonly Discriminator[] = [
  {
    type: "addon",
    matches: ({ pkg, workspaceDir }) => hasTstlTsconfig(workspaceDir) || hasVscodeEngine(pkg),
  },
  {
    type: "service",
    matches: ({ workspaceDir, pkg }) =>
      hasK8sSynthKind(workspaceDir, ["Deployment", "StatefulSet"]) || hasHostedByDecl(pkg),
  },
  {
    type: "worker",
    matches: ({ workspaceDir }) => hasK8sSynthKind(workspaceDir, ["Job", "CronJob"]),
  },
  { type: "next-ui", matches: ({ pkg }) => hasReactRuntimeDep(pkg) },
  { type: "program", matches: ({ pkg }) => hasBinAndNoLibrarySurface(pkg) },
  { type: "access", matches: ({ pkg }) => hasDirectDbSdkDep(pkg) },
  { type: "local-service", matches: ({ workspaceDir }) => hasAppsWorkflowAtRoot(workspaceDir) },
  { type: "io", matches: ({ workspaceDir }) => !passesPurityScan(workspaceDir) },
  {
    type: "pure",
    matches: ({ pkg, name, workspaceDir, workspaceFunctionalTypes }) =>
      passesPurityScan(workspaceDir) &&
      hasOnlyPureWorkspaceDeps(pkg, workspaceFunctionalTypes, {
        importerName: name,
        workspaceDir,
      }),
  },
  {
    type: "io",
    matches: ({ pkg, name, workspaceDir, workspaceFunctionalTypes }) =>
      hasIoWorkspaceDep(pkg, workspaceFunctionalTypes, { importerName: name, workspaceDir }),
  },
]

export function inferFunctionalType(input: InferFunctionalTypeInput): FunctionalType | null {
  for (const d of DISCRIMINATOR_CHAIN) {
    if (d.matches(input)) return d.type
  }
  return null
}
