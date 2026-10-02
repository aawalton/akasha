import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDebe774ab589521f = {
  id: "01a0fd4a-fec6-794a-9d8f-10017fb6fe29",
  type: "page-type/image",
  slug: "image-debe774ab589521f",
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
    "Keep this exact woman: same face, glasses, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim, slight young South Asian woman of twenty-two with warm brown skin, big bright dark eyes behind round tortoiseshell glasses, full dark brows, a small gold stud in her left nostril, a wide warm smile, an oval face, and thick curly black hair knotted up on top of her head with a pencil stuck through the knot, loose curls around her face. She wears a bright mustard corduroy pinafore over a long-sleeved cream and brown striped top. She sits on a wooden lecture bench, leaning sideways towards the viewer, whispering behind a quick bright grin, a green pen in her hand drawing in the margin of an open notebook on the desk in front of her: a tiny stick figure pushing a round boulder up a hill, a curved arrow, a small box. The rest of the page is plain ruled paper, with no letters, words or symbols anywhere. Black and red pens lie beside the notebook. Behind her, empty wooden benches rise steeply in a long high stone lecture hall, softly blurred, with a few young women in the far rows seen from behind, and a great blackboard of chalk circles and lines far below. Warm late-morning light from tall windows, dust in the air. Close shot at desk level beside her, 50mm lens, shallow depth of field, her face, hand and the notebook filling the frame.",
} as const satisfies Image
