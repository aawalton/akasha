import { mergeByKey } from "akasha/temper/addon/pages/characters/modules/characters-keyed-merge/characters-keyed-merge.module.code.ts"
import { populatedName } from "akasha/temper/addon/pages/characters/modules/characters-populated-name/characters-populated-name.module.code.ts"
import type {
  GrimoireEntry,
  ScribingProgress,
  ScriptEntry,
} from "akasha/temper/player/completion/modules/completion-record/completion-record.module.code.ts"

function mergeGrimoire(stored: GrimoireEntry, fresh: GrimoireEntry): GrimoireEntry {
  return {
    name: populatedName(stored.name, fresh.name),
    unlocked: stored.unlocked || fresh.unlocked,
  }
}

function mergeScript(stored: ScriptEntry, fresh: ScriptEntry): ScriptEntry {
  return {
    name: populatedName(stored.name, fresh.name),
    slot: fresh.name !== "" ? fresh.slot : stored.slot,
    unlocked: stored.unlocked || fresh.unlocked,
  }
}

export function mergeScribing(
  stored: ScribingProgress | undefined,
  fresh: ScribingProgress
): ScribingProgress {
  if (stored === undefined) return fresh

  return {
    grimoires: mergeByKey(stored.grimoires, fresh.grimoires, mergeGrimoire),
    scripts: mergeByKey(stored.scripts, fresh.scripts, mergeScript),
  }
}
