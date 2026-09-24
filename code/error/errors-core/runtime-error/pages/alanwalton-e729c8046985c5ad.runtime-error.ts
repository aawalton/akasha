import type { RuntimeError } from "akasha/code/error/errors-core/runtime-error/runtime-error.page-type.types.ts"

export const alanwaltonE729c8046985c5ad = {
  id: "01a0c51c-9164-7e00-9801-1f6da6dd5de5",
  type: "page-type/runtime-error",
  slug: "alanwalton-e729c8046985c5ad",
  fingerprint: "e729c8046985c5ad",
  app: "alanwalton",
  kind: "unhandledrejection",
  message:
    "createPage: the write was refused — createPage(temper-task): a page is written by its slug, and this write states none. `@akasha/page-service` writes a page by its page type, its slug and its values, and places the page from the index or from the path the write names. State a `slug` among the values, or hand the write a `name`.",
  url: "https://alanwalton.com/nav/temper-tasks-3786d7a2?__v=836cc3d7f233c4dee98d054711e5012886b862a2",
  userAgent:
    "Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/153.0.0.0 Safari/537.36",
  firstSeenAt: "2026-09-21T17:56:18.787Z",
} as const satisfies RuntimeError
