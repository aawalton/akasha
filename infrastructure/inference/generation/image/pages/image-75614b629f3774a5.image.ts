import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image75614b629f3774a5 = {
  id: "01a0fdec-1125-774f-b880-211979f23d5c",
  type: "page-type/image",
  slug: "image-75614b629f3774a5",
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
    "Keep this exact woman: same face, freckles, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, wiry young woman of twenty-one, sun-browned skin with a scatter of freckles across her nose and cheeks, bright hazel eyes, a wide grin showing a small gap between her front teeth, and short sandy-blonde hair cut ragged and uneven, sticking up in tufts as if she cut it herself with a knife. She wears a loose cream linen shirt with the sleeves rolled to the elbow and the neck open, a thin leather cord disappearing inside it, close-fitting dark brown breeches, and worn brown leather boots to mid-calf. She stands in an open plank doorway, weight on her left leg, her right boot just stamped down on the floorboards, her right hand still holding the top of that boot as she straightens up, her head tilted up toward the camera with a big gap-toothed grin, looking straight into the lens, cheerful and quick. Behind her is a cramped top-floor landing of an old grey stone rooming house, worn wooden floorboards, a sloping whitewashed ceiling with dark beams, and thin cool early morning light falling from a skylight above. Full-length shot, 35mm lens, eye level, moderate depth of field, her figure filling the frame top to bottom.",
} as const satisfies Image
