import type { Domain } from "akasha/domains/domain.page-type.types.ts"

export const codeBodies = {
  id: "01a09b2c-cc50-7f0f-838d-abfa522d31e4",
  type: "domain",
  slug: "code-bodies",
  definition: "a file body as the bytes it is and as the text those bytes spell",
  parts: [
    "module/body-loading",
    "module/body-text",
    "module/carried-file",
    "module/file-kind",
    "module/file-kind-bytes",
    "module/utf8-body",
  ],
} as const satisfies Domain
