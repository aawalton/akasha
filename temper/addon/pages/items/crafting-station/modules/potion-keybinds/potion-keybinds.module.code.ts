import { asBoolean } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-casts/potion-casts.module.code.ts"
import { updateKeyStrip } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-keybind-helpers/potion-keybind-helpers.module.code.ts"
import { getAccountSettings } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-saved-variables/potion-saved-variables.module.code.ts"
import { PotMaker } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-state/potion-state.module.code.ts"
import { showAnnoucement } from "akasha/temper/addon/pages/items/crafting-station/modules/potion-tooltip-helpers/potion-tooltip-helpers.module.code.ts"
import "akasha/design/language/lua-compiler/language-extensions/language-extensions.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-alchemy-station/eso-alchemy-station.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-api-2/eso-api-2.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-enums-19/eso-enums-19.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-01/eso-functions-01.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-02/eso-functions-02.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-functions-05/eso-functions-05.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-globals/eso-globals.type-declaration.d.ts"
import "akasha/temper/eso/type/eso-string-ids/eso-string-ids.type-declaration.d.ts"

interface KeybindButtonDescriptor {
  name: (this: void) => string
  keybind: string
  callback: (this: void) => unknown
  visible: (this: void, keybindButtonDescriptor: KeybindButtonDescriptor) => boolean
  enabled: (this: void) => boolean
}

function isBound(this: void, keybind: string): boolean {
  const [keyCode] = GetHighestPriorityActionBindingInfoFromName(keybind, false)
  return keyCode !== KEY_INVALID
}

type KeybindStripDescriptorGroup = KeybindButtonDescriptor[] & { alignment: number }

function asKeybindStripDescriptorGroup(value: unknown): KeybindStripDescriptorGroup {
  return value as KeybindStripDescriptorGroup
}

function asModeBarButton(value: unknown): ModeBarButton {
  return value as ModeBarButton
}

function initializeKeybindStripDescriptors(this: void): undefined {
  const buttons: KeybindButtonDescriptor[] = [
    {
      name: (): string =>
        PotMaker.resultListShown ? PotMaker.language.search_again : PotMaker.language.search,
      keybind: "POTIONMAKER_SEARCH",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        if (PotMaker.resultListShown) {
          PotMaker.searchAgain()
          return undefined
        }
        PotMaker.startSearch()
        return undefined
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean =>
        !ZO_CraftingUtils_IsPerformingCraftProcess() && PotMaker.loading.IsHidden(),
    },
    {
      name: (): string => GetString(SI_BINDING_NAME_POTIONMAKER_SEARCH_WRITS),
      keybind: "POTIONMAKER_SEARCH_WRITS",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        return PotMaker.findWrits()
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        !PotMaker.resultListShown && isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean => !ZO_CraftingUtils_IsPerformingCraftProcess(),
    },
    {
      name: (): string => GetString(SI_BINDING_NAME_POTIONMAKER_SEARCH_FAVORITS),
      keybind: "POTIONMAKER_SEARCH_FAVORITS",
      callback: (): unknown => {
        PlaySound(SOUNDS.DEFAULT_CLICK ?? "")
        return PotMaker.findFavorites()
      },
      visible: (keybindButtonDescriptor: KeybindButtonDescriptor): boolean =>
        !PotMaker.resultListShown && isBound(keybindButtonDescriptor.keybind),
      enabled: (): boolean => !ZO_CraftingUtils_IsPerformingCraftProcess(),
    },
  ]
  const descriptor = asKeybindStripDescriptorGroup(buttons)
  descriptor.alignment = KEYBIND_STRIP_ALIGN_RIGHT

  PotMaker.keybindStripDescriptor = descriptor

  ZO_CraftingUtils_ConnectKeybindButtonGroupToCraftingProcess(PotMaker.keybindStripDescriptor)
  ZO_PreHook(ALCHEMY.modeBar.m_object, "SetClickedButton", (...args: unknown[]): unknown => {
    const button = args[1] === undefined ? undefined : asModeBarButton(args[1])
    const skipAnim = asBoolean(args[2])
    if (skipAnim === false) {
      const buttonDescriptor = button !== undefined ? button.GetDescriptor() : undefined
      updateKeyStrip(buttonDescriptor)
    }
    return undefined
  })
}

interface ModeBarButton {
  GetDescriptor: (this: ModeBarButton) => string
}

function initTraitLearned(this: void): undefined {
  function hookDisplayDiscoveredTraits(this: void, orgDialog: CraftingResultsControl): undefined {
    const orgDisplayDiscoveredTraits = orgDialog.DisplayDiscoveredTraits
    orgDialog.DisplayDiscoveredTraits = (...args: unknown[]): unknown => {
      const accountSettings = getAccountSettings()
      if (!accountSettings.suppressNewTraitDialog) {
        return orgDisplayDiscoveredTraits(...args)
      }
      const numLearnedTraits = GetNumLastCraftingResultLearnedTraits()

      for (const i of $range(1, numLearnedTraits)) {
        const [traitName, itemName, icon] = GetLastCraftingResultLearnedTraitInfo(i)
        const text = `${zo_iconFormat(icon, 32, 32)} ${zo_strformat(
          SI_TOOLTIP_ITEM_NAME,
          itemName
        )}: ${zo_strformat(SI_ALCHEMY_REAGENT_TRAIT_FORMATTER, traitName)}`
        showAnnoucement(text)
      }
      return undefined
    }
  }
  hookDisplayDiscoveredTraits(CRAFTING_RESULTS)
}

PotMaker.InitializeKeybindStripDescriptors = initializeKeybindStripDescriptors
PotMaker.initTraitLearned = initTraitLearned
