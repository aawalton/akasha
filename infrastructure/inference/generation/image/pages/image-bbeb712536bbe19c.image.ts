import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageBbeb712536bbe19c = {
  id: "01a103c5-6f28-7b18-bdb5-eaefa2cf4c3c",
  type: "page-type/image",
  slug: "image-bbeb712536bbe19c",
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
    "Keep this exact woman: same face, same cool grey eyes, same straight dark brows, same severe black bun, same pale porcelain skin. Change the scene around her. Fantasy photorealistic. She is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose. She wears a fitted charcoal-grey guild coat buttoned all the way to the throat, with a small silver pin at the collar shaped like an open hand over a cut thread, slim dark trousers and polished black boots, and holds a slim black leather ledger closed against her side. She stands very straight in an open doorway, chin level, eyes fixed on the viewer, unblinking, mouth flat, utterly composed. Behind her a guild hall of heavy timber beams and paper lanterns, a crowded notice board on the far wall, warm midday light coming from the hall behind her shoulder and laying a soft bright edge along her jaw. Camera: framed from the top of her head to mid-thigh, close vertical portrait, 85mm lens, shallow depth of field, fine skin texture, gentle film grain.",
} as const satisfies Image
