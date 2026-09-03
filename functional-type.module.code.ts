import { existsSync, readFileSync } from "node:fs"
import { resolve } from "node:path"
import { z } from "zod"

export const FUNCTIONAL_TYPES = [
  "addon",
  "next-app",
  "service",
  "worker",
  "program",
  "next-ui",
  "local-service",
  "access",
  "io",
  "pure",
] as const

export type FunctionalType = (typeof FUNCTIONAL_TYPES)[number]

export const FunctionalTypeSchema = z.enum(FUNCTIONAL_TYPES)

export const RANK_BY_TYPE: Readonly<Record<FunctionalType, number>> = {
  pure: 1,
  access: 2,
  io: 2,
  "next-ui": 4,
  "next-app": 4,
  service: 4,
  worker: 4,
  program: 4,
  addon: 4,
  "local-service": 4,
}

export const LIBRARY_TYPES: ReadonlySet<FunctionalType> = new Set([
  "pure",
  "access",
  "io",
  "next-ui",
])

export function isLibraryType(type: FunctionalType): boolean {
  return LIBRARY_TYPES.has(type)
}

const PACKAGE_JSON_SCHEMA = z
  .object({
    functionalType: z.string().optional(),
  })
  .passthrough()

export interface ReadFunctionalTypeResult {
  readonly type: FunctionalType | null
  readonly raw: string | undefined
}

export function readFunctionalType(packageJsonPath: string): ReadFunctionalTypeResult {
  if (!existsSync(packageJsonPath)) return { type: null, raw: undefined }
  let parsed: z.infer<typeof PACKAGE_JSON_SCHEMA>
  try {
    parsed = PACKAGE_JSON_SCHEMA.parse(JSON.parse(readFileSync(packageJsonPath, "utf-8")))
  } catch {
    return { type: null, raw: undefined }
  }
  const raw = parsed.functionalType
  if (raw === undefined) return { type: null, raw: undefined }
  const result = FunctionalTypeSchema.safeParse(raw)
  if (result.success) return { type: result.data, raw }
  return { type: null, raw }
}

export function workspacePackageJsonPath(repoRoot: string, workspacePath: string): string {
  return resolve(repoRoot, workspacePath, "package.json")
}
