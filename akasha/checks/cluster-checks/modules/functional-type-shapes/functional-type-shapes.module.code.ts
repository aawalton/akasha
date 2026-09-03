import type { FunctionalType } from "../../../../../tools/lib/check-workflow/functional-type.ts"

export interface PackageJsonShape {
  readonly bin?: unknown
  readonly main?: unknown
  readonly exports?: unknown
  readonly dependencies?: Readonly<Record<string, string>>
  readonly peerDependencies?: Readonly<Record<string, string>>
  readonly devDependencies?: Readonly<Record<string, string>>
  readonly optionalDependencies?: Readonly<Record<string, string>>
  readonly hostedBy?: unknown
  readonly engines?: unknown
}

export interface InferFunctionalTypeInput {
  readonly pkg: PackageJsonShape
  readonly name: string | undefined
  readonly workspaceDir: string
  readonly workspaceFunctionalTypes: ReadonlyMap<string, FunctionalType | null>
}
