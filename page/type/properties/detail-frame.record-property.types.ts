import type { FrameAutoScroll } from "akasha/page/type/properties/frame-auto-scroll.record-property.types.ts"
import type { FrameEdgeToEdge } from "akasha/page/type/properties/frame-edge-to-edge.boolean-property.types.ts"
import type { FrameFocusMode } from "akasha/page/type/properties/frame-focus-mode.boolean-property.types.ts"

export type DetailFrame = {
  edgeToEdge?: FrameEdgeToEdge
  focusMode?: FrameFocusMode
  autoScroll?: FrameAutoScroll
}
