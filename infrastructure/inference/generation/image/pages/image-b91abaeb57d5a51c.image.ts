import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageB91abaeb57d5a51c = {
  id: "01a106d4-f4fd-7bbe-94c0-110faa61c025",
  type: "page-type/image",
  slug: "image-b91abaeb57d5a51c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Move the scene outside the timber guild hall of the first image to the top of its worn stone front steps at dusk, looking down across an emptied cobbled square to a canal at its foot. Keep the woman's face exactly as in the second image. The pink-haired woman from the second image sits on a step in the foreground, seen in three-quarter view from behind and the side, hugging her knees, gazing down at the canal with a soft wondering smile, the glow on her face. On the canal below, small low wooden boats glide up the water, each with two women, one rowing and one standing with a long pole, touching it to round paper lanterns strung along the canal; the lanterns already touched glow amber, rose and gold one after another along the water toward a stone bridge, their reflections trembling on the dark canal. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves, tall boots. Blue dusk sky with the last rose light, warm lantern glow. Wide shot, 35mm lens, her face and the lit canal both visible, deep depth of field.",
} as const satisfies Image
