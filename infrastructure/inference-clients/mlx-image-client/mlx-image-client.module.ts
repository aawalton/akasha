import type { Module } from "@akasha/code-system/module"

export const mlxImageClient = {
  id: "01a0682d-8ef5-7002-bb72-c45901a73f64",
  pageTypeSlug: "module",
  slug: "mlx-image-client",
  definition: "an image asked of the MLX image service from a prompt",
  code: "ts",
  invariants: [
    {
      invariantKind: "departure",
      statement: "A size is stated as `WxH` and is at fault stated any other way.",
    },
    {
      invariantKind: "departure",
      statement: "A generation size stands between 256 and 4096 and falls on a multiple of 16.",
    },
    {
      invariantKind: "departure",
      statement: "A guidance scale or a step count the caller told none of is left off the body.",
    },
    {
      invariantKind: "departure",
      statement: "The image is answered as the first `b64_json` datum the service carried back.",
    },
    {
      invariantKind: "departure",
      statement:
        "A timeout says the pool serves one request at a time so the wait counts the queue.",
    },
  ],
} as const satisfies Module
