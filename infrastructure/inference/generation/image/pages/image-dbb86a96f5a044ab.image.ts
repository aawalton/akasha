import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDbb86a96f5a044ab = {
  id: "01a10687-1183-7559-9a69-0355c8f6144b",
  type: "page-type/image",
  slug: "image-dbb86a96f5a044ab",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-fba84451f24bca40", "image/image-e6523dfa77c4852c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic. Keep the place from the first image: this moment is upstairs in the guildmaster's office, a plain room with a big window over the square, a desk heaped with papers, and a long sword in a plain worn scabbard on two pegs on the wall. The first woman is the woman from the second image, a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose, wearing a long charcoal-grey guild coat buttoned to the throat, slim dark trousers and black boots. The second woman is the woman from the third image, a gorgeous, slim young Korean woman of about twenty with a K-pop idol's face: a small V-line face, big sparkling doe eyes in soft rose pink the same color as her hair, a small delicate nose, glossy pink lips, pale porcelain skin with a soft blush, a sweet bright smile, and short soft rose-pink hair in a layered bob with wispy side-swept bangs, a small pink-and-white flower clip above one ear, wearing a cropped cream halter top laced up the front, a short sage-green skirt, a brown leather belt with pouches, brown fingerless gloves and tall brown boots. The first woman holds a black ledger open on her palm and writes in it with a pen, small and steady, eyes on the page. The second woman stands beside her. Morning daylight from a big window over the square. Exactly two women in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
