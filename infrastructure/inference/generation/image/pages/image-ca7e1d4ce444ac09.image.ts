import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageCa7e1d4ce444ac09 = {
  id: "01a0fdfe-bb07-70f9-acbe-c61fb42f98da",
  type: "page-type/image",
  slug: "image-ca7e1d4ce444ac09",
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
    "Keep this exact woman: same face, glasses, nose stud, skin and hair. Change the scene around her. Fantasy photorealistic, warm and lively. She is a slim, slight British Indian woman of twenty-two with narrow shoulders and a small flat chest, warm brown skin, big dark eyes behind round tortoiseshell glasses, thick dark brows, a small gold nose stud, and thick curly black shoulder-length hair knotted up anyhow on top of her head with a pencil pushed through the knot, loose curls escaping. Her glasses sit slightly crooked on her nose. She wears a bright tangerine-orange corduroy pinafore dress over a striped long-sleeved top. She is standing at the end of a long wooden refectory table, just setting down a white plate holding four slices of toast and nothing else, mouth open mid-complaint, brows drawn together in comic aggrieved indignation, looking straight at the viewer. Behind her is a vast old stone dining hall with dark oak panelling, long tables, and tall arched windows full of bright late-morning sunshine, racks of toast and jars of marmalade along the table, blurred sleepy girls in hoodies in the background. Warm golden sunlight from the windows, a Saturday morning in autumn. Framed from the top of her head to mid-thigh, close vertical composition, eye level, 85mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
