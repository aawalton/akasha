import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image6fb1192dcac66520 = {
  id: "01a10247-2791-7fbc-868f-938164fdbd6b",
  type: "page-type/image",
  slug: "image-6fb1192dcac66520",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-d9b83e18f151ce35",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, dimples, eyes, lips, skin and hair colour. Change the scene around her. Fantasy photorealistic. A gorgeous sunny young woman of twenty-one with fair skin, warm brown eyes, light brows, deep dimples, her long honey-blonde hair scraped back hard off her face into a tight knot at the back of her head, not a strand loose. She is slim and athletic with narrow shoulders and a small flat chest. This morning her face is pale, almost white, with nerves. She wears a long-sleeved bottle-green Thornfield rowing sweatshirt with a small white house crest on the chest, over a white vest, and plain black leggings, bare feet. She sits on the edge of a narrow bed with a rumpled patchwork quilt, knees together, a small white plate on one knee holding a half-eaten slice of dry toast, one bite held in her fingers near her mouth. Her shoulders are hunched up tight, her lips pressed together, and she stares straight ahead past the camera at a wall, eyes wide and fixed. Behind her a small old college bedroom with sloping ceiling, thick curtains closed, a dark window edge showing deep blue before dawn, a single bedside lamp throwing warm low gold light on her face. Five in the morning. Close framing from the top of her head to her knees, 85mm lens, shallow depth of field, she fills the frame, fine skin texture, gentle film grain.",
} as const satisfies Image
