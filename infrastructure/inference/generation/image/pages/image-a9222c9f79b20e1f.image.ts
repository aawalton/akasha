import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA9222c9f79b20e1f = {
  id: "01a0fd18-01f7-7098-8651-e4aaf49a34ef",
  type: "page-type/image",
  slug: "image-a9222c9f79b20e1f",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall slim long-limbed woman of twenty-seven with a small chest, fair windburned skin, faint freckles, sea-grey eyes, straight dark brows, a thin pale scar through the end of her left eyebrow, a straight nose, a wide serious mouth, and very dark brown hair in one thick braid lying forward over her right shoulder, loose wisps blowing in the wind. She wears a heavy darned navy fisherman's jumper, dark canvas trousers tucked into tall black rubber sea boots, and a ring of brass keys at her belt. She stands on wet grey shingle at the edge of the sea, leaning forward, her right arm thrust out toward the viewer holding an old brass and glass oil lantern at arm's length, its warm flame glaring. Her brows are pulled together and her mouth is set hard; she looks straight down into the lens, sharp and suspicious, as if demanding an answer. Behind her the steep black rock rises to a white lighthouse whose turning golden beam cuts across a violet dusk sky, and dark sea breaks white on a reef. Warm lantern light on her face from below, cold blue dusk everywhere else. Low angle from someone sitting on the stones, 35mm lens, shallow depth of field, she fills the frame from head to thigh.",
} as const satisfies Image
