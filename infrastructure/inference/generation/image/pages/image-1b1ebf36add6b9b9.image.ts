import type { Image } from "akasha/infrastructure/inference/generation/image/image.page-type.types.ts"

export const image1b1ebf36add6b9b9 = {
  id: "019f1838-ace6-7a7a-a5a0-8604440616b6",
  type: "page-type/image",
  slug: "image-1b1ebf36add6b9b9",
  service: "image-gen",
  operation: "generate",
  model: "Tongyi-MAI/Z-Image-Turbo",
  prompt:
    "an 18-year-old young woman, petite and short with a slender frame, a thin fine lovely face with delicate refined features, vivid bright red hair, striking bright blue eyes, fair skin lightly sun-warmed and faintly freckled, arms subtly toned from training, youthful and pretty with the upright poised bearing of a princess, wearing a finely tailored fitted royal-blue bodice over a crisp high-necked white blouse with delicate lace at the collar and gold embroidered trim, modest and elegant, ankle-length full skirt, her bright red hair neatly pinned up in a refined style, small sapphire drop earrings, chin lifted, self-possessed and quietly proud, a cool composed confidence, refined and dignified, standing behind the inn's wooden counter with a ledger and stacked gold coins, inside a warm wooden medieval fantasy inn, hearth firelight, close upper-body portrait, painterly character portrait, richly detailed, intensely detailed bright blue eyes, sharp focus on eyes, warm cinematic lighting",
  seed: 41010011,
  width: 832,
  height: 1216,
  quantize: 8,
  serviceVersions: ["mlx 0.31.0", "mlx-metal 0.31.0", "mlx-openai-server 1.8.1"],
} as const satisfies Image
