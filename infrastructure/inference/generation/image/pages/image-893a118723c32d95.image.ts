import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image893a118723c32d95 = {
  id: "01a10667-0e70-7fa3-9a8c-805a78b3d273",
  type: "page-type/image",
  slug: "image-893a118723c32d95",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-80f9dc44ffe50a7a",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph. Keep the place from the first image, inside the Hall of Naming under the glass dome. The pink-haired woman from the second image stands very still alone in the silver circle in the middle of the marble floor, small in the frame, a faint violet glow above her, her arms at her sides, shoulders tight, eyes wide. All around the curved walls the benches are full of East Asian young adults and their mothers, every face turned toward her in shocked silence, a hand at a mouth, a grey-robed priestess beside the circle with her paper roll half lowered and her mouth open. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Cold still light from the dome, tense hush. Wide shot from behind the benches looking past the staring heads toward her, 35mm lens, her face readable, nothing lettered.",
} as const satisfies Image
