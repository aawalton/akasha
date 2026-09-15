export const MEDIA_FORMATS = {
  audio: { ext: "mp3", contentType: "audio/mpeg" },
  image: { ext: "png", contentType: "image/png" },
} as const satisfies Record<string, { ext: string; contentType: string }>

export type Medium = keyof typeof MEDIA_FORMATS

export function isMedium(value: string): value is Medium {
  return Object.hasOwn(MEDIA_FORMATS, value)
}
