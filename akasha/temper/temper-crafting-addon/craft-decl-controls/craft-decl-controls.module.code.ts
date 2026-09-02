export {}

declare global {
  const TemperCrafting_CharacterPanelBoxScrollChild: TemperCraftingControl

  const TemperCrafting_CharacterPanel: TemperCraftingControl

  const TemperCrafting_PanelButtonCharacters: TemperCraftingButton

  const TemperCrafting_CharacterFrame1: TemperCraftingControl | undefined

  const TemperCrafting_ButtonFrame: TemperCraftingControl

  const TemperCrafting_ButtonFrameButtonBG: TopLevelWindow

  const TemperCrafting_Quest: TopLevelWindow

  const TemperCrafting_Panel: TopLevelWindow

  const TemperCrafting_PanelButtonCraftedSets: TemperCraftingButton

  const TemperCrafting_SetPanel: TemperCraftingControl

  const TemperCrafting_SetPanelScrollChild: TemperCraftingControl

  const TemperCrafting_Style: TemperCraftingControl

  type CsResearchRef = [number, number, number, unknown]

  interface CsComboBoxControl extends Control {
    dropdown: CsComboBox
    name: unknown
  }

  const TemperCrafting_Panel12Hours: LabelControl

  const TemperCrafting_Panel24Hours: LabelControl

  const TemperCrafting_PanelFenceGoldText: TemperCraftingLabel

  const TemperCrafting_PanelQuestButton: TemperCraftingControl

  const TemperCrafting_ButtonFrameButton: TemperCraftingControl

  const TemperCrafting_CharacterPanelHeader: LabelControl

  const TemperCrafting_StylePreviewType: CsComboBoxControl

  const TemperCrafting_CookSpaceButton: TemperCraftingControl

  const TemperCrafting_CookCategoryButtonFavorites: TemperCraftingControl

  const TemperCrafting_CookCategoryButtonWrit: TemperCraftingControl

  const TemperCrafting_CookCategoryButtonFurniture: TemperCraftingControl

  const TemperCrafting_CookCategoryButtonFurnitureFavorites: TemperCraftingControl

  const TemperCrafting_CookCategoryButtonFillet: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton1: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton2: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton3: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton4: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton5: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton6: TemperCraftingControl

  const TemperCrafting_BlueprintCategoryButton7: TemperCraftingControl

  const TemperCrafting_RuneMenu: TemperCraftingControl

  const TemperCrafting_RuneArmorButton: TemperCraftingControl

  const TemperCrafting_RuneWeaponButton: TemperCraftingControl

  const TemperCrafting_RuneJewelryButton: TemperCraftingControl

  const TemperCrafting_RuneSpaceButton: TemperCraftingControl

  const TemperCrafting_RuneCreateButton: TemperCraftingControl

  const TemperCrafting_RuneRefineButton: TemperCraftingControl

  const TemperCrafting_RuneFavoriteButton: TemperCraftingControl

  const TemperCrafting_RuneWritButton: TemperCraftingControl

  const TemperCrafting_RuneFurnitureButton: TemperCraftingControl

  const TemperCrafting_RuneFavoriteFurnitureButton: TemperCraftingControl

  const TemperCrafting_RuneRefineAllButton: TemperCraftingControl

  const TemperCrafting_RuneHandmadeButton: TemperCraftingControl

  const TemperCrafting_QuestText: LabelControl

  const TemperCrafting_DolgubonsWritsEndpoint: LabelControl | undefined

  const TemperCrafting_CookSpaceButtonName: LabelControl

  var _CS: unknown

  const TemperCrafting_Rune: TopLevelWindow

  const TemperCrafting_RuneHeader: BackdropControl

  const TemperCrafting_RuneInfo: LabelControl

  const TemperCrafting_RuneAmountLabel: LabelControl

  const TemperCrafting_RuneSearch: EditControl

  const TemperCrafting_RuneSearchBG: BackdropControl

  const TemperCrafting_RuneLevelButton: TemperCraftingButton

  const TemperCrafting_RuneGlyphSectionScrollChild: TemperCraftingControl

  const TemperCrafting_RuneGlyphSectionScrollChildRefine: TemperCraftingControl

  const TemperCrafting_RuneGlyphSectionScrollChildSelection: TemperCraftingControl

  const TemperCrafting_RuneGlyphDivider: BackdropControl

  const TemperCrafting_RuneCloseButton: TemperCraftingButton

  const TemperCrafting_RuneSpaceButtonName: LabelControl

  const TemperCrafting_RuneHighlight1: TextureControl

  const TemperCrafting_RuneHighlight2: TextureControl

  const TemperCrafting_QuestFrame: TemperCraftingControl & {
    CreateControl: (name: string, controlType: CtControl) => InspirationContainer
  }

  const TemperCrafting_Alarm: {
    AddMessage: (text: string, r: number, g: number, b: number, a: number) => undefined
  }

  const TemperCrafting_Recipe_Window: TopLevelWindow

  const TemperCrafting_Recipe: BackdropControl

  const TemperCrafting_RecipePanelScrollChild: TemperCraftingControl

  const TemperCrafting_RecipeHeadline: LabelControl

  const TemperCrafting_RecipeInfo: LabelControl

  const TemperCrafting_RecipeSearch: EditControl

  const TemperCrafting_RecipeHideKnownButton: TemperCraftingButton

  const TemperCrafting_RecipeHideUnknownButton: TemperCraftingButton

  const TemperCrafting_Cook: TopLevelWindow

  const TemperCrafting_CookFoodSectionScrollChild: TemperCraftingControl

  const TemperCrafting_CookHeadline: LabelControl

  const TemperCrafting_CookInfo: LabelControl

  const TemperCrafting_CookAmount: EditControl

  const TemperCrafting_CookSearch: EditControl

  const TemperCrafting_RuneAmount: EditControl

  const TemperCrafting_Style_Window: TopLevelWindow

  const TemperCrafting_StylePanelScrollChildStyles: TemperCraftingControl

  const TemperCrafting_StylePanelScrollChildSets: TemperCraftingControl

  const TemperCrafting_StyleHeader: LabelControl

  const TemperCrafting_StyleHideButton: TemperCraftingButton

  const TemperCrafting_StyleHideCrownButton: TemperCraftingButton

  const TemperCrafting_StyleHidePerfectedButton: TemperCraftingButton

  const TemperCrafting_StyleHideUnknownButton: TemperCraftingButton

  const TemperCrafting_Blueprint_Window: TopLevelWindow

  const TemperCrafting_Blueprint: BackdropControl

  const TemperCrafting_BlueprintPanelScrollChild: TemperCraftingControl

  const TemperCrafting_BlueprintHeadline: LabelControl

  const TemperCrafting_BlueprintInfo: LabelControl

  const TemperCrafting_BlueprintSearch: EditControl

  const TemperCrafting_BlueprintHideKnownButton: TemperCraftingButton

  const TemperCrafting_BlueprintHideUnknownButton: TemperCraftingButton

  interface ObjectPool<T> {
    ReleaseObject: (key: number) => undefined
  }

  interface SceneManager {
    HideTopLevel: (topLevelWindow: Control) => undefined
  }

  interface TemperCraftingControl extends Control {
    data?: TemperCraftingControlData
    checkState?: number
    tristate?: boolean
  }

  interface TemperCraftingLabel extends LabelControl {
    data?: TemperCraftingControlData
  }

  interface TemperCraftingButton extends ButtonControl {
    data?: TemperCraftingControlData
    checkState?: number
    tristate?: boolean
  }

  interface ButtonControl {
    SetNormalFontColor: (r: number, g: number, b: number, a: number) => undefined
    SetMouseOverFontColor: (r: number, g: number, b: number, a: number) => undefined
    SetHorizontalAlignment: (alignment: number) => undefined
    SetVerticalAlignment: (alignment: number) => undefined
    EnableMouseButton: (button: number, enabled: boolean) => undefined
  }

  interface TooltipControl {
    SetWornItem: (slotIndex: number, ...rest: unknown[]) => undefined
    SetAttachedMailItem: (mailId: Id64, attachmentIndex: number, ...rest: unknown[]) => undefined
    SetBuybackItem: (entryIndex: number, ...rest: unknown[]) => undefined
    SetTradingHouseListing: (tradingHouseListingIndex: number, ...rest: unknown[]) => undefined
    SetTradeItem: (tradeWho: number, slotIndex: number, ...rest: unknown[]) => undefined
    SetQuestReward: (rewardIndex: number, ...rest: unknown[]) => undefined
  }

  interface MasterMerchantApi {
    addStatsAndGraph: (tooltip: TooltipControl, itemLink: string, extend: boolean) => undefined
  }

  interface TamrielTradeCentrePriceApi {
    AppendPriceInfo: (tooltip: TooltipControl, itemInfo: unknown) => undefined
  }

  interface LamEditboxControl {
    type: "editbox"
    name: string
    tooltip?: string
    isMultiline?: boolean
    getFunc: (this: void) => string | number
    setFunc: (this: void, value: string) => undefined
    default?: string | number
  }

  interface TemperCraftingControlData {
    abilityId?: number
    research?: CsResearchRef
    addline?: string[]
    level?: number
    charactername?: string
    info?: string
    link?: string
    nr?: number
    zone?: Record<number, number>
    node?: Record<number, number>
    name?: string
    buttons?: Record<number, string | undefined>
    set?: number
    travel?: boolean
    crafting?: [{ GetText: () => string }, number]
    craftable?: boolean
  }

  interface CsComboBox {
    SetSelectedItem: (name: string) => undefined
    CreateItemEntry: (
      name: string,
      callback: (comboBox: unknown, choiceText: string, choice: ComboBoxItem) => undefined
    ) => ComboBoxItem
    AddItem: (entry: ComboBoxItem) => undefined
  }

  interface CsComboBoxControl {
    dropdown: CsComboBox
    name: unknown
  }

  interface CsTooltipCraftField {
    GetText: () => string
  }

  interface CsStyleApi {
    IsPerfectedStyle: (style: number) => boolean
    IsUnknownStyle: (style: number) => boolean
    IsCrownStyle: (style: number) => boolean
    IsSimpleStyle: (style: number) => boolean
    GetChapterId: (style: number, chapter: number) => number
  }

  interface InventorySlotData {
    bagId: number
    uniqueId: string
    uid?: string
    quality: number
    lnk?: string
    lootId?: number
  }

  interface FcoisApi {
    addonVars: FcoisAddonVars
    IsEnchantingLocked: (this: void, bagId: number, slotIndex: number) => boolean
    IsJewelryResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
    IsResearchLocked: (this: void, bagId: number, slotIndex: number) => boolean
    IsAlchemyDestroyLocked: (this: void, bagId: number, slotIndex: number) => boolean
  }

  interface ScaleAnimation extends ZO_Animation {
    SetStartScale: (scale: number) => undefined
    SetEndScale: (scale: number) => undefined
  }

  interface CenterScreenAnnounceMessageParams {
    SetSound: (sound: string | undefined) => undefined
    MarkSuppressIconFrame: () => undefined
    MarkShowImmediately: () => undefined
  }

  const _: string | undefined
}
