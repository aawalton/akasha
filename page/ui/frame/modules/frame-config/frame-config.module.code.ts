import type { FrameConfig } from "akasha/page/core/schema/modules/detail-config/detail-config.module.code.ts"

type FrameLoadScroll = NonNullable<NonNullable<FrameConfig["autoScroll"]>["loadScroll"]>

export function frameSupportsFocusMode(config: FrameConfig | undefined): boolean {
  return config?.focusMode === true
}

function frameLoadScroll(config: FrameConfig | undefined): FrameLoadScroll | undefined {
  return config?.autoScroll?.loadScroll
}

export type FrameFollowMode = "bottom" | "top"

export function frameFollowMode(config: FrameConfig | undefined): FrameFollowMode | null {
  const loadScroll = frameLoadScroll(config)
  if (loadScroll === "end") return "bottom"
  if (loadScroll === "new-top") return "top"
  return null
}
