"use client"

import { ResponsiveColumns } from "@akasha/design-layout/responsive-columns"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { MundusId } from "@akasha/temper-character-sources/mundus-source"
import { AttributesPanelCard } from "../attributes-panel-card/attributes-panel-card.module.code.tsx"
import { CharacterAutomationPanelCard } from "../automation-panel-card/automation-panel-card.module.code.tsx"
import { ConsumablesPanelCard } from "../consumables-panel-card/consumables-panel-card.module.code.tsx"
import { IdentityPanelCard } from "../identity-panel-card/identity-panel-card.module.code.tsx"
import { OtherPanelCard } from "../other-panel-card/other-panel-card.module.code.tsx"
import { TargetPanelCard } from "../target-panel-card/target-panel-card.module.code.tsx"
import { useCharacterMetadata } from "../use-character/use-character.module.code.ts"

interface CharacterPanelProps {
  character: CharacterState["character"]
  consumables: CharacterState["consumables"]
  mundusStone: MundusId
  target: CharacterState["target"]
  account: CharacterState["account"]
  onUpdate: (updates: Partial<CharacterState["character"]>) => void
  onUpdateConsumables: (updates: Partial<CharacterState["consumables"]>) => void
  onUpdateMundus: (mundusStone: MundusId) => void
  onUpdateTarget: (updates: Partial<CharacterState["target"]>) => void
  onUpdateAccount: (updates: Partial<CharacterState["account"]>) => void
  columnCount: 1 | 2
  readOnly?: boolean
  esoCharacterId?: string
}

export function CharacterPanel({
  character,
  consumables,
  mundusStone,
  target,
  account,
  onUpdate,
  onUpdateConsumables,
  onUpdateMundus,
  onUpdateTarget,
  onUpdateAccount,
  columnCount,
  readOnly,
  esoCharacterId,
}: CharacterPanelProps) {
  const { updateMeta } = useCharacterMetadata()
  return (
    <ResponsiveColumns columnCount={columnCount}>
      <IdentityPanelCard
        character={{
          class: character.class,
          race: character.race,
          curseState: character.curseState,
          vampireStage: character.vampireStage,
        }}
        onUpdate={(updates) => onUpdate(updates)}
        readOnly={readOnly}
        collapseProtected
      />
      <AttributesPanelCard
        attributes={character.attributes}
        onUpdate={(attributes) => onUpdate({ attributes })}
        readOnly={readOnly}
      />
      <ConsumablesPanelCard
        consumables={consumables}
        mundusStone={mundusStone}
        onUpdateConsumables={onUpdateConsumables}
        onUpdateMundus={onUpdateMundus}
        readOnly={readOnly}
      />
      <TargetPanelCard
        target={target}
        onUpdate={onUpdateTarget}
        onUpdateTargetCount={(targetCount) => updateMeta({ targetCount })}
        readOnly={readOnly}
      />
      <OtherPanelCard
        alliance={character.alliance}
        onUpdateAlliance={(alliance) => onUpdate({ alliance })}
        account={account}
        onUpdateAccount={onUpdateAccount}
        readOnly={readOnly}
      />
      {esoCharacterId != null && !readOnly && (
        <CharacterAutomationPanelCard esoCharacterId={esoCharacterId} />
      )}
    </ResponsiveColumns>
  )
}
