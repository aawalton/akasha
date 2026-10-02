import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageC0d84046e307f702 = {
  id: "01a0fd46-3463-7495-84b8-4f53a0d5ae9c",
  type: "page-type/image",
  slug: "image-c0d84046e307f702",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-b01f99fab1d0a9d2",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, glasses, eyes, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a lean, upright Cornishwoman of fifty-eight with weathered fair skin lined by wind and weather, kind sharp blue eyes, a long straight nose, thin smiling lips, high cheekbones and short cropped silver hair swept back off her forehead, round wire-rimmed glasses on her nose with a fine chain looping from them. She wears a fitted moss-green tweed jacket over a cream silk blouse and a long charcoal wool skirt. She has just stood up behind a cluttered wooden desk, one hand resting on a stack of papers, the other lifted in welcome, smiling warmly with a dry spark of humour, looking straight at the viewer. On the desk among drifts of papers sits a big square tin with a red tartan lid. Behind her is a round porthole window in the stone looking far down onto a grey and silver lake below in cold morning light. All around her books are crammed floor to ceiling on every wall, stacked in leaning towers on the floor and windowsill, beside a brass instrument of rings and arms on a side table and a threadbare rug. Soft grey morning light from the round window, warm lamp glow on the books. Medium shot from the doorway at desk height, 50mm lens, shallow depth of field, her figure from the head to the hips filling the frame.",
} as const satisfies Image
