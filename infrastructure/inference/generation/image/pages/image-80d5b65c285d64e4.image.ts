import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image80d5b65c285d64e4 = {
  id: "01a1018f-fa65-71b7-b67a-2c3d9d53b6e2",
  type: "page-type/image",
  slug: "image-80d5b65c285d64e4",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-1545279fc0280a45",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, lips, skin and braids. Change the scene around her. Fantasy photorealistic. She has deep brown skin, bright dark eyes, high cheekbones, neatly shaped brows, a full mouth and a slim oval face, her long black box braids gathered into a high ponytail falling down her back. She wears a beautiful cream silk shirt with the sleeves rolled up to the elbows and the collar open at the throat, slim black tailored trousers, small gold hoop earrings and a gold watch on her left wrist. She stands at a worn wooden kitchen counter, turned three-quarters to the camera, holding a big kitchen knife clumsily in her right hand over a chopping board heaped with lumpy, uneven chunks of onion, her left hand steadying half an onion. Tears run down both her cheeks and her eyes are wet and squinting, but she is laughing, mouth open, looking straight at the camera. Behind her is a warm, cluttered old student house kitchen in the evening: pans steaming on an old range, an open spice tin, a radio on the windowsill, a dark window, mugs on hooks. The light is warm yellow electric kitchen light with a little steam in the air. Framing is a medium shot from the waist up, eye level, 50mm lens, shallow depth of field, the kitchen softly blurred so she fills the frame.",
} as const satisfies Image
