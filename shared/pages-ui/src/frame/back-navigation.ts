export interface BackNavigationInput {
  readonly canGoBack: boolean
}

export function decideBackNavigation({ canGoBack }: BackNavigationInput): "back" | "home" {
  return canGoBack ? "back" : "home"
}
