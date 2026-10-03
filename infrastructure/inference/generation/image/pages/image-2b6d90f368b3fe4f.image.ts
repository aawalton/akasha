import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image2b6d90f368b3fe4f = {
  id: "01a101cf-07ed-7bec-b747-f0558f3d7f85",
  type: "page-type/image",
  slug: "image-2b6d90f368b3fe4f",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim young woman of about twenty with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair worn loose with a side part. She is small and petite. She wears a dark navy wool winter coat buttoned up, the thick rolled collar of a big cream cable-knit jumper showing at her neck, the jumper's long sleeves poking out past the coat cuffs, grey knitted gloves on her hands, dark jeans and brown leather boots. She stands on a frosty college quad at dawn, her gloved hands tucked under her arms against the cold, shoulders hunched, her breath smoking in a big slow white cloud in front of her mouth, her cheeks and nose pink with cold, looking a little past the camera with a sleepy half smile. Behind her, softly blurred, the quad lawn white and stiff with frost, pale stone paths, an old grey stone college range with dark windows, and beyond it huge brown and grey fells with snow along the high ridges catching the first light. Pearl-grey dawn sky, pink at one edge, cold soft light. Close framing from the top of her head to her waist, 85mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
