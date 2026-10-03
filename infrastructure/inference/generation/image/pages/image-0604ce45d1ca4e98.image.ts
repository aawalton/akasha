import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0604ce45d1ca4e98 = {
  id: "01a102cf-a975-762e-afbf-9f0ff9812d1c",
  type: "page-type/image",
  slug: "image-0604ce45d1ca4e98",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e6523dfa77c4852c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, warm and bright. She is a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear. She wears a cropped cream halter top laced up the front with a cord crossed through little eyelets and tied in a neat bow at the top, a short sage-green skirt, a brown leather belt with pouches buckled at her bare waist, brown fingerless leather gloves and tall soft brown leather boots. She stands facing a small scrap of mirror propped on a wooden washstand, both hands raised to the flower clip above her left ear as she pins it, her head tilted slightly, her eyes on her own reflection, a small pleased smile. Behind her a narrow attic bedroom with a sloped ceiling and a low dark timber beam, a round window over a misty canal at first light, potted plants on the sill, a rumpled patchwork quilt on a small bed. Soft candlelight mixed with pale grey dawn light. Framed from the top of her head to mid-thigh, 50mm lens, shallow depth of field.",
} as const satisfies Image
