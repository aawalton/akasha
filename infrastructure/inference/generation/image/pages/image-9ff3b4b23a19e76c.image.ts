import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9ff3b4b23a19e76c = {
  id: "01a1068d-8bbb-7aa4-a008-c9b4d97ce8d2",
  type: "page-type/image",
  slug: "image-9ff3b4b23a19e76c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-18b50fdd9b3aa1db", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic. Keep the place from the first image: this moment is in the Leftovers corner at the bottom of the party board, where chalked slates hang. The first woman is the woman from the second image, a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head, wearing a cream blouse with rolled sleeves under a too-big scorched brown leather apron, a belt of corked glass vials. The second woman is the woman from the third image, a gorgeous, slim, athletic young Korean woman of twenty-one with a K-pop idol's pretty face: a small V-line face, almond-shaped eyes of bright green, a small nose, full lips in a crooked teasing grin, warm sun-kissed golden skin dusted with light freckles across her nose and cheeks, and a wild mass of long copper-red curls, barely tied back, wearing a sleeveless battered brown leather jerkin, cloth knuckle wraps, dark trousers and scuffed boots, one forearm bandaged white from wrist to elbow. The first woman stands very straight with a fizz bottle clutched in both hands. The second woman has gone quite still, staring past her at three blurred adventurers in copper-studded jerkins by the slates. Morning sunlight slanting through the high windows in warm shafts. Exactly two women in frame, no other faces in focus, nothing lettered. Medium shot, 35mm lens, shallow depth of field, every face sharp and readable.",
} as const satisfies Image
