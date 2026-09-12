"use client"

import { type ReactNode, useEffect, useState } from "react"

interface DegradingImageProps {
  src: string
  alt: string
  className?: string
  fallback: ReactNode
}

export function DegradingImage({ src, alt, className, fallback }: DegradingImageProps) {
  const [errored, setErrored] = useState(false)

  useEffect(() => {
    setErrored(false)
  }, [src])

  if (errored) return <>{fallback}</>
  return <img src={src} alt={alt} className={className} onError={() => setErrored(true)} />
}
