import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1e69973113954445 = {
  id: "01a0f200-c69d-7f81-8514-7093f7b4761f",
  type: "page-type/image",
  slug: "image-1e69973113954445",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. High-budget CGI fantasy feature film still, blockbuster studio VFX: physically based materials, subsurface-scattered skin, strand-level hair and simulated cloth; cinematic key light with strong rim light and warm practical sources, volumetric haze and light shafts; filmic teal-and-amber grade with deep blacks and soft rolled-off highlights; anamorphic lens, oval bokeh, faint flare, shallow depth of field. She is a slim young woman of about twenty-five with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She wears a heavy soft brown wool cloak around her shoulders, open at the front over a loose oversized dark grey modern shirt, its collar gaping. She sits alone at a scrubbed wooden kitchen table, a torn half loaf of bread in her left hand, a plate of cold mutton, butter and cheese and a clay jug in front of her, crumbs on the table. Her right hand rests beside the plate. She has just looked up from her food, head raised and turned slightly to her left, eyes wide and alert, lips parted, gazing past the camera toward an unseen doorway, caught mid-bite and wary. Behind her is a warm farmhouse kitchen: whitewashed stone walls, dark oak beams hung with herbs, a black iron range glowing orange, copper pans, evening light from a small window mixed with firelight, soft smoky haze. Medium close shot at table height, 50mm anamorphic lens, shallow depth of field, she fills the frame.",
} as const satisfies Image
