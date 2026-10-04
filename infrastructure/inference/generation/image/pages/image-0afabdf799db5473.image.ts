import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image0afabdf799db5473 = {
  id: "01a106d5-a7be-7537-95a4-c3cf93058db4",
  type: "page-type/image",
  slug: "image-0afabdf799db5473",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-fba84451f24bca40"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is in Tanner's Row, a long narrow crooked lane behind the tanneries, its tall old houses leaning together overhead with washing strung between them. The black-haired woman from the second image stands in the middle of the lane with a black ledger open on her palm, her pen stopped in the air above the page, looking up at the roofs, quite still and thoughtful. The black-haired woman from the second image is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose, with a slim build and small chest, wearing a long charcoal-grey guild coat buttoned to the throat, slim dark trousers and black boots. Late summer morning, bright sun high on the roofs, warm shade below. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
