import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image326c26c00ac2a178 = {
  id: "01a102d1-b780-776c-9a78-63639ecb92b1",
  type: "page-type/image",
  slug: "image-326c26c00ac2a178",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-dad85fbf3d319232",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, warm and bright. She has fair smooth skin, a long oval face with high cheekbones, cool grey eyes, straight dark brows, a straight nose, full lips pressed into a composed unsmiling line, and glossy black hair pulled back into a severe low bun at the nape, not one strand loose. She is tall, slim and willowy with narrow shoulders. She wears a fitted charcoal-grey wool guild coat buttoned all the way to the throat, a small silver pin at the collar shaped like an open hand over a cut thread, slim dark trousers and polished black knee boots, and carries a black leather ledger tucked under one arm. She is walking straight toward the camera across the wide plank floor of a great timber guild hall, mid-stride, back very straight, chin level, her cool grey eyes fixed steadily on the viewer, wary and assessing. Behind her a plain door painted charcoal grey stands open, and to either side adventurers' wooden tables and benches, round paper lanterns hanging from dark oak beams and a long wall of chalk slates, softly blurred, warm late-morning daylight slanting in from high windows. Framed from the top of her head to mid-thigh, 85mm lens, shallow depth of field, the background soft.",
} as const satisfies Image
