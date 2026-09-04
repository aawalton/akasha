import { realpathSync } from "node:fs"
import { join } from "node:path"
import { parse as parseYaml } from "yaml"
import { z } from "zod"

const TREE_ROOT = realpathSync(join(import.meta.dir, "..", "..", ".."))

const NAMED_IN_A_FAULT = 8

export interface Manifest {
  readonly dependencies?: Readonly<Record<string, string>>
  readonly devDependencies?: Readonly<Record<string, string>>
}

export function declaredPackages(manifest: Manifest): readonly string[] {
  return [
    ...Object.keys(manifest.dependencies ?? {}),
    ...Object.keys(manifest.devDependencies ?? {}),
  ].sort()
}

export function saidShort(faults: readonly string[]): string {
  if (faults.length <= NAMED_IN_A_FAULT) return faults.join("; ")
  const rest = faults.length - NAMED_IN_A_FAULT
  return `${faults.slice(0, NAMED_IN_A_FAULT).join("; ")}; and ${String(rest)} more`
}

export function faultsOf(root: string, names: readonly string[]): readonly string[] {
  const faults: string[] = []
  for (const name of names) {
    const manifestPath = join(root, "node_modules", name, "package.json")
    let stands: string
    try {
      stands = realpathSync(manifestPath)
    } catch {
      faults.push(`${name} has nothing at ${manifestPath}`)
      continue
    }
    if (!stands.startsWith(`${root}/`)) faults.push(`${name} stands at ${stands}, outside the tree`)
  }
  return faults
}

export function loadsFromTheTree(): boolean {
  const shape = z.object({ landed: z.literal(true) })
  return shape.safeParse(parseYaml("landed: true")).success
}

async function main(): Promise<undefined> {
  const manifestPath = join(TREE_ROOT, "package.json")
  const manifest = (await Bun.file(manifestPath).json()) as Manifest
  const names = declaredPackages(manifest)
  if (names.length === 0) {
    console.error(`${manifestPath} declares no package, so nothing here proves this tree can run`)
    process.exit(1)
  }
  const faults = faultsOf(TREE_ROOT, names)
  if (faults.length > 0) {
    console.error(
      `${String(faults.length)} of the ${String(names.length)} packages the instructions tree at ` +
        `${TREE_ROOT} declares do not stand in it, so code here would run against whatever the ` +
        "machine happens to hold rather than against this commit's lockfile — " +
        `\`bun install --frozen-lockfile\` did not land in this tree. ${saidShort(faults)}`
    )
    process.exit(1)
  }
  if (!loadsFromTheTree()) {
    console.error(
      `every package the instructions tree at ${TREE_ROOT} declares stands in it, and \`zod\` and ` +
        "`yaml` loaded from it do not behave, so nothing here can be trusted to run"
    )
    process.exit(1)
  }
  console.log(
    `instructions tree at ${TREE_ROOT}: all ${String(names.length)} declared packages stand in it, and it runs`
  )
  return undefined
}

if (import.meta.main) await main()
