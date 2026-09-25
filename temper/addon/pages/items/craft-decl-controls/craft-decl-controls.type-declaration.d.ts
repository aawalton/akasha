declare const TemperItemsCrafting_CharacterPanelBoxScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_CharacterPanel: TemperItemsCraftingControl

declare const TemperItemsCrafting_PanelButtonCharacters: TemperItemsCraftingButton

declare const TemperItemsCrafting_CharacterFrame1: TemperItemsCraftingControl | undefined

declare const TemperItemsCrafting_ButtonFrame: TemperItemsCraftingControl

declare const TemperItemsCrafting_ButtonFrameButtonBG: TopLevelWindow

declare const TemperItemsCrafting_Quest: TopLevelWindow

declare const TemperItemsCrafting_Panel: TopLevelWindow

declare const TemperItemsCrafting_PanelButtonCraftedSets: TemperItemsCraftingButton

declare const TemperItemsCrafting_SetPanel: TemperItemsCraftingControl

declare const TemperItemsCrafting_SetPanelScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_Style: TemperItemsCraftingControl

type CsResearchRef = [number, number, number, unknown]

interface CsComboBoxControl extends Control {
  dropdown: CsComboBox
  name: unknown
}

declare const TemperItemsCrafting_Panel12Hours: LabelControl

declare const TemperItemsCrafting_Panel24Hours: LabelControl

declare const TemperItemsCrafting_PanelFenceGoldText: TemperItemsCraftingLabel

declare const TemperItemsCrafting_PanelQuestButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_ButtonFrameButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_CharacterPanelHeader: LabelControl

declare const TemperItemsCrafting_StylePreviewType: CsComboBoxControl

declare const TemperItemsCrafting_CookSpaceButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookCategoryButtonFavorites: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookCategoryButtonWrit: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookCategoryButtonFurniture: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookCategoryButtonFurnitureFavorites: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookCategoryButtonFillet: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton1: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton2: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton3: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton4: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton5: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton6: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintCategoryButton7: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneMenu: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneArmorButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneWeaponButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneJewelryButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneSpaceButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneCreateButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneRefineButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneFavoriteButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneWritButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneFurnitureButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneFavoriteFurnitureButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneRefineAllButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneHandmadeButton: TemperItemsCraftingControl

declare const TemperItemsCrafting_QuestText: LabelControl

declare const TemperItemsCrafting_DolgubonsWritsEndpoint: LabelControl | undefined

declare const TemperItemsCrafting_CookSpaceButtonName: LabelControl

declare var TemperItemsCraftingDebugState: unknown

declare const TemperItemsCrafting_Rune: TopLevelWindow

declare const TemperItemsCrafting_RuneHeader: BackdropControl

declare const TemperItemsCrafting_RuneInfo: LabelControl

declare const TemperItemsCrafting_RuneAmountLabel: LabelControl

declare const TemperItemsCrafting_RuneSearch: EditControl

declare const TemperItemsCrafting_RuneSearchBG: BackdropControl

declare const TemperItemsCrafting_RuneLevelButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_RuneGlyphSectionScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneGlyphSectionScrollChildRefine: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneGlyphSectionScrollChildSelection: TemperItemsCraftingControl

declare const TemperItemsCrafting_RuneGlyphDivider: BackdropControl

declare const TemperItemsCrafting_RuneCloseButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_RuneSpaceButtonName: LabelControl

declare const TemperItemsCrafting_RuneHighlight1: TextureControl

declare const TemperItemsCrafting_RuneHighlight2: TextureControl

declare const TemperItemsCrafting_QuestFrame: TemperItemsCraftingControl & {
  CreateControl: <T extends Control = InspirationContainer>(name: string, controlType: number) => T
}

declare const TemperItemsCrafting_Alarm: {
  AddMessage: (text: string, r: number, g: number, b: number, a: number) => undefined
}

declare const TemperItemsCrafting_Recipe_Window: TopLevelWindow

declare const TemperItemsCrafting_Recipe: Control

declare const TemperItemsCrafting_RecipePanelScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_RecipeHeadline: LabelControl

declare const TemperItemsCrafting_RecipeInfo: LabelControl

declare const TemperItemsCrafting_RecipeSearch: EditControl

declare const TemperItemsCrafting_RecipeHideKnownButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_RecipeHideUnknownButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_Cook: TopLevelWindow

declare const TemperItemsCrafting_CookFoodSectionScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_CookHeadline: LabelControl

declare const TemperItemsCrafting_CookInfo: LabelControl

declare const TemperItemsCrafting_CookAmount: EditControl

declare const TemperItemsCrafting_CookSearch: EditControl

declare const TemperItemsCrafting_RuneAmount: EditControl

declare const TemperItemsCrafting_Style_Window: TopLevelWindow

declare const TemperItemsCrafting_StylePanelScrollChildStyles: TemperItemsCraftingControl

declare const TemperItemsCrafting_StylePanelScrollChildSets: TemperItemsCraftingControl

declare const TemperItemsCrafting_StyleHideButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_StyleHideCrownButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_StyleHidePerfectedButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_StyleHideUnknownButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_Blueprint_Window: TopLevelWindow

declare const TemperItemsCrafting_Blueprint: BackdropControl

declare const TemperItemsCrafting_BlueprintPanelScrollChild: TemperItemsCraftingControl

declare const TemperItemsCrafting_BlueprintHeadline: LabelControl

declare const TemperItemsCrafting_BlueprintInfo: LabelControl

declare const TemperItemsCrafting_BlueprintSearch: EditControl

declare const TemperItemsCrafting_BlueprintHideKnownButton: TemperItemsCraftingButton

declare const TemperItemsCrafting_BlueprintHideUnknownButton: TemperItemsCraftingButton

interface TemperItemsCraftingControl extends Control {
  data?: TemperItemsCraftingControlData
  checkState?: number
  tristate?: boolean
}

interface TemperItemsCraftingLabel extends LabelControl {
  data?: TemperItemsCraftingControlData
}

interface TemperItemsCraftingButton extends ButtonControl {
  data?: TemperItemsCraftingControlData
  checkState?: number
  tristate?: boolean
}

interface TemperItemsCraftingControlData {
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

interface CsTooltipCraftField {
  GetText: () => string
}

interface ScaleAnimation extends ZO_Animation {
  SetStartScale: (scale: number) => undefined
  SetEndScale: (scale: number) => undefined
}
