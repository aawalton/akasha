import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80463d6c33f872d1 = {
  id: "01a10190-cbff-721d-b4f2-4e93cb2a2db8",
  type: "page-type/image",
  slug: "image-80463d6c33f872d1",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-e00a6036e99ea905",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She has warm olive-brown skin, very dark brown eyes, thick straight black brows, full lips and a slim oval face, her long wavy black hair pushed back off her face and falling past her shoulders. She wears a long dark charcoal wool coat, buttoned all the way up, with a small round brass warden's badge pinned at the collar, grey wool trousers below the hem, and a canvas bag hanging over her left forearm. She stands on the bottom step of an old wooden staircase, paused mid-step, one hand on the banister, her body facing the camera. Her face is tired and set, faint shadows under her eyes, her expression composed and quiet, her eyes looking down and slightly to her right at something held out to her just below the frame. Behind her the stairs rise into shadow in the hall of an old stone student house at night, a dark window beside the front door, coats on iron hooks, worn floor tiles, warm light spilling from an open kitchen doorway at the edge of the frame. The light is low warm lamplight from one side with cool night shadow on the other. Framing is a medium shot from the thighs up, eye level, 50mm lens, shallow depth of field, the hall softly blurred so she fills the frame.",
} as const satisfies Image
