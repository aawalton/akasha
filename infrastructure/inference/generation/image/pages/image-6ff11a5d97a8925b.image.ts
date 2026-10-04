import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6ff11a5d97a8925b = {
  id: "01a106e4-7acc-7ac4-8143-dd1c56ad58a1",
  type: "page-type/image",
  slug: "image-6ff11a5d97a8925b",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-f00952ec43ad7bf7",
  referenceImages: ["image/image-e6523dfa77c4852c", "image/image-d34454b4584b976c"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Fantasy photorealistic candid photograph, nobody looks at the camera. Keep the look of the canal city from the first image, its half-timbered houses and warm lantern glow, but move the scene inside the Tipsy Heron, a loud, cheap, cozy adventurers' tavern by the canal: low dark beams, lantern light, crowded wooden tables, a fire, a window showing the lantern-lit canal outside at dusk. Keep both women's faces exactly as in their images. The pink-haired woman from the second image walks up to a small corner table carrying two steaming bowls of brown stew, one in each hand, beaming proudly, and sets one down in front of the copper-haired woman. The copper-haired woman from the third image sits at the table, half rising with a hand up as if to argue about paying, then grinning in surrender, a great axe leaning on the wall behind her. The second image's woman: a gorgeous slim young Korean woman of about twenty, small V-line face, big rose-pink doe eyes, glossy pink lips, pale porcelain skin, short rose-pink layered bob with side-swept bangs and a pink-and-white flower clip; slim build, small chest; cropped cream halter top laced up the front, short sage-green skirt, brown belt with pouches, fingerless leather gloves. The third image's woman: a gorgeous slim young Korean woman of twenty-one, East Asian features, small V-line face, almond-shaped bright green eyes, full lips, sun-kissed golden skin dusted with light freckles, a wild mass of long copper-red curls barely tied back; slim build, small chest; sleeveless battered leather jerkin, neat cloth knuckle wraps. Other patrons only as blurred shapes far behind. Warm amber lantern and firelight. Medium shot, 50mm lens, both faces clear, shallow depth of field.",
} as const satisfies Image
