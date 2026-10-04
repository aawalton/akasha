import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageE488babbfbece30a = {
  id: "01a10749-ea1b-73ee-b896-6c58ee979c63",
  type: "page-type/image",
  slug: "image-e488babbfbece30a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-3ceffacb87f4a406",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic, candid photograph, she does not look at the camera. She is a sturdy, broad-shouldered Korean bargewoman in her fifties: a round face weathered by sun and wind, laughing green eyes with deep crow's feet, a wide generous mouth, warm tanned golden skin dusted with old freckles, and thick curly copper-red hair going grey, pinned up roughly with a wooden comb. She wears a faded red shirt with the sleeves rolled, a coal-dusted dark canvas apron over it, brown trousers and a grey knitted shawl round her shoulders, a dish rag in one hand. She climbs half out of the cabin hatch of a long bottle-green coal barge, one hand on the hatch rim, and shouts with her whole body toward the quay, mouth wide open, eyes fixed into the distance, joy breaking over her weathered face. Pots of red and pink geraniums line the cabin roof around her; coal heaps and moored barges blur behind. Bright early summer morning sun. Nothing lettered. Medium shot, 35mm lens, shallow depth of field.",
} as const satisfies Image
