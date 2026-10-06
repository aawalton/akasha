import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2d64d9cbc1e054d0 = {
  id: "01a11373-ed2b-78a7-9641-49c48ee435df",
  type: "page-type/image",
  slug: "image-2d64d9cbc1e054d0",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d34454b4584b976c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back. On top of her copper curls sits a crown of fresh green birch leaves bound on a willow hoop, with long red ribbons trailing down behind. She wears a sleeveless battered brown leather jerkin, her freckled arms bare from the shoulder, a wide belt, dark trousers and scuffed boots, and a big double-bitted axe slung across her back in a leather sling. She stands in front of a fair stall hung with birch crowns, her face and neck flushed bright red under her freckles, one hand raised halfway toward the crown and stopped in the air, looking down and to one side, embarrassed and pleased. Behind her, a sunny waterfront fair with striped awnings and ribbons strung between lamp posts, the blue lake beyond. Bright summer morning sun. Medium shot from the waist up, 85mm lens, shallow depth of field.",
} as const satisfies Image
