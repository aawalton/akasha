import type {
  CssDirective,
  CssFile,
} from "../../../../akasha/checks/cluster-checks/modules/css-source-directives/css-source-directives.module.code.ts"
import {
  enumerateTailwindApps,
  examineTailwindApp,
  type FindTailwindSourcesViolationsInput,
  type TailwindSourceViolation,
} from "../../../../akasha/checks/cluster-checks/modules/tailwind-sources-violations/tailwind-sources-violations.module.code.ts"
import type {
  PkgDependsKind,
  WorkspacePackage,
} from "../../../../akasha/checks/cluster-checks/modules/workspace-packages/workspace-packages.module.code.ts"

export const REPO_ROOT = "/repo"

export function workspacePackage(
  name: string,
  path: string,
  dependencies: ReadonlyMap<string, PkgDependsKind> = new Map()
): WorkspacePackage {
  return { name, path, sourceRoot: path, hasTsconfig: true, dependencies }
}

export function dependsOn(...names: readonly string[]): ReadonlyMap<string, PkgDependsKind> {
  const out = new Map<string, PkgDependsKind>()
  for (const name of names) out.set(name, "dependencies")
  return out
}

export function cssFile(
  relPath: string,
  directives: readonly CssDirective[],
  owner: string | null
): CssFile {
  return { path: relPath, package: owner, directives }
}

export function directive(opts: {
  pattern: string
  line?: number
  resolvedBase?: string | null
  negated?: boolean
}): CssDirective {
  return {
    raw: `@source "${opts.pattern}";`,
    pattern: opts.pattern,
    line: opts.line ?? 1,
    negated: opts.negated ?? false,
    resolvedBase: opts.resolvedBase ?? null,
  }
}

export function makeInput(opts: {
  packages: readonly WorkspacePackage[]
  cssFiles: readonly CssFile[]
  packageSourceRootByName: ReadonlyMap<string, string>
  uiPackageNames: ReadonlySet<string>
  entryCssPaths: ReadonlySet<string>
}): FindTailwindSourcesViolationsInput & { readonly cssFiles: readonly CssFile[] } {
  return {
    packages: opts.packages,
    cssFiles: opts.cssFiles,
    cssByPath: new Map(opts.cssFiles.map((one) => [one.path, one])),
    repoRoot: REPO_ROOT,
    packageSourceRootByName: opts.packageSourceRootByName,
    uiPackageNames: opts.uiPackageNames,
    entryCssPaths: opts.entryCssPaths,
  }
}

export function examineAll(
  input: FindTailwindSourcesViolationsInput & { readonly cssFiles: readonly CssFile[] }
): readonly TailwindSourceViolation[] {
  const out: TailwindSourceViolation[] = []
  for (const app of enumerateTailwindApps(input.cssFiles, input.entryCssPaths)) {
    out.push(...examineTailwindApp(app, input))
  }
  return out
}
