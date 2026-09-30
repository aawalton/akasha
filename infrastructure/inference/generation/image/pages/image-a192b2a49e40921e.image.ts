import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA192b2a49e40921e = {
  id: "01a0f38c-ae17-7ce7-8ec6-d261f422a189",
  type: "page-type/image",
  slug: "image-a192b2a49e40921e",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a loose dark charcoal-grey shirt far too big for her, hanging to mid-thigh and gaping at the collar, over snug black compression tights, and she is barefoot in wet mud. She stands on a muddy channel bank, turned in three-quarter profile, one hand shading her brow, looking away to her left along the bank with a calm, measuring expression. Along the bank behind her, peeled white willow stakes stand pale as bone here and there in the dark mud, beside a slow tea-dark peat channel between tall green and tawny reeds, grey alder carr beyond. Late morning in the fen, thin mist lifting, warm hazy sunlight slanting in soft shafts, rim light along her red hair. Medium shot from the waist up, 50mm anamorphic lens, she fills the frame, the white stakes and reeds falling into soft oval bokeh. No text.",
} as const satisfies Image
