import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ae1d72d9abae353 = {
  id: "01a0fe5d-4556-713a-ae09-28ed0fce86bb",
  type: "page-type/image",
  slug: "image-1ae1d72d9abae353",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e00a6036e99ea905",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tall slim young woman of about twenty-three with warm olive-brown skin, very dark brown eyes, thick straight black brows, a straight nose, full lips, an oval face with high cheekbones, and long black hair. Change her hair: pulled back tight off her face and tied at the nape, no loose strands. Change her clothes: a crisp white short-sleeved healer's tunic like a nurse's, buttoned at the left shoulder with small white buttons, plain and fitted, her slim bare forearms showing; thin dark-rimmed reading glasses on her nose. No badge. She sits at a worn wooden desk, a fat open textbook under her hands and a pencil in her right hand resting in its margin, a pale ceramic mug beside the book. She has just looked up from the page, head lifted, straight at the viewer, her dark eyes steady and serious over the reading glasses, lips closed, not smiling, a first flicker of concern in her brows. A brass desk lamp on the desk is lit, throwing warm gold light up across her face, tunic and hands. Behind her, softly blurred in blue shadow, a long empty white infirmary ward with old white iron hospital beds made up with tight white sheets and tall arched black night windows. Late night, the lamp the only warm light. Medium close shot from across the desk at her seated eye level, 85mm lens, shallow depth of field, her head, shoulders, tunic and hands on the book filling the frame.",
} as const satisfies Image
