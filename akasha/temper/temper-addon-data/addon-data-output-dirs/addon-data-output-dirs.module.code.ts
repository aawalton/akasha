import { existsSync, mkdirSync } from "node:fs"
import { dirname, resolve } from "node:path"
import { codeRoot } from "@akasha/pages-system/code-root"

function temperFile(rel: string): string {
  return resolve(codeRoot(), "temper", rel)
}

const out = (rel: string): string => temperFile(`${rel}/src/generated`)

export const TEMPER_EQUIPMENT_ARMOR_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/armor/generated"
)
export const TEMPER_EQUIPMENT_ENCHANTS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/enchants/generated"
)
export const TEMPER_EQUIPMENT_SETS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/sets/generated"
)
export const TEMPER_EQUIPMENT_TRAITS_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/traits/generated"
)
export const TEMPER_EQUIPMENT_WEAPON_OUTPUT_DIR = temperFile(
  "game-characters-equipment/src/weapons/generated"
)
export const COMPANIONS_OUTPUT_DIR = out("game-companions-addon")
export const TEMPER_CHARACTERS_CAPTURE_OUTPUT_DIR = out("game-characters-capture-addon")
export const TEMPER_INVENTORY_CORE_OUTPUT_DIR = out("game-items-core")
export const TEMPER_SKILLS_OUTPUT_DIR = out("game-characters-skills")
export const TEMPER_STATS_OUTPUT_DIR = out("game-characters-stats")
export const WEB_ENGINE_INVENTORY_DIR = out("game-items-rules-core")

/**
 * The output dirs whose package git still tracks a file under.
 *
 * This list held twelve, then one, and now none.
 *
 * Eleven named a package the migration has ablated: measured 2026-09-02, `git ls-files` answers 0
 * tracked files under each of game-companions-addon, game-characters-equipment,
 * game-characters-capture-addon, game-items-core, game-characters-skills, game-characters-stats
 * and game-items-rules-core, and re-measured 2026-09-03 the same seven still answer 0.
 *
 * The twelfth was `temper/player-completion`, and it went for a different reason. Its thirteen
 * generated tables all render byte-identical from akasha pages, proved 2026-09-02 by rendering
 * each through its `@akasha/temper-addon-generators` module and comparing against the tracked
 * file. So the package holds no source, only build output, and its own 23 files are the last
 * importers of that output once web's remaining edges clear. Data with no reader outside the
 * package that holds it goes with the package rather than into a new home, so the completion
 * writes came out rather than being repointed.
 *
 * The eleven consts left are kept because the write table still names each of them, and they came
 * here with the write table when the write table landed as akasha modules.
 * `TEMPER_COMPLETION_OUTPUT_DIR` went with the writes that named it, being the one this file
 * declared that nothing then reached for. What must not remain is this list creating directories
 * under packages that ship nothing.
 *
 * An empty list leaves the guard doing nothing, which is right: there is no destination left for
 * it to stand over. Given a dir whose parent is absent it still throws, so it is not blind.
 */
const ALL_OUTPUT_DIRS: readonly string[] = []

export function assertOutputDirParentsExist(dirs: readonly string[] = ALL_OUTPUT_DIRS): undefined {
  for (const dir of dirs) {
    const parent = dirname(dir)
    if (!existsSync(parent)) {
      throw new Error(
        `Codegen output dir is orphaned: "${dir}" has no existing parent at "${parent}". ` +
          "A generated target's package was likely moved or renamed without updating this module."
      )
    }
  }
  return undefined
}

export function ensureAllOutputDirs(): undefined {
  assertOutputDirParentsExist()
  for (const dir of ALL_OUTPUT_DIRS) {
    mkdirSync(dir, { recursive: true })
  }
  return undefined
}
