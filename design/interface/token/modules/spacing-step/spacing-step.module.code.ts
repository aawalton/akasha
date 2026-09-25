export type SpacingToken = "1" | "1.5" | "2" | "3" | "4" | "6"

interface SpacingStep {
  token: SpacingToken
  px: number
  usage: string
}

export const SPACING_STEPS: readonly SpacingStep[] = [
  { token: "1", px: 4, usage: "Minimal - chip lists" },
  { token: "1.5", px: 6, usage: "Icon-label pairs" },
  { token: "2", px: 8, usage: "Tight - headers, badges" },
  { token: "3", px: 12, usage: "Component - cards, forms" },
  { token: "4", px: 16, usage: "Medium - panel contents" },
  { token: "6", px: 24, usage: "Major - sections, columns" },
]
