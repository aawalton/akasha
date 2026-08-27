import { z } from "zod"

export type BiomeIncludes = {
  readonly positives: readonly string[]
  readonly negatives: readonly string[]
}

const BiomeConfigSchema = z
  .object({
    files: z
      .object({
        includes: z.array(z.string()).optional(),
      })
      .passthrough()
      .optional(),
  })
  .passthrough()

export const parseBiomeIncludes = (biomeJsonText: string): BiomeIncludes => {
  const config = BiomeConfigSchema.parse(JSON.parse(biomeJsonText))
  const includes = config.files?.includes
  if (includes === undefined || includes.length === 0) {
    throw new Error("biome.json declares no files.includes — cannot compute lint scope")
  }
  const positives: string[] = []
  const negatives: string[] = []
  for (const entry of includes) {
    if (entry.startsWith("!")) negatives.push(entry.slice(1))
    else positives.push(entry)
  }
  return { positives, negatives }
}

const escapeRegExp = (s: string): string => s.replace(/[.+^${}()|[\]\\]/g, "\\$&")

export const globToRegExp = (glob: string): RegExp => {
  let re = ""
  let i = 0
  while (i < glob.length) {
    if (glob.startsWith("**/", i)) {
      re += "(?:.*/)?"
      i += 3
    } else if (glob.startsWith("**", i)) {
      re += ".*"
      i += 2
    } else if (glob.charAt(i) === "*") {
      re += "[^/]*"
      i += 1
    } else {
      re += escapeRegExp(glob.charAt(i))
      i += 1
    }
  }
  return new RegExp(`^${re}(?:/.*)?$`)
}

const matchesGlob = (path: string, glob: string): boolean => globToRegExp(glob).test(path)

export const biomeLintsPath = (path: string, includes: BiomeIncludes): boolean => {
  if (!includes.positives.some((p) => matchesGlob(path, p))) return false
  return !includes.negatives.some((n) => matchesGlob(path, n))
}

export const biomeEffectiveLintedFiles = (
  allFiles: readonly string[],
  includes: BiomeIncludes
): readonly string[] => allFiles.filter((f) => biomeLintsPath(f, includes))

const EXT_GLOB_PREFIX = "**/*."

export const biomePositiveExtensions = (includes: BiomeIncludes): readonly string[] => {
  const exts = new Set<string>()
  for (const positive of includes.positives) {
    if (!positive.startsWith(EXT_GLOB_PREFIX)) continue
    const ext = positive.slice(EXT_GLOB_PREFIX.length)
    if (ext.length > 0 && !ext.includes("/") && !ext.includes("*")) exts.add(ext)
  }
  return [...exts].sort()
}
