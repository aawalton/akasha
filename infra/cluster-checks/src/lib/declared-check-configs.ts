import { readdirSync } from "node:fs"
import { resolve } from "node:path"
import { ownRepoRoot } from "../../../../repo/roots/roots"

export const DECLARED_TABLE_DIRECTORY = "tools/lib/check-workflow"

export const DECLARED_TABLE_ROOT = resolve(ownRepoRoot(), DECLARED_TABLE_DIRECTORY)

export const CHECK_COMPOSITION_MODULE = resolve(DECLARED_TABLE_ROOT, "index.ts")

const isTableModule = (file: string): boolean =>
  /^check-configs.*\.ts$/.test(file) && !file.includes(".test.")

const isCheckConfig = (value: unknown): value is { readonly name: string } => {
  if (typeof value !== "object" || value === null) return false
  if (!("name" in value) || typeof value.name !== "string") return false
  const hasScript = "script" in value && typeof value.script === "string"
  const hasCommands = "commands" in value && typeof value.commands === "function"
  return hasScript || hasCommands
}

export interface DeclaredCheckConfigs {
  readonly names: ReadonlySet<string>
  readonly modules: number
}

export async function declaredCheckNames(): Promise<DeclaredCheckConfigs> {
  const files = readdirSync(DECLARED_TABLE_ROOT).filter(isTableModule)
  const names = new Set<string>()
  for (const file of files) {
    const module: Record<string, unknown> = await import(resolve(DECLARED_TABLE_ROOT, file))
    for (const exported of Object.values(module)) {
      if (!Array.isArray(exported)) continue
      for (const entry of exported) {
        if (isCheckConfig(entry)) names.add(entry.name)
      }
    }
  }
  return { names, modules: files.length }
}
