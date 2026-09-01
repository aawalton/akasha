import { useEffect, useState } from "react"

export type MediaSrcResolver = (track: {
  pageId: string
  medium: string
  variant: string
  fromSentence?: number | null
}) => Promise<string>

export function useShellMediaSrc({
  mediaSrcResolver,
  pageId,
  medium,
  variant,
  fromSentence,
  suppressed,
}: {
  mediaSrcResolver: MediaSrcResolver | undefined
  pageId: string | null
  medium: string | null
  variant: string | null
  fromSentence: number | null
  suppressed: boolean
}): string | null {
  const [resolvedSrc, setResolvedSrc] = useState<string | null>(null)
  useEffect(() => {
    if (mediaSrcResolver == null) return
    if (pageId == null || medium == null || variant == null || suppressed) {
      setResolvedSrc(null)
      return
    }
    let cancelled = false
    setResolvedSrc(null)
    void mediaSrcResolver({ pageId, medium, variant, fromSentence })
      .then((url) => {
        if (!cancelled) setResolvedSrc(url)
      })
      .catch(() => {
        if (!cancelled) setResolvedSrc(null)
      })
    return () => {
      cancelled = true
    }
  }, [mediaSrcResolver, pageId, medium, variant, fromSentence, suppressed])
  return resolvedSrc
}
