import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD300a78277614c20 = {
  id: "01a1076f-3800-73cc-8462-453560e90de6",
  type: "page-type/image",
  slug: "image-d300a78277614c20",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fba84451f24bca40",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose. She wears a long charcoal-grey guild coat buttoned to the throat, slim dark trousers and black boots, a black leather ledger under her arm. She stands just outside a charcoal-painted door in a guild hall, upright and composed, her head inclined slightly, her cool grey eyes lowered to the ledger as she opens it in her hands. Behind her the long hall with its quest board and wooden tables, lamps lit along the beams, the morning only beginning. Warm lamplight and early morning light from the high windows. Nothing lettered. Medium shot, 50mm lens, shallow depth of field, her face sharp.",
} as const satisfies Image
