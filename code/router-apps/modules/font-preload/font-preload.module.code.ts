import type { LinkDescriptor } from "react-router"

export function fontPreloading(href: string): LinkDescriptor[] {
  return [{ rel: "preload", href, as: "font", type: "font/woff2", crossOrigin: "anonymous" }]
}
