import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1ef5ef84c2994855 = {
  id: "01a0f49a-c9f2-7ed1-9e9b-5042bb34e685",
  type: "page-type/image",
  slug: "image-1ef5ef84c2994855",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light and warm practical sources, volumetric haze; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a loose dark grey man's shirt that hangs to her mid-thigh and gapes at the collar, over snug black compression tights, and her feet are bare. She sits on a plain wooden bench, upright, her bare hands resting loosely in her lap, shoulders held deliberately easy. Her face is still pale and drained, a faint raw pink flush along her throat to her jaw, but she wears a small, thin, composed half-smile meant to reassure. Her eyes look to the right of the camera, steady and alert, as if listening closely to someone across the table. Behind her, a dim timber room at night, a single oil lamp throwing warm amber light across her left side, cool blue shadow on her right. Medium close-up from the waist up, 50mm anamorphic lens, eye level, she fills the frame, background soft and blurred.",
} as const satisfies Image
