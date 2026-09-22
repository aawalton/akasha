import type { Domain } from "akasha/domain/domain.page-type.types.ts"

export const codeBody = {
  id: "01a09b2c-cc50-7f0f-838d-abfa522d31e4",
  type: "page-type/domain",
  slug: "code-body",
  definition: "a file body as the bytes it is and as the text those bytes spell",
  parts: [
    "module/body-loading",
    "module/body-text",
    "module/bytes-slug",
    "module/carried-file",
    "module/file-kind",
    "module/sha256-hex",
    "module/utf8-body",
    "module/commit-loading",
  ],
} as const satisfies Domain
