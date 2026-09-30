import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image42e6c1f04326f362 = {
  id: "01a0f3b7-f690-7de5-9444-f854d4b16fb9",
  type: "page-type/image",
  slug: "image-42e6c1f04326f362",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-gray eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part, now windblown and damp at the temples. She wears a heavy gray wool cloak with the deep hood down, flapping behind her; a plain brown wool tunic darned at one elbow over a loose dark gray shirt whose collar gapes; snug black tights; thick knitted wool stockings; worn leather boots; a patched canvas knapsack on her back; a copper ring on one finger. She is mid-stride, running, winded, cheeks flushed and a little gray with hunger, breath steaming, lips parted, turning her head to look off to her right as if someone just called to her. Behind her runs a frosty packed-earth path along a tall gray fieldstone town wall, timber rooftops and woodsmoke beyond, cold winter morning, low pale sun. Three-quarter medium shot, 50mm, she fills the frame, background softly blurred.",
} as const satisfies Image
