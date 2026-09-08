import { z } from "zod"

export interface ImageName {
  readonly slug: string
  readonly level: number
  readonly timestamp: string
  readonly ext: string
}

export function toPersonaSlug(title: string): string {
  return title.trim().toLowerCase().replace(/\s+/g, "-")
}

export function pad2(n: number): string {
  return n < 10 ? `0${n}` : `${n}`
}

function formatTimestamp(date: Date): string {
  return date
    .toISOString()
    .replace(/[-:]/g, "")
    .replace(/\.\d{3}Z$/, "Z")
}

export interface BuildImageNameInput {
  readonly slug: string
  readonly level: number
  readonly date: Date
  readonly ext?: string
}

export function buildImageName(input: BuildImageNameInput): string {
  const ext = input.ext ?? "png"
  return `${input.slug}-L${pad2(input.level)}-${formatTimestamp(input.date)}.${ext}`
}

const IMAGE_NAME_RE =
  /^(?<slug>.+)-L(?<level>\d{2,})-(?<timestamp>\d{8}T\d{6}Z)\.(?<ext>[A-Za-z0-9]+)$/

const ImageExecSchema = z
  .unknown()
  .refine((v): v is RegExpExecArray => Array.isArray(v) && v.length > 0)
  .transform((v) => v.groups ?? {})
  .pipe(
    z
      .object({
        slug: z.string(),
        level: z.string().regex(/^\d+$/),
        timestamp: z.string(),
        ext: z.string(),
      })
      .strict()
  )

export function parseImageName(filename: string): ImageName | null {
  const parsed = ImageExecSchema.safeParse(IMAGE_NAME_RE.exec(filename))
  if (!parsed.success) return null
  return {
    slug: parsed.data.slug,
    level: Number.parseInt(parsed.data.level, 10),
    timestamp: parsed.data.timestamp,
    ext: parsed.data.ext,
  }
}

const TIMESTAMP_RE = /^(?<y>\d{4})(?<mo>\d{2})(?<d>\d{2})T(?<h>\d{2})(?<mi>\d{2})(?<s>\d{2})Z$/

const TimestampExecSchema = z
  .unknown()
  .refine((v): v is RegExpExecArray => Array.isArray(v) && v.length > 0)
  .transform((v) => v.groups ?? {})
  .pipe(
    z
      .object({
        y: z.string().regex(/^\d{4}$/),
        mo: z.string().regex(/^\d{2}$/),
        d: z.string().regex(/^\d{2}$/),
        h: z.string().regex(/^\d{2}$/),
        mi: z.string().regex(/^\d{2}$/),
        s: z.string().regex(/^\d{2}$/),
      })
      .strict()
  )

export function parseImageTimestamp(timestamp: string): Date | null {
  const parsed = TimestampExecSchema.safeParse(TIMESTAMP_RE.exec(timestamp))
  if (!parsed.success) return null
  const { y, mo, d, h, mi, s } = parsed.data
  return new Date(
    Date.UTC(
      Number.parseInt(y, 10),
      Number.parseInt(mo, 10) - 1,
      Number.parseInt(d, 10),
      Number.parseInt(h, 10),
      Number.parseInt(mi, 10),
      Number.parseInt(s, 10)
    )
  )
}
