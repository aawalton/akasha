import type { AffixScriptId } from "@akasha/temper-skill-kinds/scribing-affix-scripts"
import type { FocusScriptId } from "@akasha/temper-skill-kinds/scribing-focus-scripts"
import type { SignatureScriptId } from "@akasha/temper-skill-kinds/scribing-signature-scripts"
import { createDataFile } from "@akasha/utils-narrow/create-data-file"
import type { GrimoireTemplate } from "../grimoire-template/grimoire-template.module.code.ts"
import { SCRIBING_GRIMOIRES_00 } from "../scribing-grimoires-00/scribing-grimoires-00.module.code.ts"
import { SCRIBING_GRIMOIRES_01 } from "../scribing-grimoires-01/scribing-grimoires-01.module.code.ts"
import { SCRIBING_GRIMOIRES_02 } from "../scribing-grimoires-02/scribing-grimoires-02.module.code.ts"
import { SCRIBING_GRIMOIRES_03 } from "../scribing-grimoires-03/scribing-grimoires-03.module.code.ts"

const GRIMOIRES_DATA = {
  ...SCRIBING_GRIMOIRES_00,
  ...SCRIBING_GRIMOIRES_01,
  ...SCRIBING_GRIMOIRES_02,
  ...SCRIBING_GRIMOIRES_03,
} satisfies Record<string, GrimoireTemplate>

export const grimoires = createDataFile<GrimoireTemplate>()(GRIMOIRES_DATA)

export type GrimoireId = (typeof grimoires.ids)[number]

export function getGrimoireCompatibleScripts(grimoireId: GrimoireId): {
  focus: readonly FocusScriptId[]
  signature: readonly SignatureScriptId[]
  affix: readonly AffixScriptId[]
} {
  const grimoire = grimoires.data[grimoireId]
  return {
    focus: grimoire.compatibleFocusScripts,
    signature: grimoire.compatibleSignatureScripts,
    affix: grimoire.compatibleAffixScripts,
  }
}
