import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image64e021cf0c9527b1 = {
  id: "01a10249-e900-7fdd-9abd-53270f74c3f6",
  type: "page-type/image",
  slug: "image-64e021cf0c9527b1",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-5e76d8980617353d",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. A wry, gorgeous young woman of twenty-four with very fair skin, sea-green eyes, sandy brows, a dusting of freckles across her nose and cheeks, her chin-length tousled strawberry-blonde hair messy and loose. She is slim and wiry like a swimmer. She wears a grey hoodie and black running tights, and over her shoulders, worn like a long cloak and clutched together at her chest with one fist, a crumpled white cotton double bedsheet daubed all over with thick sweeping strokes of bright green house paint, abstract swirls and splashes with no letters or words. She sits on a worn wooden bench by an old jukebox in a crowded country pub, her head tipped back, eyes shut, mouth wide open, singing her heart out, her other hand lifted with a half-pint glass of cider. Behind her, softly blurred, low dark oak beams, a roaring stone fireplace, windows running with steam, and a packed room of laughing young women in green scarves. Evening, warm amber firelight and low lamp light on her face, flushed cheeks. Close framing from the top of her head to her waist, 85mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
