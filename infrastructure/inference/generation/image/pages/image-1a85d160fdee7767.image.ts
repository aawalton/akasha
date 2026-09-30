import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1a85d160fdee7767 = {
  id: "01a0f470-7c31-7e8b-9f99-a7b9eacc1a59",
  type: "page-type/image",
  slug: "image-1a85d160fdee7767",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light and warm practical sources, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-gray eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a plain brown wool tunic over a loose dark gray man's shirt whose collar gapes at her neck, a worn gray wool cloak around her shoulders, a plain knife in a worn sheath at her hip and a thin copper ring on her finger. She stands leaning over a heavy scarred wooden desk, her right hand held just above a small dark stone on the desk, a fine thread of white-gold light running from her fingertips down into the stone, the stone black at one side and faded to ash gray at the other, faint frost rising from it. Her brow is drawn tight, lips pressed thin, eyes fixed down on the stone. Behind her, a dim timber guild hall with a notice board and shelves of ledgers, soft afternoon light slanting through a small window. Medium close shot at desk height, 50mm, she fills the frame, background softly blurred.",
} as const satisfies Image
