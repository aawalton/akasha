import { KOKORO_STREAM_VARIANT } from "@akasha/pages-ui/media/media-src"

export type Transport = "hls-src" | "native-plugin" | "shell-src" | "web-src"

export function selectTransport(input: {
  hasResolver: boolean
  hasNativeTts: boolean
  isWebKit: boolean
  variant: string
}): Transport {
  const isKokoro = input.variant === KOKORO_STREAM_VARIANT
  if (!input.hasResolver) {
    if (isKokoro && input.isWebKit) return "hls-src"
    return "web-src"
  }
  if (isKokoro && input.hasNativeTts) {
    return "native-plugin"
  }
  if (isKokoro && input.isWebKit) {
    return "hls-src"
  }
  return "shell-src"
}
