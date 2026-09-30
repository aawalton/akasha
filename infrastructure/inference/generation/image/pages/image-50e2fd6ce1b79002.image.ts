import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image50e2fd6ce1b79002 = {
  id: "01a0f474-1682-7dde-85a8-d250ad2d7682",
  type: "page-type/image",
  slug: "image-50e2fd6ce1b79002",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light and warm practical sources, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a loose dark grey shirt hanging to mid-thigh and gaping at the collar, snug black compression tights beneath, sturdy laced brown leather boots, and a worn leather pack strapped on her back, and she is caked in black fen muck from boots to shoulders, smears of it drying grey on her cheek, arms and shirt, her hair damp and streaked with mud. She stands knee-deep at the edge of tall reeds, just stepping up out of them onto the bank, shoulders tired but straight, a calm tired half-smile, looking straight ahead past the camera. Behind her the flat grey-green fen stretches away under a pale sky, still water between the reeds, late afternoon sun low and warm on her side. Medium shot from the waist up, 50mm anamorphic lens, she fills the frame, reeds soft in shallow focus. No lettering anywhere.",
} as const satisfies Image
