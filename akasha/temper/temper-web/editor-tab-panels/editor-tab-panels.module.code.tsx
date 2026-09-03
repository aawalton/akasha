"use client"

import { PanelToggleProvider } from "@akasha/design-layout/panel-toggle-provider"
import { TabsContent } from "@akasha/design-patterns/tabs"
import type { CharacterState } from "@akasha/temper-character-build/build-types"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import type { SkillLineCategoryId } from "@akasha/temper-skill-lines/skill-line-category-data"
import { ChampionPointsPanel } from "../champion-points-panel/champion-points-panel.module.code.tsx"
import type { CharacterMetadata } from "../character-context/character-context.module.code.tsx"
import { CharacterPanel } from "../character-panel/character-panel.module.code.tsx"
import { EquipmentPanel } from "../equipment-panel/equipment-panel.module.code.tsx"
import { GeneralPanel } from "../general-panel/general-panel.module.code.tsx"
import { SkillsPanel } from "../skills-panel/skills-panel.module.code.tsx"

interface EditorTabPanelsProps {
  build: CharacterState
  buildId: BuildId
  buildName: string
  buildDescription: string
  activeTab: string
  readOnly: boolean
  isOwner: boolean
  mainColumnCount: 1 | 2
  esoCharacterId: string | undefined
  availableSkills: CharacterMetadata["availableSkills"]
  availableSets: CharacterMetadata["availableSets"]
  passiveSearch: string
  passiveCategory: SkillLineCategoryId | null
  onUpdateMeta: CharacterMetadata["updateMeta"]
  onUpdateCharacter: (updates: Partial<CharacterState["character"]>) => void
  onUpdateBuild: (updates: Partial<CharacterState>) => void
  onUpdateEquipment: (updates: Partial<CharacterState["equipment"]>) => void
  onUpdateSkills: (updates: Partial<CharacterState["skills"]>) => void
  onUpdateChampionPoints: (updates: Partial<CharacterState["championPoints"]>) => void
  onUpdateConsumables: (updates: Partial<CharacterState["consumables"]>) => void
  onUpdateTarget: (updates: Partial<CharacterState["target"]>) => void
  onUpdateAccount: (updates: Partial<CharacterState["account"]>) => void
}

export function EditorTabPanels({
  build,
  buildId,
  buildName,
  buildDescription,
  activeTab,
  readOnly,
  isOwner,
  mainColumnCount,
  esoCharacterId,
  availableSkills,
  availableSets,
  passiveSearch,
  passiveCategory,
  onUpdateMeta,
  onUpdateCharacter,
  onUpdateBuild,
  onUpdateEquipment,
  onUpdateSkills,
  onUpdateChampionPoints,
  onUpdateConsumables,
  onUpdateTarget,
  onUpdateAccount,
}: EditorTabPanelsProps) {
  return (
    <div data-view-only={readOnly || undefined} className="w-full">
      <TabsContent value="general">
        <PanelToggleProvider active={activeTab === "general"}>
          <GeneralPanel
            buildId={buildId}
            buildName={buildName}
            buildDescription={buildDescription}
            character={{ name: build.character.name }}
            onUpdateMeta={onUpdateMeta}
            onUpdateCharacter={onUpdateCharacter}
            columnCount={mainColumnCount}
            readOnly={readOnly}
            buildFieldsReadOnly={!isOwner}
          />
        </PanelToggleProvider>
      </TabsContent>

      <TabsContent value="character">
        <PanelToggleProvider active={activeTab === "character"}>
          <CharacterPanel
            character={build.character}
            consumables={build.consumables}
            mundusStone={build.character.mundusStone}
            target={build.target}
            account={build.account}
            onUpdate={onUpdateCharacter}
            onUpdateConsumables={onUpdateConsumables}
            onUpdateMundus={(mundusStone) => onUpdateCharacter({ mundusStone })}
            onUpdateTarget={onUpdateTarget}
            onUpdateAccount={onUpdateAccount}
            columnCount={mainColumnCount}
            readOnly={readOnly}
            esoCharacterId={esoCharacterId}
          />
        </PanelToggleProvider>
      </TabsContent>

      <TabsContent value="equipment">
        <PanelToggleProvider active={activeTab === "equipment"}>
          <EquipmentPanel
            equipment={build.equipment}
            onUpdate={onUpdateEquipment}
            availableSets={availableSets}
            playerClass={build.character.class}
            columnCount={mainColumnCount}
            readOnly={readOnly}
          />
        </PanelToggleProvider>
      </TabsContent>

      <TabsContent value="skills">
        <PanelToggleProvider active={activeTab === "skills"}>
          <SkillsPanel
            skills={build.skills}
            scribing={build.scribing}
            character={build.character}
            equipment={build.equipment}
            availableSkills={availableSkills}
            onUpdateSkills={onUpdateSkills}
            onUpdateScribing={(scribing) => onUpdateBuild({ scribing })}
            onUpdateCharacter={onUpdateCharacter}
            columnCount={mainColumnCount}
            readOnly={readOnly}
            passiveSearch={passiveSearch}
            passiveCategory={passiveCategory}
          />
        </PanelToggleProvider>
      </TabsContent>

      <TabsContent value="champion">
        <PanelToggleProvider active={activeTab === "champion"}>
          <ChampionPointsPanel
            championPoints={build.championPoints}
            onUpdate={onUpdateChampionPoints}
            columnCount={mainColumnCount}
            readOnly={readOnly}
          />
        </PanelToggleProvider>
      </TabsContent>
    </div>
  )
}
