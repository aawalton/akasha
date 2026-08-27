import type { QuestionLink } from "@shared/open-questions"
import { safeInternalPath } from "@shared/pages-url"

const APP_URL_SCHEME = "alanwalton"

const APP_URL_AUTHORITY = "localhost"

export type LinkTarget =
  | { readonly kind: "browser-tab"; readonly href: string }
  | { readonly kind: "system-browser"; readonly href: string }
  | { readonly kind: "in-app-nav"; readonly path: string }
  | { readonly kind: "app-scheme"; readonly url: string }
  | { readonly kind: "unresolvable" }

export type LinkContext = {
  readonly inNativeShell: boolean
}

export function decideLinkTarget(link: QuestionLink, context: LinkContext): LinkTarget {
  if (link.platform === "web") {
    return context.inNativeShell
      ? { kind: "system-browser", href: link.url }
      : { kind: "browser-tab", href: link.url }
  }
  const path = safeInternalPath(link.url)
  if (path === null) return { kind: "unresolvable" }
  return context.inNativeShell
    ? { kind: "in-app-nav", path }
    : { kind: "app-scheme", url: `${APP_URL_SCHEME}://${APP_URL_AUTHORITY}${path}` }
}
