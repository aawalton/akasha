import { z } from "zod"

export const ECAPA_CENTROID_DIM = 192

const RepoRelativePath = z
  .string()
  .min(1)
  .refine((p) => !p.startsWith("/") && !p.split("/").includes(".."), {
    message: "must be a repo-relative path (no leading '/', no '..' segment)",
  })

export const ReferenceSchema = z
  .object({
    wavPath: RepoRelativePath.refine((p) => p.endsWith(".wav"), {
      message: "reference clip must be a .wav file",
    }),
    sha256: z.string().regex(/^[0-9a-f]{64}$/, "sha256 must be 64 lowercase hex chars"),
  })
  .strict()

export type Reference = z.infer<typeof ReferenceSchema>

export const CentroidSchema = z.discriminatedUnion("kind", [
  z
    .object({
      kind: z.literal("inline"),
      values: z.array(z.number()).length(ECAPA_CENTROID_DIM).readonly(),
    })
    .strict(),
  z
    .object({
      kind: z.literal("path"),
      path: RepoRelativePath.refine((p) => p.endsWith(".json"), {
        message: "centroid sidecar must be a .json file",
      }),
    })
    .strict(),
])

export type Centroid = z.infer<typeof CentroidSchema>

export const PostProductionSchema = z
  .object({
    filterComplex: z.string().min(1),
    outLabel: z
      .string()
      .regex(/^\[[A-Za-z0-9_]+\]$/, "outLabel must be an ffmpeg pad label like [out]"),
  })
  .strict()

export type PostProduction = z.infer<typeof PostProductionSchema>

const SHARED_SHAPE = {
  slug: z.string().min(1),
  value: z.string().min(1),
  archetype: z.enum(["warm", "young"]),
  lane: z.enum(["V", "Q", "R"]),
  clonerModel: z.string().min(1),
  refText: z.string().min(1),
  reference: ReferenceSchema,
  centroid: CentroidSchema,
  postProduction: PostProductionSchema.optional(),
} as const

export const RealVoiceSpecSchema = z
  .object({ sourceKind: z.literal("real"), ...SHARED_SHAPE })
  .strict()

export const DesignedVoiceSpecSchema = z
  .object({ sourceKind: z.literal("designed"), instruct: z.string().min(1), ...SHARED_SHAPE })
  .strict()

export const VoiceSpecSchema = z
  .discriminatedUnion("sourceKind", [RealVoiceSpecSchema, DesignedVoiceSpecSchema])
  .refine((v) => (v.lane === "R") === (v.sourceKind === "real"), {
    message: "lane R must pair with sourceKind 'real'; lanes V/Q with 'designed'",
  })

export type VoiceSpec = z.infer<typeof VoiceSpecSchema>
