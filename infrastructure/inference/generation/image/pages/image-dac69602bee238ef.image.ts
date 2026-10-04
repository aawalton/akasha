import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDac69602bee238ef = {
  id: "01a106e6-6c79-76a0-aa89-1d2f5399dd3b",
  type: "page-type/image",
  slug: "image-dac69602bee238ef",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-18b50fdd9b3aa1db", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the look of the canal city from the first image but move the scene inside the Tipsy Heron, a loud, cozy adventurers' tavern by the canal: low dark beams, lantern light, a small corner table with bowls of thick brown stew and heels of bread. Keep both women's faces exactly as in their images. The small blonde woman from the second image sits at the table talking eagerly with her mouth full, waving her spoon in the air, a spot of gravy on her apron, eyes bright and animated. Across from her the copper-haired woman from the third image eats fast and steadily, and without a word reaches over with a wrapped hand to take the bread crusts from the edge of the blonde woman's bowl. The second image's woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron with burn marks and a gravy spot, a belt of corked glass vials. The third image's woman: a gorgeous slim young Korean woman of twenty-one, East Asian features, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, neat cloth knuckle wraps. Other patrons only as blurred shapes far behind. Warm amber lantern light, night. Medium shot across the table, 50mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
