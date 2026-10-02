import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image11939fe490c37825 = {
  id: "01a0fe24-5deb-7247-acb6-f69261ec00a7",
  type: "page-type/image",
  slug: "image-11939fe490c37825",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-5e76d8980617353d",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. Very fair skin, a light dusting of freckles across her nose and cheeks, sea-green eyes, sandy brows, a lean face with a slightly crooked mouth, chin-length strawberry-blonde hair, here damp and curling loosely after a swim, tousled. She wears a plain grey hooded sweatshirt with drawstrings, no jacket and no towel. She is sitting at a long wooden refectory table on a bench, seen from the waist up, holding a knife and fork over a plate heaped with roast beef, gravy and three Yorkshire puddings. She is looking down at her plate, not at the camera, cutting her beef, and the corner of her mouth is turned up very slightly in a small private smile. Behind her is a vast old stone dining hall with tall arched windows, dark wooden panelling and long tables crowded and blurred with students eating, warm and busy. Light: early afternoon daylight through the high windows, warm and golden, steam rising from the food. Camera: medium close-up, 85mm lens, eye level, shallow depth of field, the background softly blurred, she fills the frame, no other face in focus.",
} as const satisfies Image
