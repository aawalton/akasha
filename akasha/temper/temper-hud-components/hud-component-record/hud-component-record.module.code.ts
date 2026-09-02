import { z } from "zod"

export const HUD_SCENES = ["hud", "hudui", "loot"] as const
export type HudScene = (typeof HUD_SCENES)[number]

export const HIDE_MECHANISMS = [
  "fragment-group",
  "scene-fragment",
  "SetHiddenForReason",
  "RequestHidden",
  "SetCompassHidden",
  "SetTopLevelHidden",
  "SetSupressed",
  "SuppressTutorialType",
  "RefreshVisibility",
  "SetFloatingMarkerGlobalAlpha",
] as const
export type HideMechanism = (typeof HIDE_MECHANISMS)[number]

export const COMPONENT_KINDS = ["fragment", "non-fragment-control"] as const
export type ComponentKind = (typeof COMPONENT_KINDS)[number]

export const SOURCE_REF_SCHEMA = z
  .object({
    file: z.string().min(1),
    line: z.number().int().positive(),
  })
  .strict()
export type SourceRef = z.infer<typeof SOURCE_REF_SCHEMA>

export const HUD_COMPONENT_RECORD_SCHEMA = z
  .object({
    id: z.string().min(1),
    name: z.string().min(1),
    esoGlobal: z.string().min(1),
    kind: z.enum(COMPONENT_KINDS),
    hideMechanism: z.enum(HIDE_MECHANISMS),
    scenes: z.array(z.enum(HUD_SCENES)).readonly(),
    category: z.string().min(1),
    source: SOURCE_REF_SCHEMA,
    conditional: z.boolean(),
    wrapsMultiple: z.boolean(),
    grainNotes: z.string().optional(),
  })
  .strict()
export type HudComponentRecord = z.infer<typeof HUD_COMPONENT_RECORD_SCHEMA>

export const HUD_SCENE_CATALOG_SCHEMA = z.array(HUD_COMPONENT_RECORD_SCHEMA).readonly()
export type HudSceneCatalog = readonly HudComponentRecord[]
