import type { ActiveSessionInit } from "@akasha/pages-ui/media/playing-session"
import { z } from "zod"

const CHAIN_LOADER_SCHEMA = z
  .object({
    kind: z.literal("detail"),
    id: z.string(),
    pageTypeSlug: z.string().optional(),
    title: z.string().nullable(),
    audioVariants: z.array(z.object({ id: z.string(), label: z.string() })).nullable(),
    audioNextHref: z.string().nullable(),
    audioDefaultVariant: z.string().nullable(),
  })
  .passthrough()

type ChainContext = {
  readonly loadedHref: string
  readonly currentVariant: string
  readonly currentSpeed: number
}

export function parseNextSessionFromLoaderData(
  raw: unknown,
  ctx: ChainContext
): ActiveSessionInit | null {
  const parsed = CHAIN_LOADER_SCHEMA.safeParse(raw)
  if (!parsed.success) return null
  const data = parsed.data
  if (data.audioVariants == null || data.audioVariants.length === 0) return null
  if (!data.audioVariants.some((v) => v.id === ctx.currentVariant)) return null
  return {
    pageId: data.id,
    pageTypeSlug: data.pageTypeSlug ?? "",
    pageHref: ctx.loadedHref,
    title: data.title ?? "",
    medium: "audio",
    variant: ctx.currentVariant,
    speed: ctx.currentSpeed,
    nextHref: data.audioNextHref,
  }
}
