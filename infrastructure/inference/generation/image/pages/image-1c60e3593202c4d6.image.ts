import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1c60e3593202c4d6 = {
  id: "01a0f143-550d-7d6d-a655-296d6253bd4c",
  type: "page-type/image",
  slug: "image-1c60e3593202c4d6",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a loose dark grey cotton shirt far too big for her, hanging to mid-thigh and gaping at the collar, over snug black compression tights, and she is barefoot. She has just skidded to a stop on a stony riverbank, knees bent, weight low and balanced, one bare foot braced ahead on the pebbles, arms out at her sides, loose stones scattering. Windblown strands of red hair lie across her face. She is breathing hard, lips parted in a wide delighted grin, eyes bright, looking straight ahead past the camera. A few fading wisps of swirling air trail behind her. Behind her a shallow stream runs along the bank and a dark pine ridge rises under a pale red sky in soft morning light. Full-body medium shot from low and slightly to her front, 35mm anamorphic, background softly blurred, she fills the frame.",
} as const satisfies Image
