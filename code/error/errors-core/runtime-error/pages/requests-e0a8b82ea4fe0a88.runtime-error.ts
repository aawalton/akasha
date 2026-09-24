import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const requestsE0a8b82ea4fe0a88 = {
  id: "01a0c622-0d11-74af-8548-cb9a8209e49d",
  type: "page-type/runtime-error",
  slug: "requests-e0a8b82ea4fe0a88",
  fingerprint: "e0a8b82ea4fe0a88",
  app: "requests",
  kind: "unhandledrejection",
  message:
    "patchPage(view): this page type's pages are files, and a JSON patch addresses a path inside a row's attributes, which a file has no equivalent of. Set the whole property instead.",
  url: "https://requests.alanwalton.com/?__v=3b78f603c656a6e330a3ca060d178915da16ab6c&tab=01a0c4ba-04f2-7301-ac55-8df02a4864bf",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-21T22:41:55.377Z",
} as const satisfies RuntimeError
