import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageEd2186b292e4e293 = {
  id: "01a0e98f-5ab1-7467-96ed-f0ecadfaf4ff",
  type: "page-type/image",
  slug: "image-ed2186b292e4e293",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-a99e54077778133a",
  title: "Ryn Stretching in the Sunrise Mist",
  persona: "persona/ryn",
  albums: ["image-album/persona-sunbathing"],
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "She is an adult woman. Keep her exact face, hair, eyes and every distinctive feature, including any horns, ears, markings or non-human traits. Keep her head exactly as in the reference and add no horns or features she does not have. She sits on a sage-green yoga mat on a quiet park lawn in early morning, legs stretched straight out, folding gently forward in a seated stretch reaching toward her toes, eyes closed, calm. She wears only high-waisted sage yoga leggings; her cropped tank top is tossed on the grass beside her, her long bare back curved to the camera, her folded pose and arms hiding her chest, a thin anklet on one ankle. Camera three-quarter from behind and to the side at low height, soft pale gold sunrise light, dew and a faint mist over the lawn. No other people. Photorealistic, natural skin detail.",
} as const satisfies Image
