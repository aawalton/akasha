import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image521c2012176b4266 = {
  id: "01a1046d-46c6-713d-aa51-3e6236ff8f9c",
  type: "page-type/image",
  slug: "image-521c2012176b4266",
  service: "image-edit-qwen",
  operation: "edit",
  model: "qwen-image-edit-2511-lightning+beyond-reality-3",
  inputImage: "image/image-fba84451f24bca40",
  serviceVersions: [
    "torch 2.9.1",
    "torch-vision 0.24.1",
    "torch-audio 2.9.1",
    "comfyui 28a40fb2b2b30a6fcd45ff824cc6f1093e26ee90",
  ],
  prompt:
    "Keep this exact woman: same face, eyes, brows, lips, skin and hair. Change the scene around her. Fantasy photorealistic. She is a gorgeous, tall, willowy young Japanese woman of twenty-four with a J-pop idol's face: a fine-boned delicate oval face, high cheekbones, cool grey eyes under straight dark brows, a small straight nose, soft full lips set in a composed unsmiling line, flawless pale porcelain skin, and glossy black hair scraped smoothly back from a bare forehead, no fringe, into a severe low bun at the nape, not a strand loose. She is slender with narrow shoulders. She wears a fitted charcoal-grey guild coat buttoned all the way to the throat, slim dark trousers and polished black boots, and holds a slim black leather ledger flat against her side with one long pale hand. She has just risen from a plain wooden bench behind her and stands very straight, chin level, facing the viewer, cool grey eyes fixed steadily on the viewer and not looking away, mouth flat, utterly composed and unreadable. Behind her a small, bare, very tidy room of pale grey plaster, a plain bench against the wall, a cold black iron stove in the corner, one small window high in the wall letting a narrow shaft of clean early afternoon daylight fall across her shoulder and the side of her face. Nothing anywhere carries lettering. Camera: framed from the top of her head to mid-thigh, close vertical portrait, 85mm lens, shallow depth of field, fine skin texture, gentle film grain.",
} as const satisfies Image
