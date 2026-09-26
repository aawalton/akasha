import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const imageDd670060f06537f7 = {
  id: "01a0c5f3-2541-7a2b-9586-efcc7bff05f3",
  type: "page-type/image",
  slug: "image-dd670060f06537f7",
  persona: "persona/aine",
  service: "image-gen-aine",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "ainez woman, Full intimacy and trust. Leaning close against the sun-warmed stone of a walled June rose garden in full extravagant bloom, espaliered pears trained along the wall behind her, she turns to you from just within arm's reach, one hand lifted as if to draw you down beside her; her hazel-green eyes soft, open, and meeting yours in an unhurried, trusting moment, a quiet half-smile on her lips; old garden roses blurred into warm golden bokeh behind her, dressed in soft cozy linen rather than anything styled or glam, low golden-hour light washing warm across her freckled skin, tight framing with shallow depth of field. Shot on an 85mm portrait lens, under soft natural daylight. Photorealistic with natural skin detail, 1024x1024.",
  seed: 37285460,
  width: 1024,
  height: 1024,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
