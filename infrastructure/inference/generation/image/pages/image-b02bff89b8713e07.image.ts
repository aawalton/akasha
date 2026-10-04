import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB02bff89b8713e07 = {
  id: "01a10660-f433-7a9d-bf8f-8729bd4d820b",
  type: "page-type/image",
  slug: "image-b02bff89b8713e07",
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
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, inside the Hall of Naming under the glass dome. Exactly two people. Far back in the silver circle on the floor stands one adult East Asian woman with a long dark plait in a plain blue dress, both hands over her face, crying happy tears, a small glowing pane of soft green light floating above her with a leaf glyph. In the near foreground, seen from the side, the one pink-haired woman from the second image sits alone on a wooden bench, clapping hard with her gloved hands raised, beaming with joy, eyes bright and wet, looking toward the circle. She has a small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, a short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall brown boots. Pale morning light from the dome. 35mm lens, her face in three-quarter view, nothing lettered.",
} as const satisfies Image
