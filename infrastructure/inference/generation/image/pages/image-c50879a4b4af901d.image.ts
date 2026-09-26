import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC50879a4b4af901d = {
  id: "01a0c5f3-7a99-77dd-9ec6-c3176bb3f4ed",
  type: "page-type/image",
  slug: "image-c50879a4b4af901d",
  persona: "persona/shaestrel",
  service: "image-edit-nano-banana",
  operation: "edit",
  model: "gemini-3-pro-image",
  prompt:
    "Change ONLY the forest in the background behind and to the right of the woman. Make it the same deep, dark, dim, moody woodland as the LEFT side of this image — dark green-shadowed trees receding into soft shadow and bokeh, no bright or pale tree trunks, no lighter opening behind her. The forest background must read as ONE single continuous dark woodland spanning the full width from the left edge to the right edge, with no seam and no visible boundary between the left and right halves. Keep the woman EXACTLY as she is — same face, same luminous green eyes and near-direct gaze, same green hair, leaf crown, pointed fae ears, leaf bodice, bare shoulders, pose, and the same soft cool light on her skin. Keep the great old mossy tree trunk and the dark forest on the LEFT exactly as they already are. Keep the same filmic look, grain, and shallow depth of field across the whole frame.",
  inputImage: "image/image-63595d8ef2ae169e",
  referenceImages: ["image/image-53539502b9dffc84"],
} as const satisfies Image
