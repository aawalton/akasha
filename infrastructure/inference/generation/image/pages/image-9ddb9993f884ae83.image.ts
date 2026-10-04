import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ddb9993f884ae83 = {
  id: "01a10653-79b0-7e72-b06e-cd3101a3a1d4",
  type: "page-type/image",
  slug: "image-9ddb9993f884ae83",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-bfcce933d8b9acf1",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the attic room, sitting on the edge of the narrow bed. The pink-haired woman from the second image sits on the edge of the bed with a small worn brown leather satchel open on her lap, carefully tucking a folded letter flat against a small blue notebook inside it, a tin of salve and two rolls of bandage beside her on the quilt, her lips moving as she names each thing, a calm, steadying, tender expression, eyes on the satchel. A small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; she wears a cropped cream halter top laced up the front, a short sage-green skirt, a brown belt with pouches, fingerless leather gloves and tall brown boots. Soft morning light from the round window. Medium shot from slightly above, 50mm lens, face and hands clear, shallow depth of field.",
} as const satisfies Image
