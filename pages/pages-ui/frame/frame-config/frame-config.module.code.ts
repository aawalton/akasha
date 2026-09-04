import type { FrameConfig } from "@akasha/pages-core/schema/detail-config"

export type FrameLoadScroll = NonNullable<NonNullable<FrameConfig["autoScroll"]>["loadScroll"]>

export function frameIsEdgeToEdge(config: FrameConfig | undefined): boolean {
  return config?.edgeToEdge === true
}

export function frameSupportsFocusMode(config: FrameConfig | undefined): boolean {
  return config?.focusMode === true
}

export function frameLoadScroll(config: FrameConfig | undefined): FrameLoadScroll | undefined {
  return config?.autoScroll?.loadScroll
}

export type FrameFollowMode = "bottom" | "top"

export function frameFollowMode(config: FrameConfig | undefined): FrameFollowMode | null {
  const loadScroll = frameLoadScroll(config)
  if (loadScroll === "end") return "bottom"
  if (loadScroll === "new-top") return "top"
  return null
}

export function frameEnablesFollow(config: FrameConfig | undefined): boolean {
  return frameFollowMode(config) !== null
}
