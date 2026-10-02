import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image50683a9088eeb1db = {
  id: "01a0fe4a-06d6-739d-b2f5-df2b0901a1b0",
  type: "page-type/image",
  slug: "image-50683a9088eeb1db",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a slim young woman of about twenty with pale fair skin, a light dusting of freckles across her nose and cheeks, clear blue-grey eyes, straight dark auburn brows, a small straight nose, soft full rose-pink lips, a heart-shaped face narrowing to a small chin, and long straight dark auburn-red hair, today pulled back into a ponytail with a plain hair band. She wears a soft grey wool jumper, slightly too big for her, over close-fitting black leggings, and white running trainers laced up on her feet. She sits upright on the very edge of a narrow single dorm bed with rumpled white sheets, both feet flat on the floorboards, hands resting on her knees, leaning slightly forward, ready to stand. Her head is turned towards a closed wooden door at the side of the frame, listening for a knock, lips pressed together in a small eager half-smile. Behind her, a small plain student room in an old stone house: a sash window above the bed, still dark blue with early dawn, an old iron radiator, a wooden trunk at the foot of the bed. The only light is a small warm bedside lamp, the rest of the room in soft dim blue shadow. Camera: full-length seated portrait from across the room at seated eye level, 35mm lens, shallow depth of field, the woman filling the frame, no other person visible.",
} as const satisfies Image
