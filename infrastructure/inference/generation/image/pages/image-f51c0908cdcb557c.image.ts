import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageF51c0908cdcb557c = {
  id: "01a0eaaa-56ba-76a7-848f-7b2f07ed3fb1",
  type: "page-type/image",
  slug: "image-f51c0908cdcb557c",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-17f59c7233925455",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light and warm practical sources, volumetric haze; filmic teal-and-amber grade with deep blacks; anamorphic lens, oval bokeh, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a loose dark grey shirt far too big for her, hanging to mid-thigh and gaping at the collar, over snug black compression tights, and she is barefoot. She stands alone and still, her small freckled hands empty and loose at her sides, her chin lifted slightly as she looks up at someone taller just off frame to her right, her expression thoughtful and composed, lips closed, weighing a hard question. Behind her, softly blurred, a waist-high stone shrine house with a single small oil lamp burning alone, three thin incense sticks planted in a sand burner, three standing stones and an empty village square of packed earth fading into night. The last light is gone from a deep indigo sky. Warm lamplight on one side of her face, cool night rim light on her hair. Medium shot from the waist up, 50mm anamorphic lens, she fills the frame.",
} as const satisfies Image
