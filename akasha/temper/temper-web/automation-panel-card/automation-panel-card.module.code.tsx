"use client"

import { InputPanelCard } from "@akasha/design-patterns/input-panel-card"
import { CardTitleBadges } from "@akasha/design-primitives/card"
import { Text } from "@akasha/design-primitives/text-body"
import { PagesUILink as Link } from "@akasha/pages-ui/navigation-context"
import { useAutomationSettings } from "@akasha/temper-player-inventory-management-ui/hooks-inventory-settings"
import { AutomationSelect } from "../automation-select/automation-select.module.code.tsx"

interface CharacterAutomationPanelCardProps {
  esoCharacterId: string
  readOnly?: boolean
}

export function CharacterAutomationPanelCard({
  esoCharacterId,
  readOnly,
}: CharacterAutomationPanelCardProps) {
  const { automationSettings, updateCharacterToggle } = useAutomationSettings()

  if (readOnly) return null

  const settings = automationSettings?.characters[esoCharacterId]
  const globalChar = automationSettings?.global?.characters

  return (
    <InputPanelCard
      id="automation"
      collapsible={true}
      title="Automation"
      headerSubtitle={
        <CardTitleBadges>
          <Link
            href="/settings?tab=automation"
            className="cursor-pointer text-tertiary text-xs hover:text-secondary"
          >
            Configure Defaults
          </Link>
        </CardTitleBadges>
      }
    >
      <InputPanelCard.Row
        label="Equipment"
        description={<Text variant="hint">Automatically equip gear to match this build.</Text>}
      >
        <AutomationSelect
          value={settings?.equipment}
          globalValue={globalChar?.equipment}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "equipment", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Food / Drink"
        description={<Text variant="hint">Automatically stock food and drink for this build.</Text>}
      >
        <AutomationSelect
          value={settings?.food}
          globalValue={globalChar?.food}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "food", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Potions"
        description={<Text variant="hint">Automatically stock potions for this build.</Text>}
      >
        <AutomationSelect
          value={settings?.potions}
          globalValue={globalChar?.potions}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "potions", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Soul Gems"
        description={<Text variant="hint">Automatically stock soul gems for this character.</Text>}
      >
        <AutomationSelect
          value={settings?.soulGems}
          globalValue={globalChar?.soulGems}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "soulGems", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Repair Kits"
        description={
          <Text variant="hint">Automatically stock repair kits for this character.</Text>
        }
      >
        <AutomationSelect
          value={settings?.repairKits}
          globalValue={globalChar?.repairKits}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "repairKits", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Lockpicks"
        description={<Text variant="hint">Automatically stock lockpicks for this character.</Text>}
      >
        <AutomationSelect
          value={settings?.lockpicks}
          globalValue={globalChar?.lockpicks}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "lockpicks", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Daily Writs"
        description={
          <Text variant="hint">Enable daily writ crafting automation for this character.</Text>
        }
      >
        <AutomationSelect
          value={settings?.dailyWrits}
          globalValue={globalChar?.dailyWrits}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "dailyWrits", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Skills"
        description={
          <Text variant="hint">
            Automatically equip skills to match this build. Coming soon — this toggle will take
            effect once addon support is added.
          </Text>
        }
      >
        <AutomationSelect
          value={settings?.skills}
          globalValue={globalChar?.skills}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "skills", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Champion Points"
        description={
          <Text variant="hint">
            Automatically allocate champion points to match this build. Coming soon — this toggle
            will take effect once addon support is added.
          </Text>
        }
      >
        <AutomationSelect
          value={settings?.championPoints}
          globalValue={globalChar?.championPoints}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "championPoints", enabled)}
        />
      </InputPanelCard.Row>

      <InputPanelCard.Row
        label="Attributes"
        description={
          <Text variant="hint">
            Automatically allocate attributes to match this build. Coming soon — this toggle will
            take effect once addon support is added.
          </Text>
        }
      >
        <AutomationSelect
          value={settings?.attributes}
          globalValue={globalChar?.attributes}
          onChange={(enabled) => updateCharacterToggle(esoCharacterId, "attributes", enabled)}
        />
      </InputPanelCard.Row>
    </InputPanelCard>
  )
}
