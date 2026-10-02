import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image81dfc4bd6cd35b8f = {
  id: "01a0fd49-e389-7026-8596-1cd7394e1812",
  type: "page-type/image",
  slug: "image-81dfc4bd6cd35b8f",
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
    "Keep this exact woman: same face, glasses, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim, slight young South Asian woman of twenty-two with warm brown skin, big bright dark eyes behind round tortoiseshell glasses, full dark brows, a small gold stud in her nose, a wide warm smile, an oval face, and thick curly black hair knotted up on top of her head with a pencil stuck through the knot, loose curls falling around her face. She wears a bright mustard corduroy pinafore over a long-sleeved cream and brown striped top. She sits on a crowded wooden lecture bench, leaning sideways towards the viewer, whispering with a quick bright grin, holding a green pen and drawing a small cartoon of a stick figure pushing a boulder up a hill in the margin of an open notebook pulled halfway onto her own lap, two more pens, black and red, tucked between her fingers. No writing or letters on the page, only little drawings, boxes and arrows. A canvas tote stuffed with notebooks sits at her feet. Behind her, rows of wooden benches rise steeply in a long high stone lecture hall, packed with blurred young women with notebooks, and far below a great blackboard of chalk diagrams. Warm late-morning light from tall windows, dust in the air. Medium close shot at bench level beside her, 50mm lens, shallow depth of field, her face, hands and the notebook filling the frame.",
} as const satisfies Image
