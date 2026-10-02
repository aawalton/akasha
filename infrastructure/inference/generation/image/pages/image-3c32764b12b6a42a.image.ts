import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image3c32764b12b6a42a = {
  id: "01a0fd35-640c-7bf8-9843-d02861f1512b",
  type: "page-type/image",
  slug: "image-3c32764b12b6a42a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1f86fcdf79cf1d8c",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, wrinkles, eyes, mouth, skin and hair. Change the scene around her. Fantasy photorealistic. She is a tiny, frail, very old woman of about eighty-six, bent nearly double and bird-boned, with a deeply wrinkled brown-spotted face, a sharp chin, hollow cheeks, pale blue eyes and thin white hair plaited in a crown round her head. She wears a rusty black wool dress, a heavy dark red knitted shawl pinned at the throat with a brass brooch, and a string of small shells round one bony wrist. She sits on a stone bench beside a bright, chipped blue-painted door of a grey stone cottage on a harbour street. One knotted hand grips a blackthorn walking stick planted beside her; the other hand reaches out toward the viewer, palm down, light and dry as a leaf, about to pat someone's hand just off frame. She leans forward, smiling a delighted, sly smile with only a few teeth, her pale blue eyes bright and fixed on the viewer's face, as if she has just told a secret and is pleased with it. Behind her, slate roofs stepping down a steep hill to a walled harbour, fishing boats and grey sea, softly blurred. Overcast grey late morning light, soft and cool. Framed from her head to her knees, eye level with her as she sits, 85mm lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
