import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageA3b56ed848fa9107 = {
  id: "01a0feb0-9640-7965-a0ab-809983ab6db0",
  type: "page-type/image",
  slug: "image-a3b56ed848fa9107",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fd81109ae3a3a752",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a small, slight, very slim woman of twenty with narrow shoulders and a flat chest, very pale skin, cool grey-green eyes, fine dark brows, sharp cheekbones, a pointed chin, and glossy black hair in a blunt chin-length bob with a straight fringe. She wears a pair of borrowed soft pale blue flannel pyjamas far too big for her, the long sleeves falling past her wrists, the trouser legs rolled up in thick cuffs at her bare ankles, and a thin silver ring on one hand. She sits cross-legged in the middle of a nest of rumpled wool blankets and a pillow laid on bare wooden floorboards, her back very straight, her hands resting on her knees, facing the camera, her chin lifted and her expression perfectly composed and extremely dignified, the faintest trace of a smile held in at one corner of her mouth, her eyes looking straight into the lens. Behind her, softly blurred, a cosy student bedroom at night: the edge of a bed with a patchwork quilt, a bedside lamp casting warm golden light, a dark rain-streaked window. Warm low lamplight on her face, deep shadow at the edges. Camera: shot from a doorway slightly above her eye level, 50mm lens, she fills the frame, shallow depth of field.",
} as const satisfies Image
