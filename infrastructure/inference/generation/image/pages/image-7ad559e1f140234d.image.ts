import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image7ad559e1f140234d = {
  id: "01a106ec-15db-7a92-bcef-ec5d35bc1183",
  type: "page-type/image",
  slug: "image-7ad559e1f140234d",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-d34454b4584b976c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the city from the first image, but the scene moves inside the Tipsy Heron, a loud lantern-lit canal tavern with dark beams, a fire and a window onto the lit canal. At a small corner table with bowls of brown stew and bread, the copper-haired woman from the second image is choking on a mouthful of stew, bent forward coughing, one hand over her mouth, face and ears flushed bright red. Beside her the blonde woman from the third image sits frozen with her spoon halfway to her mouth, staring down into her bowl, blushing pink from her collar to her cheeks. The copper-haired woman: a gorgeous slim athletic young Korean woman of twenty-one, small V-line face, almond-shaped bright green eyes, sun-kissed golden skin dusted with freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, neat cloth knuckle wraps. The blonde woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, a smudge of soot on one cheek, blonde hair in two long braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big scorched leather apron with a gravy spot, a belt of corked vials. Warm evening firelight and lantern glow. Medium shot across the table, 50mm lens, both faces clear.",
} as const satisfies Image
