export type ForbiddenFinding = {
  file: string
  line: number
  column: number
  kind: string
  message: string
}

export type ForbiddenInputFile = {
  path: string
  content: string
}

export type FindForbiddenOptions = {
  files: readonly ForbiddenInputFile[]
  runtimeImportAllowed?: ReadonlySet<string>
}
