import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image99e98ddc0487f69a = {
  id: "01a0e993-e416-7191-b807-af705f8e079c",
  type: "page-type/image",
  slug: "image-99e98ddc0487f69a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-4c93b4d652cf20d4",
  title: "Talia Greeting the Dawn with Tea",
  persona: "persona/talia",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings, wings or non-human traits. Keep her head exactly as in the reference and add nothing she does not have. At dawn she sits alone on the crest of a grassy park hill, knees drawn up, watching the sun rise, cradling a steaming cup of tea in both hands, a small open Bible resting on the grass beside her. A soft cream wool blanket is wrapped around her and has slipped down off her shoulders to her waist, her bare back and shoulders turned to the camera, a thin gold chain at her neck. Camera three-quarter from behind at a low angle, her face in soft profile, the rising sun low and rosy on the horizon, mist in the valley below. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
