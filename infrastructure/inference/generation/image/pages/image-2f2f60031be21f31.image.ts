import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2f2f60031be21f31 = {
  id: "01a0fe6d-4d6c-79f9-b2c8-b0cc90c891da",
  type: "page-type/image",
  slug: "image-2f2f60031be21f31",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d9b83e18f151ce35",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, dimples, rosy cheeks, skin and hair. Change the scene around her. Fantasy photorealistic. She has fair skin flushed rosy pink across the cheeks, warm brown eyes, light brows, deep dimples, a round soft face, and long honey-blonde hair piled in a fresh messy bun on top of her head with a few fine strands falling loose round her face. She is slim and athletic with narrow shoulders and a small flat chest. She wears her biggest jumper, a huge chunky cream cable-knit wool jumper so long it comes down past her knees, its sleeves pushed up a little at the wrists, over black leggings. Her mug is gone and her hands are empty. She leans one shoulder against the frame of an open old painted wooden bedroom door, her arms folded across her chest, her head tipped a little, looking straight into the camera with a mock-stern pursed mouth that is about to break into a grin, her dimples just showing. Behind her is a narrow residence corridor with dark wooden wainscoting and whitewashed walls, cool and dim, lit by soft grey early-afternoon autumn daylight from a window down the corridor. Camera: eye-level medium shot from inside the room looking out at her in the doorway, framed from just below her knees to above her bun so she fills the frame, 50mm lens, shallow depth of field with the corridor softly blurred behind her.",
} as const satisfies Image
