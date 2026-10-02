import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image9cd792ba2b28206a = {
  id: "01a0fdeb-43df-7068-aeb1-606799297329",
  type: "page-type/image",
  slug: "image-9cd792ba2b28206a",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-a251c3c48d2d6847",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, wiry young woman of twenty-one, sun-browned skin with a scatter of freckles across her nose and cheeks, bright hazel eyes, a wide grin showing a small gap between her front teeth, and short sandy-blonde hair cut ragged and uneven, sticking up as if she cut it herself in the dark. She wears a loose cream linen shirt with the sleeves rolled to the elbow and the neck open, a thin leather cord disappearing inside it, close-fitting dark brown breeches, and a worn brown leather boot on her left foot. She is hopping on her left foot just outside an open plank door, her right knee raised high, both hands hauling a second brown leather boot onto her right foot, leaning forward a little for balance, her head turned up toward the camera with a big gap-toothed grin, looking straight into the lens, cheerful and quick. Behind her is a cramped top-floor landing of an old grey stone rooming house, worn wooden floorboards, a sloping whitewashed ceiling with dark beams, a faded blue plank door behind her standing open, and thin cool early morning light falling from a skylight above. Full-length shot, 35mm lens, slightly high angle, moderate depth of field, her figure filling the frame top to bottom.",
} as const satisfies Image
