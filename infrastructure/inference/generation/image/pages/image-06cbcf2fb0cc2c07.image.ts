import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image06cbcf2fb0cc2c07 = {
  id: "01a0fea0-4772-778d-a9bd-52edd91a9d50",
  type: "page-type/image",
  slug: "image-06cbcf2fb0cc2c07",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-5c2e50b34a34cbed",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, glasses, nose stud, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim, slight woman of twenty-two with narrow shoulders and a small flat chest, warm brown skin, big dark eyes behind round tortoiseshell glasses, a small gold nose stud, and thick curly black shoulder-length hair knotted up on top of her head with a yellow pencil pushed through the knot, loose curls falling round her face. She wears a red corduroy pinafore dress over a cream and brown striped long-sleeved top. She sits alone at a long dark oak refectory table, a wooden tray in front of her holding a white cup of coffee on a saucer and an untouched croissant on a plate. Both her hands hold the saucer and turn the cup slowly round on it. She is frowning, brows drawn together, eyes cast down at the coffee, lips pressed, troubled and far away, her cheeks faintly flushed pink. Behind her, softly blurred, a vast old college dining hall with tall leaded windows, stone walls and dark panelling, late morning daylight falling grey and soft through the windows. Camera: medium close shot across the table at her eye level, 85mm lens, she fills the frame from the waist up, shallow depth of field.",
} as const satisfies Image
