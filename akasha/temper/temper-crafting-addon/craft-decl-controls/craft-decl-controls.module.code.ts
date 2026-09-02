export {}

declare global {
  const TemperCrafting_CharacterPanelBoxScrollChild: Control

  const TemperCrafting_CharacterPanel: Control

  const TemperCrafting_PanelButtonCharacters: ButtonControl

  const TemperCrafting_CharacterFrame1: Control | undefined

  const TemperCrafting_ButtonFrame: Control

  const TemperCrafting_ButtonFrameButtonBG: TopLevelWindow

  const TemperCrafting_Quest: TopLevelWindow

  const TemperCrafting_Panel: TopLevelWindow

  const TemperCrafting_PanelButtonCraftedSets: ButtonControl

  const TemperCrafting_SetPanel: Control

  const TemperCrafting_SetPanelScrollChild: Control

  const TemperCrafting_Style: Control

  type CsResearchRef = [number, number, number, unknown]

  interface CsComboBoxControl extends Control {
    dropdown: CsComboBox
    name: unknown
  }

  const TemperCrafting_Panel12Hours: LabelControl

  const TemperCrafting_Panel24Hours: LabelControl

  const TemperCrafting_PanelFenceGoldText: LabelControl

  const TemperCrafting_PanelQuestButton: Control

  const TemperCrafting_ButtonFrameButton: Control

  const TemperCrafting_CharacterPanelHeader: LabelControl

  const TemperCrafting_StylePreviewType: CsComboBoxControl

  const TemperCrafting_CookSpaceButton: Control

  const TemperCrafting_CookCategoryButtonFavorites: Control

  const TemperCrafting_CookCategoryButtonWrit: Control

  const TemperCrafting_CookCategoryButtonFurniture: Control

  const TemperCrafting_CookCategoryButtonFurnitureFavorites: Control

  const TemperCrafting_CookCategoryButtonFillet: Control

  const TemperCrafting_BlueprintCategoryButton1: Control

  const TemperCrafting_BlueprintCategoryButton2: Control

  const TemperCrafting_BlueprintCategoryButton3: Control

  const TemperCrafting_BlueprintCategoryButton4: Control

  const TemperCrafting_BlueprintCategoryButton5: Control

  const TemperCrafting_BlueprintCategoryButton6: Control

  const TemperCrafting_BlueprintCategoryButton7: Control

  const TemperCrafting_RuneMenu: Control

  const TemperCrafting_RuneArmorButton: Control

  const TemperCrafting_RuneWeaponButton: Control

  const TemperCrafting_RuneJewelryButton: Control

  const TemperCrafting_RuneSpaceButton: Control

  const TemperCrafting_RuneCreateButton: Control

  const TemperCrafting_RuneRefineButton: Control

  const TemperCrafting_RuneFavoriteButton: Control

  const TemperCrafting_RuneWritButton: Control

  const TemperCrafting_RuneFurnitureButton: Control

  const TemperCrafting_RuneFavoriteFurnitureButton: Control

  const TemperCrafting_RuneRefineAllButton: Control

  const TemperCrafting_RuneHandmadeButton: Control

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

  const TemperCrafting_RuneLevelButton: ButtonControl

  const TemperCrafting_RuneGlyphSectionScrollChild: Control

  const TemperCrafting_RuneGlyphSectionScrollChildRefine: Control

  const TemperCrafting_RuneGlyphSectionScrollChildSelection: Control

  const TemperCrafting_RuneGlyphDivider: BackdropControl

  const TemperCrafting_RuneCloseButton: ButtonControl

  const TemperCrafting_RuneSpaceButtonName: LabelControl

  const TemperCrafting_RuneHighlight1: TextureControl

  const TemperCrafting_RuneHighlight2: TextureControl

  const TemperCrafting_QuestFrame: Control & {
    CreateControl: (name: string, controlType: CtControl) => InspirationContainer
  }

  const TemperCrafting_Alarm: {
    AddMessage: (text: string, r: number, g: number, b: number, a: number) => undefined
  }

  const TemperCrafting_Recipe_Window: TopLevelWindow

  const TemperCrafting_Recipe: BackdropControl

  const TemperCrafting_RecipePanelScrollChild: Control

  const TemperCrafting_RecipeHeadline: LabelControl

  const TemperCrafting_RecipeInfo: LabelControl

  const TemperCrafting_RecipeSearch: EditControl

  const TemperCrafting_RecipeHideKnownButton: ButtonControl

  const TemperCrafting_RecipeHideUnknownButton: ButtonControl

  const TemperCrafting_Cook: TopLevelWindow

  const TemperCrafting_CookFoodSectionScrollChild: Control

  const TemperCrafting_CookHeadline: LabelControl

  const TemperCrafting_CookInfo: LabelControl

  const TemperCrafting_CookAmount: EditControl

  const TemperCrafting_CookSearch: EditControl

  const TemperCrafting_RuneAmount: EditControl

  const TemperCrafting_Style_Window: TopLevelWindow

  const TemperCrafting_StylePanelScrollChildStyles: Control

  const TemperCrafting_StylePanelScrollChildSets: Control

  const TemperCrafting_StyleHeader: LabelControl

  const TemperCrafting_StyleHideButton: ButtonControl

  const TemperCrafting_StyleHideCrownButton: ButtonControl

  const TemperCrafting_StyleHidePerfectedButton: ButtonControl

  const TemperCrafting_StyleHideUnknownButton: ButtonControl

  const TemperCrafting_Blueprint_Window: TopLevelWindow

  const TemperCrafting_Blueprint: BackdropControl

  const TemperCrafting_BlueprintPanelScrollChild: Control

  const TemperCrafting_BlueprintHeadline: LabelControl

  const TemperCrafting_BlueprintInfo: LabelControl

  const TemperCrafting_BlueprintSearch: EditControl

  const TemperCrafting_BlueprintHideKnownButton: ButtonControl

  const TemperCrafting_BlueprintHideUnknownButton: ButtonControl

  interface ObjectPool<T> {
    ReleaseObject: (key: number) => undefined
  }

  interface SceneManager {
    HideTopLevel: (topLevelWindow: Control) => undefined
  }

  interface Control {
    data?: TemperCraftingControlData
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
