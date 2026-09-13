export function pathBasename(path: string): string {
  const cleaned = path.endsWith("/") ? path.slice(0, -1) : path
  const idx = cleaned.lastIndexOf("/")
  return idx === -1 ? cleaned : cleaned.slice(idx + 1)
}

export interface UpscaleRunRef {
  readonly inputImagePath: string | null
  readonly outputImagePath: string | null
}

export function findConfidentWallpaperSource(input: {
  readonly deliveredFilename: string
  readonly upscaleRuns: readonly UpscaleRunRef[]
}): string | null {
  if (input.deliveredFilename === "") return null
  for (const run of input.upscaleRuns) {
    const out = run.outputImagePath ?? ""
    const inp = run.inputImagePath ?? ""
    if (out !== "" && inp !== "" && pathBasename(out) === input.deliveredFilename) {
      return inp
    }
  }
  return null
}

export type WallpaperSourceClass =
  | { readonly kind: "source-survives"; readonly sourcePath: string }
  | { readonly kind: "source-gone" }

export function classifyWallpaperSource(input: {
  readonly confidentSourcePath: string | null
  readonly sourceSurvives: boolean
}): WallpaperSourceClass {
  if (
    input.confidentSourcePath !== null &&
    input.confidentSourcePath !== "" &&
    input.sourceSurvives
  ) {
    return { kind: "source-survives", sourcePath: input.confidentSourcePath }
  }
  return { kind: "source-gone" }
}
