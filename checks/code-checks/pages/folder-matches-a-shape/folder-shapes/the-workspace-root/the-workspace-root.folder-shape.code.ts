import { basename } from "node:path"
import { saidInside } from "../../../../../modules/shape-saying/shape-saying.module.code.ts"
import type { Standing } from "../folder-shape.page-type.ts"

const ROOT = ""

const DOMAIN = "domain"

const WORKSPACE = "workspace"

const TWO = 2

export function theWorkspaceRoot(standing: Standing): readonly string[] {
  if (standing.folder !== ROOT) {
    return [`it is \`${standing.folder}\`, a folder inside the workspace rather than its root`]
  }
  if (standing.pages.length !== TWO) {
    return [
      `it holds ${standing.pages.length} page(s) rather than a workspace and the domain over the tree: ${saidInside(standing.folder, standing.pages)}`,
    ]
  }
  const workspace = standing.pages.find((one) =>
    standing.extending(String(one.pageTypeSlug), WORKSPACE)
  )
  if (workspace === undefined) return ["neither page here is a workspace"]
  const domain = standing.pages.find((one) => one !== workspace)
  if (domain === undefined || !standing.extending(String(domain.pageTypeSlug), DOMAIN)) {
    return [`the page beside \`${workspace.slug}\` is no domain`]
  }
  const said: string[] = []
  const parts = new Set<string>([...standing.parts(workspace), ...standing.parts(domain)])
  const loose = standing.files.filter((one) => !parts.has(one))
  if (loose.length > 0) {
    said.push(
      `${loose.length} files are the part of neither \`${workspace.slug}\` nor \`${domain.slug}\`: ${saidInside(standing.folder, loose)}`
    )
  }
  const declared = standing.declared(standing.folder)
  const stray = standing.subfolders.filter((at) => {
    if (standing.held.has(basename(at))) return false
    if ([...parts].some((one) => one.startsWith(`${at}/`))) return false
    return !standing.holds(at).some((one) => declared.has(one))
  })
  if (stray.length > 0) {
    said.push(
      `${stray.length} subfolders are the folder of no part \`${domain.slug}\` declares: ${saidInside(standing.folder, stray)}`
    )
  }
  return said
}
