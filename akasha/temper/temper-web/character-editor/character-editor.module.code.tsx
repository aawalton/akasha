"use client"

import type {
  CharacterState,
  CharacterVisibility,
} from "@akasha/temper-character-build/build-types"
import type { Skill } from "@akasha/temper-character-skills/character-skills"
import type { SetTemplate as SetsAll } from "@akasha/temper-equipment/set-template"
import type { BuildId } from "@akasha/temper-formula-framework/branded-id"
import { CharacterProvider } from "../character-context/character-context.module.code.tsx"
import { CharacterEditorContent } from "../character-editor-content/character-editor-content.module.code.tsx"

interface CharacterEditorProps {
  buildId: BuildId
  initialTab?: string
  initialBuild: CharacterState
  initialBuildHash: string
  isOwner: boolean
  initialVisibility: CharacterVisibility
  isTargetBuild: boolean
  availableSkills: readonly Skill[]
  availableSets: readonly SetsAll[]
}

export function CharacterEditor({
  buildId,
  initialTab,
  initialBuild,
  initialBuildHash,
  isOwner,
  initialVisibility,
  isTargetBuild,
  availableSkills,
  availableSets,
}: CharacterEditorProps) {
  return (
    <CharacterProvider
      initialBuild={initialBuild}
      initialBuildHash={initialBuildHash}
      buildId={buildId}
      isOwner={isOwner}
      initialVisibility={initialVisibility}
      isTargetBuild={isTargetBuild}
      availableSkills={availableSkills}
      availableSets={availableSets}
    >
      <CharacterEditorContent initialTab={initialTab} />
    </CharacterProvider>
  )
}
