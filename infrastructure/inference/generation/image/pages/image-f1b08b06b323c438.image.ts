import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF1b08b06b323c438 = {
  id: "01a0fd19-795b-7ffc-a92c-1c74244a3573",
  type: "page-type/image",
  slug: "image-f1b08b06b323c438",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f35c3e4a9e5d6eab",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall slim long-limbed woman of twenty-seven with a small chest, fair windburned skin, faint freckles, sea-grey eyes, straight dark brows, a thin pale scar through the end of her left eyebrow, a straight nose, a wide serious mouth, and very dark brown hair in one thick braid hanging over her right shoulder. Her jumper is gone; she wears a plain worn off-white linen shirt with the sleeves rolled to the elbow, dark canvas trousers, tall black rubber sea boots and a ring of brass keys at her belt. She crouches on the hearthstones of a stone fireplace, side-on to the camera, feeding a pale twisted piece of driftwood into a fire that roars up high, her other hand on her knee, her face intent and unsmiling, eyes on the flames. Over the fire a black iron kettle and a black cooking pot hang from hooks. Around her the inside of a one-room granite keeper's cottage: rough stone walls, a single wooden chair by the hearth, a row of brass on the mantel, coils of rope, pots, a ladder to a loft in the shadows. Night outside a small deep window. Strong warm orange firelight on her face and shirt, deep shadow behind. Medium shot at hearth level, 35mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
