import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image220f4f497e59334d = {
  id: "01a0fd25-8633-74a5-82d8-5f21c4c7b842",
  type: "page-type/image",
  slug: "image-220f4f497e59334d",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim young woman of about twenty with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part, slightly tousled from sleep. She wears only a long loose white brushed-cotton nightshirt that hangs off one narrow shoulder, her small bare feet tucked under her. She kneels on a rag rug on bare floorboards beside an open old battered black trunk with brass corners, its lid raised, holding folded jeans and jumpers, a stack of heavy new books and a folded long black gown. In both small freckled hands she holds a cheap plastic phone with a blank white screen, her head bent, looking down at it, brows drawn together, lips parted, bewildered and uneasy. Behind her is a narrow single bed under a tall narrow window set deep in a grey stone wall, grey lake water and dark fells beyond the warped glass. Cold, bright, white morning daylight from the window falls across her. Medium shot from slightly above, 35mm lens, shallow depth of field, she and the trunk filling the frame.",
} as const satisfies Image
