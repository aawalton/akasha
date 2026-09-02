export {}

declare global {
  interface TemperPotionsTitledWindow extends TopLevelWindow {
    title: LabelControl
  }

  const TemperPotions: TemperPotionsTitledWindow

  const TemperPotionsOutput: TemperPotionsTitledWindow

  const TemperPotionsTopLevel: TopLevelWindow

  const TemperPotionsTooltip: TooltipControl

  const TemperPotionsQuestWrits: Control

  const TemperPotionsAllMustCheckBox: Control

  const TemperPotionsAllMustNotCheckBox: Control

  const TemperPotionsAllMustNotCheckBoxText: LabelControl

  const TemperPotionsOnly2: Control

  const TemperPotionsOnly2Text: LabelControl

  const TemperPotionsOnlyReagent: Control

  const TemperPotionsOnlyReagentText: LabelControl

  const TemperPotionsLoading: Control

  const TemperPotionsClearFilter: Control

  const TemperPotionsFavorites: Control

  const TemperPotionsLabel: LabelControl

  const TemperPotionsOutputCombinationLabel: LabelControl

  const TemperPotionsOutputFavorite: Control

  const TemperPotionsOutputNextButton: ButtonControl

  const TemperPotionsOutputPageLabel: LabelControl

  const TemperPotionsOutputPreviousButton: ButtonControl

  const TemperPotionsOutputResultsBG: Control

  const TemperPotionsOutputSearchButton: ButtonControl

  const TemperPotionsOutputTraitLabel: LabelControl

  const TemperPotionsReagentBG: Control

  const TemperPotionsReagentLabel: LabelControl

  const TemperPotionsSearchBG: Control

  const TemperPotionsSearchButton: ButtonControl

  const TemperPotionsSolventLabel: LabelControl

  const TemperPotionsTraitLabel1: LabelControl

  const TemperPotionsTraitLabel2: LabelControl

  const TemperPotionsBagButtonTexture: TextureControl

  const TemperPotionsBankButtonTexture: TextureControl

  interface Control {
    SetSimpleAnchorParent: (...args: unknown[]) => undefined
    EnableMouseButton: (button: number, enabled: boolean) => undefined
    checkState?: number
    tristate?: boolean
  }

  interface TooltipControl {
    AddHeaderLine: (...args: unknown[]) => undefined
  }

  interface TemperPotionsTitledWindow {
    title: LabelControl
  }
}
