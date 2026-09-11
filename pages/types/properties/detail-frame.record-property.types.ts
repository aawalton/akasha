import type { FrameAutoScroll } from "akasha/pages/types/properties/frame-auto-scroll.record-property.types.ts"
import type { FrameEdgeToEdge } from "akasha/pages/types/properties/frame-edge-to-edge.boolean-property.types.ts"
import type { FrameFocusMode } from "akasha/pages/types/properties/frame-focus-mode.boolean-property.types.ts"

export type DetailFrame = {
  edgeToEdge?: FrameEdgeToEdge
  focusMode?: FrameFocusMode
  autoScroll?: FrameAutoScroll
}
