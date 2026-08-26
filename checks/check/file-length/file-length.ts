import type { Check } from "../../check-shape.ts"

export const CEILING_BYTES = 15000

const CEILING_SAID = CEILING_BYTES.toLocaleString("en-US")

export const fileLength: Check = {
  slug: "file-length",
  needs: "file",
  cached: false,
  run: ({ body }) => {
    const bytes = body.byteLength
    if (bytes <= CEILING_BYTES) return []
    return [`${bytes.toLocaleString("en-US")} bytes, over the ${CEILING_SAID} ceiling`]
  },
}

export default fileLength
