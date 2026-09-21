import { existsSync, readdirSync, rmSync } from "node:fs"
import { join } from "node:path"
import { assertNever } from "akasha/code/type/narrowing/modules/assert-never/assert-never.module.code.ts"
import { listAllAddons } from "akasha/temper/addon/build/resolve/modules/addon-roster/addon-roster.module.code.ts"
import {
  decideFolderOwnership,
  type FolderOwnership,
  OWNERSHIP_MARKER_FILE,
} from "akasha/temper/addon/build/resolve/modules/folder-ownership/folder-ownership.module.code.ts"
import { readSiblingAddonNames } from "akasha/temper/addon/build/resolve/modules/sibling-addons/sibling-addons.module.code.ts"
import { saidShort } from "akasha/temper/command/modules/flag-fault-stage/flag-fault-stage.module.code.ts"
import { addonsDir } from "akasha/temper/eso/path/modules/eso-paths-resolve/eso-paths-resolve.module.code.ts"

export type SweepAction = "remove" | "keep"

export type SweepDecision = {
  readonly action: SweepAction
  readonly reason: string
}

export function decideSweepAction(
  folderName: string,
  ownership: FolderOwnership,
  shipped: ReadonlySet<string>
): SweepDecision {
  if (shipped.has(folderName)) {
    return { action: "keep", reason: `${folderName}/ is one of the folders this fleet ships` }
  }
  switch (ownership) {
    case "temper-owned":
      return {
        action: "remove",
        reason: `it carries ${OWNERSHIP_MARKER_FILE} and no \`temper-addon\` page names it any more`,
      }
    case "foreign":
      return {
        action: "keep",
        reason: `${folderName}/ carries no ${OWNERSHIP_MARKER_FILE}, so something other than the deploy installed it`,
      }
    case "unknown":
      return {
        action: "keep",
        reason: `${folderName}/ would not be read, so who wrote it is unknown`,
      }
    case "absent":
      return { action: "keep", reason: `no ${folderName}/ folder is there` }
    default:
      return assertNever(ownership)
  }
}

export function shippedFolderNames(root: string): ReadonlySet<string> {
  const names = new Set<string>()
  for (const addon of listAllAddons({ repoRoot: root })) {
    names.add(addon.canonicalName)
    for (const sibling of readSiblingAddonNames(root, addon.dir)) names.add(sibling)
  }
  return names
}

function ownershipOf(esoAddons: string, name: string): FolderOwnership {
  const dir = join(esoAddons, name)
  let markerPresent: boolean | undefined
  try {
    readdirSync(dir)
    markerPresent = existsSync(join(dir, OWNERSHIP_MARKER_FILE))
  } catch {
    markerPresent = undefined
  }
  return decideFolderOwnership({ dirExists: true, markerPresent })
}

export type Swept = {
  readonly lines: readonly string[]
  readonly refusals: readonly string[]
}

const NO_ROSTER =
  "no `temper-addon` page names a folder, so what this fleet ships is unsaid, and sweeping now " +
  "would take away every folder the deploy has ever written"

function foldersIn(esoAddons: string): readonly string[] {
  return readdirSync(esoAddons, { withFileTypes: true })
    .filter((one) => one.isDirectory())
    .map((one) => one.name)
}

export function sweptStaleAddons(root: string): Swept {
  const shipped = shippedFolderNames(root)
  if (shipped.size === 0) return { lines: [], refusals: [NO_ROSTER] }

  let esoAddons: string
  let held: readonly string[]
  try {
    esoAddons = addonsDir()
    held = foldersIn(esoAddons)
  } catch (thrown) {
    return {
      lines: [],
      refusals: [
        `the sweep reads the game's addons folder, and which folders are there went unread — ${saidShort(thrown)}`,
      ],
    }
  }

  const lines: string[] = []
  const gone: string[] = []
  for (const name of held) {
    const decision = decideSweepAction(name, ownershipOf(esoAddons, name), shipped)
    if (decision.action === "keep") continue
    const target = join(esoAddons, name)
    try {
      rmSync(target, { recursive: true, force: true })
    } catch (thrown) {
      return {
        lines,
        refusals: [`${name}: taking ${target} away broke off — ${saidShort(thrown)}`],
      }
    }
    gone.push(name)
    lines.push(`swept ${name} out of ${esoAddons} — ${decision.reason}`)
  }
  lines.push(
    `swept ${esoAddons} — ${String(held.length)} folder(s) weighed against the ${String(shipped.size)} this fleet ships, ${String(gone.length)} taken away`
  )
  return { lines, refusals: [] }
}
