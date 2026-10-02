import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6f4617409fad911e = {
  id: "01a0fec2-c661-7400-a1a1-390908765c58",
  type: "page-type/image",
  slug: "image-6f4617409fad911e",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd81109ae3a3a752",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, slight young woman of twenty with very pale skin, cool grey-green eyes, fine dark brows, sharp cheekbones, a pointed chin and a small serious mouth, her glossy black hair cut in a blunt chin-length bob with a straight heavy fringe, brushed perfectly straight. She wears a big soft cream cable-knit wool jumper far too large for her, the sleeves turned back twice at the wrists, the hem hanging nearly to her knees, over her own long slim black wool skirt reaching her ankles, black flat shoes, and a silver ring on one hand. She stands just outside an old wooden bedroom door, standing very upright, chin lifted, arms straight at her sides, her face perfectly composed and cool, looking straight into the camera with a level, faintly defiant gaze. Behind her is the top corridor of an old stone college house: worn floorboards, a plain plaster wall, the dark oak door half open behind her. Bright cold clean morning sunlight after a storm falls through a corridor window from the side. Full-length portrait, 50mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
