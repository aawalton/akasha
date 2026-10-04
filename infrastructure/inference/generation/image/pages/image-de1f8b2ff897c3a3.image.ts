import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDe1f8b2ff897c3a3 = {
  id: "01a106b8-da23-79bc-b85d-8c67e203e119",
  type: "page-type/image",
  slug: "image-de1f8b2ff897c3a3",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1a035334afa7d475",
  referenceImages: ["image/image-d34454b4584b976c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the place from the first image, the timber guild hall, at its quest board covered in pinned paper notices with only illegible scribbles. The copper-haired woman from the second image taps one notice with a wrapped knuckle, grinning a crooked, eager grin, already leaning toward adventure, a great axe slung on her back. Beside her the small blonde woman from the third image has gone white as paper, the soot on her cheek standing out, staring at the notice with frightened eyes, her fingers moving nervously over the corks of the vials on her belt, counting them. The second image's woman, with her exact face: a gorgeous slim young Korean woman of twenty-one with a K-pop idol's pretty face, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, dark trousers, neat cloth knuckle wraps. The third image's woman, with her exact face: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, very pale fair skin with a smudge of soot on one cheek, blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron stained with burn marks, a belt of corked glass vials. Only these two women in the frame. Warm mid-afternoon light from high windows. Medium shot, 50mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
