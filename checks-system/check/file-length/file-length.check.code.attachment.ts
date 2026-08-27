import { relative } from "node:path"
import { isGeneratedFile } from "../../../generated-file/generated-file.ts"
import { carriesBytes } from "../../../page/file-kind/carries-bytes.ts"
import { heldToNoCeiling } from "../../../page/page-type/unsplittable.ts"
import { decodeUtf8 } from "../../../utf8-body/utf8-body.ts"
import type { Check } from "../check-shape.ts"

export const CEILING_BYTES = 15000

const CEILING_SAID = CEILING_BYTES.toLocaleString("en-US")

const DIRTY_DIR = /(^|\/)dirty\//

export const fileLength = {
  slug: "file-length",
  needs: "file",
  cached: false,
  run: ({ root, path, body }) => {
    const bytes = body.byteLength
    if (bytes <= CEILING_BYTES) return []
    if (carriesBytes(path)) return []
    if (heldToNoCeiling(path)) return []
    const relPath = relative(root, path)
    if (DIRTY_DIR.test(relPath)) return []
    if (isGeneratedFile(relPath, decodeUtf8(body) ?? body)) return []
    return [`${bytes.toLocaleString("en-US")} bytes, over the ${CEILING_SAID} ceiling`]
  },
} satisfies Check

export default fileLength
