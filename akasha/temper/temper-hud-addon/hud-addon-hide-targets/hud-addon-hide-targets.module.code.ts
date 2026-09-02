export interface CompassHideTarget {
  SetCompassHidden: (hidden: boolean) => void
}

export interface TopLevelHideTarget {
  SetTopLevelHidden: (hidden: boolean) => void
}

export interface RequestHideTarget {
  RequestHidden: (hidden: boolean) => void
}

export interface SupressHideTarget {
  SetSupressed: (suppressed: boolean, reason: string) => void
}

export interface TutorialSuppressTarget {
  SuppressTutorialType: (tutorialType: number, suppressed: boolean, reason: number) => void
}
