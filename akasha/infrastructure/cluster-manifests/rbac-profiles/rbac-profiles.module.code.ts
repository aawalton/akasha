import { join } from "node:path"
import type { NamespaceProfile } from "@akasha/workflow-language/rbac-types"

export const RBAC_GLOB = "akasha/infrastructure/cluster-manifests/*-rbac/*-rbac.module.code.ts"

export interface RbacProfileSource {
  readonly path: string
  readonly packageName: string
  readonly profiles: readonly NamespaceProfile[]
}

function listProfileSources(root: string): readonly string[] {
  const glob = new Bun.Glob(RBAC_GLOB)
  return [...glob.scanSync({ cwd: root, onlyFiles: true })].sort().map((rel) => join(root, rel))
}

export async function profileSources(root: string): Promise<readonly RbacProfileSource[]> {
  const files = listProfileSources(root)
  if (files.length === 0) {
    throw new Error(
      `no RBAC profile source under ${root} matches ${RBAC_GLOB}, and every namespace role is ` +
        "declared in one of them, so going on would report that nothing grants anything rather " +
        "than failing"
    )
  }
  const sources: RbacProfileSource[] = []
  for (const file of files) {
    const mod: Record<string, unknown> = await import(file)
    const held = mod.profiles ?? mod.default
    const exported: readonly NamespaceProfile[] = Array.isArray(held)
      ? (held as readonly NamespaceProfile[])
      : []
    if (exported.length === 0) {
      throw new Error(`${file} stands among the RBAC profiles and exports none`)
    }
    if (typeof mod.packageName !== "string" || mod.packageName === "") {
      throw new Error(
        `${file} exports no \`packageName\`, and which package a profile belongs to is not ` +
          "recoverable from where the file sits"
      )
    }
    sources.push({ path: file, packageName: mod.packageName, profiles: exported })
  }
  return sources
}

export async function allProfiles(root: string): Promise<readonly NamespaceProfile[]> {
  return (await profileSources(root)).flatMap((source) => [...source.profiles])
}
