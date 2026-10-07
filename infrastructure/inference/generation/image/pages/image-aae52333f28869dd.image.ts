import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageAae52333f28869dd = {
  id: "01a113ef-f19c-7b27-b3d7-f1f21bf8dc3d",
  type: "page-type/image",
  slug: "image-aae52333f28869dd",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd7cf9dd1f73a977",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Photorealistic photograph. Light olive skin, dark brown almond-shaped eyes, straight defined dark brows, an oval face, full lips, long jet black hair in a braid, dark and damp from the shower, hanging down her back. She wears a pale sky blue sports bra and matching high-waisted pale sky blue compression shorts, barefoot. She sits on the edge of a made queen bed, holding a black and white photograph print against her chest with both hands, the print a little bent. She is crying: her eyes red and wet, tears on her cheeks, her mouth pulled down and trembling in a crumpled smile, her shoulders hunched, her face turned slightly to the left, looking at someone just out of frame beside her. Behind her is a retro resort motel room at night, a second queen bed with a stack of black and white and color photo prints spilling from an open flat black box, the only light a lamp with a scarf draped over it giving a low warm amber glow, deep shadows in the corners. Camera: medium close-up from the front at seated eye level, 50mm lens, her face and the print against her chest filling the frame, shallow depth of field with the room soft and amber behind her.",
} as const satisfies Image
