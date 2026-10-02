import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDb6e601b317eb3d1 = {
  id: "01a0fe4b-33d4-7beb-88c5-a9dccd1e9461",
  type: "page-type/image",
  slug: "image-db6e601b317eb3d1",
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
    "Keep this exact woman: same face, glasses, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim, slight young South Asian woman of twenty-two with warm brown skin, big bright dark eyes behind round tortoiseshell glasses, full dark brows, a small gold stud in her left nostril, an oval face, and thick curly black hair knotted up on top of her head with a pencil stuck through the knot, loose curls around her face. She wears a bottle-green corduroy pinafore over a long-sleeved cream and brown striped top. She sits on a wooden lecture bench, sitting back a little, frowning slightly in thought, tapping the end of a red pen against her lower lip, her eyes lowered to an open notebook on the desk in front of her. The page is plain ruled paper with a few short red underlines in the margin and no letters, words or symbols anywhere. Black and green pens lie beside the notebook. Behind her, wooden benches rise steeply in a long high stone lecture hall, softly blurred, with a few young women in the far rows seen from behind, and a great blackboard of chalk circles and lines far below. Cool grey mid-morning light from tall windows, dust in the air. Close shot at desk level beside her, 50mm lens, shallow depth of field, her face, hand and the notebook filling the frame.",
} as const satisfies Image
