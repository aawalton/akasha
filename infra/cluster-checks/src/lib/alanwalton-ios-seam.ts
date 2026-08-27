import { readdirSync, readFileSync } from "node:fs"

export const ALANWALTON_IOS_SEAM_SCRIPT =
  "../akasha/native-shell/alanwalton/scripts/apply-ios-seam.sh"

export const ALANWALTON_IOS_SEAM_PARTS_DIR =
  "../akasha/native-shell/alanwalton/scripts/ios-seam"

export const ALANWALTON_IOS_SEAM_LABEL = "the alanwalton iOS native seam"

function partsUnder(repoRoot: string, dir: string): readonly string[] {
  const out: string[] = []
  for (const entry of readdirSync(`${repoRoot}/${dir}`, { withFileTypes: true })) {
    if (entry.isDirectory()) out.push(...partsUnder(repoRoot, `${dir}/${entry.name}`))
    else if (entry.name.endsWith(".sh")) out.push(`${dir}/${entry.name}`)
  }
  return out
}

export function alanwaltonIosSeamFiles(repoRoot: string): readonly string[] {
  const parts = [...partsUnder(repoRoot, ALANWALTON_IOS_SEAM_PARTS_DIR)].sort()
  if (parts.length === 0)
    throw new Error(
      `${ALANWALTON_IOS_SEAM_PARTS_DIR} holds no .sh part — the seam cannot be read, and a pass over what was read would be a pass over the preamble alone`
    )
  return [ALANWALTON_IOS_SEAM_SCRIPT, ...parts]
}

export function readAlanwaltonIosSeam(repoRoot: string): string {
  return alanwaltonIosSeamFiles(repoRoot)
    .map((rel) => readFileSync(`${repoRoot}/${rel}`, "utf-8"))
    .join("\n")
}
