export {}

declare global {
  interface TemperPotionsTitledWindow extends TopLevelWindow {
    title: LabelControl
  }

  const TemperPotions: TemperPotionsTitledWindow

  const TemperPotionsOutput: TemperPotionsTitledWindow

  const TemperPotionsTopLevel: TopLevelWindow

  const TemperPotionsTooltip: TooltipControl

  const TemperPotionsQuestWrits: TemperCraftingControl

  const TemperPotionsAllMustCheckBox: TemperCraftingControl

  const TemperPotionsAllMustNotCheckBox: TemperCraftingControl

  const TemperPotionsAllMustNotCheckBoxText: LabelControl

  const TemperPotionsOnly2: TemperCraftingControl

  const TemperPotionsOnly2Text: LabelControl

  const TemperPotionsOnlyReagent: TemperCraftingControl

  const TemperPotionsOnlyReagentText: LabelControl

  const TemperPotionsLoading: TemperCraftingControl

  const TemperPotionsClearFilter: TemperCraftingControl

  const TemperPotionsFavorites: TemperCraftingControl

  const TemperPotionsLabel: LabelControl

  const TemperPotionsOutputCombinationLabel: LabelControl

  const TemperPotionsOutputFavorite: TemperCraftingControl

  const TemperPotionsOutputNextButton: TemperCraftingButton

  const TemperPotionsOutputPageLabel: LabelControl

  const TemperPotionsOutputPreviousButton: TemperCraftingButton

  const TemperPotionsOutputResultsBG: TemperCraftingControl

  const TemperPotionsOutputSearchButton: TemperCraftingButton

  const TemperPotionsOutputTraitLabel: LabelControl

  const TemperPotionsReagentBG: TemperCraftingControl

  const TemperPotionsReagentLabel: LabelControl

  const TemperPotionsSearchBG: TemperCraftingControl

  const TemperPotionsSearchButton: TemperCraftingButton

  const TemperPotionsSolventLabel: LabelControl

  const TemperPotionsTraitLabel1: LabelControl

  const TemperPotionsTraitLabel2: LabelControl

  const TemperPotionsBagButtonTexture: TextureControl

  const TemperPotionsBankButtonTexture: TextureControl

  interface Control {
    SetSimpleAnchorParent: (...args: unknown[]) => undefined
    EnableMouseButton: (button: number, enabled: boolean) => undefined
  }

  interface TooltipControl {
    AddHeaderLine: (...args: unknown[]) => undefined
  }

  interface TemperPotionsTitledWindow {
    title: LabelControl
  }
}
