import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80b338a6cbea47be = {
  id: "01a106e9-4663-7b3e-ab6c-d93edc811a90",
  type: "page-type/image",
  slug: "image-80b338a6cbea47be",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-fba84451f24bca40", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic, candid photograph, nobody looks at the camera. Keep the place from the first image: this moment is inside the Tipsy Heron, a loud cheap adventurers' tavern by the canal, at a scrubbed wooden table. The black-haired woman from the second image sits at the end of the table eating stew in small neat spoonfuls, her mouth moving very slightly at one corner. The copper-haired woman from the third image stares at her, then grins. The black-haired woman from the second image is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose, with a slim build and small chest, wearing a long charcoal-grey guild coat buttoned to the throat, slim dark trousers and black boots. The copper-haired woman from the third image is a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, with a slim build and small chest, wearing a sleeveless battered brown leather jerkin, cloth knuckle wraps, dark trousers and scuffed boots, one forearm bandaged white from wrist to elbow. Noon, warm lamplight and daylight in a crowded tavern. Nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
