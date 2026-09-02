import { grimoires } from "@akasha/temper-character-skills/scribing-grimoires"
import { affixScripts } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import { focusScripts } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import { signatureScripts } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import type { CompletionCharacterRow } from "../completion-character-row/completion-character-row.module.code.ts"
import { isCharacterMeasured } from "../completion-measured/completion-measured.module.code.ts"
import type {
  CharacterScribingProgress,
  ScribingKnowledgeItem,
} from "../completion-ui-types/completion-ui-types.module.code.ts"

export function transformScribingProgress(
  rows: readonly CompletionCharacterRow[]
): readonly CharacterScribingProgress[] {
  const result: CharacterScribingProgress[] = []

  for (const row of rows) {
    const completion = row.completion
    if (!completion || !isCharacterMeasured(completion)) continue

    const scribing = completion.scribing
    const unlockedGrimoireNames = new Set<string>()
    const unlockedScriptNames = new Set<string>()

    if (scribing) {
      for (const entry of Object.values(scribing.grimoires)) {
        if (entry.unlocked) unlockedGrimoireNames.add(entry.name)
      }
      for (const entry of Object.values(scribing.scripts)) {
        if (entry.unlocked) unlockedScriptNames.add(entry.name)
      }
    }

    const grimoireItems: ScribingKnowledgeItem[] = grimoires.list.map((g) => ({
      name: g.name,
      unlocked: unlockedGrimoireNames.has(g.name),
    }))

    const focusScriptItems: ScribingKnowledgeItem[] = focusScripts.list.map((s) => ({
      name: s.name,
      unlocked: unlockedScriptNames.has(s.name),
    }))

    const signatureScriptItems: ScribingKnowledgeItem[] = signatureScripts.list
      .filter((s) => s.itemId !== 0)
      .map((s) => ({
        name: s.name,
        unlocked: unlockedScriptNames.has(s.name),
      }))

    const affixScriptItems: ScribingKnowledgeItem[] = affixScripts.list
      .filter((s) => s.itemId !== 0)
      .map((s) => ({
        name: s.name,
        unlocked: unlockedScriptNames.has(s.name),
      }))

    result.push({
      characterId: row.id,
      grimoires: grimoireItems,
      focusScripts: focusScriptItems,
      signatureScripts: signatureScriptItems,
      affixScripts: affixScriptItems,
    })
  }

  return result
}
