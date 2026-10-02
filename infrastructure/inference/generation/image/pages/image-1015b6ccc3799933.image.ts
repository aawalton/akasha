import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1015b6ccc3799933 = {
  id: "01a0fd1c-ac2b-732f-ae58-98a0c2ba6b2e",
  type: "page-type/image",
  slug: "image-1015b6ccc3799933",
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
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall slim long-limbed woman of twenty-seven with a small chest, fair windburned skin, faint freckles, sea-grey eyes, straight dark brows, a thin pale scar through the end of her left eyebrow, a straight nose, a wide serious mouth, and very dark brown hair in one thick braid hanging over her right shoulder. She wears a plain worn off-white linen shirt with the sleeves rolled to the elbow, dark canvas trousers, tall black rubber sea boots and a ring of brass keys at her belt. She stands inside the cramped lantern room at the top of a lighthouse at night, both hands gripping the iron crank handle of a big brass clockwork drum, turning it. Her head is tilted up toward the huge glowing glass lens beside her, and she is speaking softly to it, lips slightly parted, her face quiet, unguarded and a little lost, brows drawn faintly together, the way someone confides in a friend. The great faceted brass and glass Fresnel lens fills one side of the frame, blazing warm gold from the oil flame at its heart, its light spilling over her face. Brass gears, chains and weights around her, curved storm panes behind showing the black night sea. A brass oil lantern sits on the iron floor. Warm gold light, deep shadows. Medium shot, 35mm lens, shallow depth of field, she fills the frame from head to thigh.",
} as const satisfies Image
