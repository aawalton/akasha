import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageD452f810c502e5cb = {
  id: "01a106e8-5e1a-79d8-b0b3-170ca7432ae1",
  type: "page-type/image",
  slug: "image-d452f810c502e5cb",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-18b50fdd9b3aa1db"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the look of the canal city from the first image but move the scene inside the Tipsy Heron, a loud, cozy adventurers' tavern by the canal: low dark beams, a fire, gold lantern light coming in through a window from the canal outside, a small corner table with empty stew bowls. Keep both women's faces exactly as in their images. The pink-haired woman from the second image sits at the table with her chin resting on her clasped gloved hands, looking across at the blonde woman with an open, radiant, completely sincere smile, eyes shining, saying something warm and simple. The small blonde woman from the third image sits across the table, frozen with her spoon halfway to her mouth, staring back at her, her cheeks beginning to flush pink. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, fingerless leather gloves. The third image's woman: a gorgeous small petite young Japanese woman of twenty, small round doll-like face, big bright blue eyes, tiny nose, soft pink lips, fair skin with a smudge of soot on one cheek, blonde braids with singed ends, brass goggles pushed up on her head; slim build, small chest; cream blouse with rolled sleeves, a too-big leather apron with burn marks and a gravy spot. Other patrons only as blurred shapes far behind. Warm golden lantern light, night. Medium close shot across the table, 85mm lens, both faces clear in three-quarter view, shallow depth of field.",
} as const satisfies Image
