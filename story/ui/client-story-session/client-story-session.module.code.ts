import { SystemWindowSchema } from "@akasha/story-engine-core/system-window-schema"
import { z } from "zod"

export const ClientStoryChapterSchema = z.object({
  id: z.string(),
  title: z.string(),
  href: z.string(),
  chapterNumber: z.number().optional(),
})
export type ClientStoryChapter = z.infer<typeof ClientStoryChapterSchema>

export const ClientProseSegmentSchema = z.discriminatedUnion("kind", [
  z.object({ kind: z.literal("prose"), text: z.string() }).strict(),
  z
    .object({
      kind: z.literal("system"),
      title: z.string().optional(),
      lines: z.array(z.string()).optional(),
      window: SystemWindowSchema.optional(),
      windowId: z.string().optional(),
    })
    .strict(),
  z.object({ kind: z.literal("unavailable") }).strict(),
])
export type ClientProseSegment = z.infer<typeof ClientProseSegmentSchema>

export const ClientStoryTurnSchema = z.object({
  id: z.string(),
  title: z.string(),
  text: z.string(),
  turnNumber: z.number().optional(),
  sessionNumber: z.number().optional(),
  segments: z.array(ClientProseSegmentSchema).optional(),
  fullyRead: z.boolean().optional(),
})
export type ClientStoryTurn = z.infer<typeof ClientStoryTurnSchema>
