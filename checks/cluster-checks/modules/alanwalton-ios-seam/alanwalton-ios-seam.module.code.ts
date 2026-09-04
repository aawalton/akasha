import { existsSync, readFileSync } from "node:fs"

// Relative to the checkout `getRepoRoot` names, and written the way
// `discoverRepoFiles` writes it: a caller matches these against that listing, and a
// path spelled to reach the same file by another route matches none of it.
const AKASHA = "code-system/ios-apps"

// Alan's own seam parts, and the parts every shell shares. A sourced part is
// found by slug in one of these, so which of the two it stands in is not
// written down twice.
const SHELL_SCRIPT_DIRS: readonly string[] = [
  `${AKASHA}/ios-apps/alanwalton/shell-scripts`,
  `${AKASHA}/shell-scripts`,
]

export const ALANWALTON_IOS_SEAM_SCRIPT = `${SHELL_SCRIPT_DIRS[0]}/alanwalton-ios-seam/alanwalton-ios-seam.shell-script.shell.sh`

export const ALANWALTON_IOS_SEAM_LABEL = "the alanwalton iOS native seam"

// `. "$SOME_DIR/<slug>/<slug>.shell-script.shell.sh"` — the one shape a shell
// script page's file is named in, so the slug is enough to find the file and
// the variable holding the directory need not be interpreted.
const SOURCING_RE =
  /^\.\s+"\$[A-Za-z_][A-Za-z0-9_]*\/([a-z0-9-]+)\/\1\.shell-script\.shell\.sh"\s*$/gm

function locate(repoRoot: string, slug: string, sourcedBy: string): string {
  for (const dir of SHELL_SCRIPT_DIRS) {
    const rel = `${dir}/${slug}/${slug}.shell-script.shell.sh`
    if (existsSync(`${repoRoot}/${rel}`)) return rel
  }
  throw new Error(
    `${sourcedBy} sources ${slug}, and no ${slug}.shell-script.shell.sh stands under ${SHELL_SCRIPT_DIRS.join(" or ")} — the seam cannot be read whole, and a pass over the parts that were found would be a pass over less than what runs`
  )
}

/**
 * The seam in the order it runs: the driver, then each part where the script
 * that sources it reaches it, depth first. Order is read from the sourcing
 * lines rather than from the names, because the names no longer carry it —
 * the numeric prefixes went when the parts became pages.
 */
export function alanwaltonIosSeamFiles(repoRoot: string): readonly string[] {
  const files: string[] = []
  const seen = new Set<string>()
  const walk = (rel: string): undefined => {
    if (seen.has(rel)) return
    seen.add(rel)
    files.push(rel)
    const text = readFileSync(`${repoRoot}/${rel}`, "utf-8")
    SOURCING_RE.lastIndex = 0
    for (const match of text.matchAll(SOURCING_RE)) {
      const slug = match[1]
      if (slug === undefined) continue
      walk(locate(repoRoot, slug, rel))
    }
  }
  walk(ALANWALTON_IOS_SEAM_SCRIPT)
  if (files.length === 1)
    throw new Error(
      `${ALANWALTON_IOS_SEAM_SCRIPT} sources no part — the seam cannot be read, and a pass over what was read would be a pass over the preamble alone`
    )
  return files
}

export function readAlanwaltonIosSeam(repoRoot: string): string {
  return alanwaltonIosSeamFiles(repoRoot)
    .map((rel) => readFileSync(`${repoRoot}/${rel}`, "utf-8"))
    .join("\n")
}
