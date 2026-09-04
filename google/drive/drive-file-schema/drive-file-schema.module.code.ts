import * as z from "zod"

export const driveFileMetadataSchema = z
  .object({
    id: z.string(),
    name: z.string(),
    mimeType: z.string().optional(),
    size: z.string().optional(),
  })
  .passthrough()

export type DriveFileMetadata = z.infer<typeof driveFileMetadataSchema>
