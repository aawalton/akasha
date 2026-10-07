import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6c3d1f4b35a339e1 = {
  id: "01a11420-cada-75e3-bd0b-cc09901a4307",
  type: "page-type/image",
  slug: "image-6c3d1f4b35a339e1",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-18b50fdd9b3aa1db",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair colour. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a gorgeous, small, petite young Japanese woman of twenty with a sweet J-pop idol's face: a small round doll-like face, big bright blue eyes, a tiny nose, soft pink lips, fair smooth skin with a smudge of soot on one cheek, and blonde hair with wispy bangs in two long braids with singed ends, brass goggles pushed up on her head. Tonight her braids are taken out and there are no goggles: her blonde hair hangs down loose past her shoulders, crinkled in waves from the plaiting, the ends singed, wispy bangs. She wears a cream blouse with rolled sleeves and has a grey wool blanket wrapped round her shoulders, held closed at her chest with both hands, her feet bare on the floorboards. She stands in an old wooden doorway, one shoulder against the frame, looking in and to the side into the room with a soft, sleepy, wondering look, lips a little parted. Behind and around her, a dark old parlour at night, the only light the pale moving reflection of canal water through an open window, silvery blue, playing over her face and the blanket. Night, dim and soft. Medium shot from the knees up, 50mm lens, shallow depth of field.",
} as const satisfies Image
