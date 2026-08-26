import type { Check, CheckFailure } from "../check-shape.ts"

export const CEILING_BYTES = 15000

const CEILING_SAID = CEILING_BYTES.toLocaleString("en-US")

export const fileLength: Check = {
  slug: "file-length",
  run: (paths, tree) => {
    const failures: CheckFailure[] = []
    for (const path of paths) {
      const body = tree.at(path)
      if (body === null) continue
      const bytes = body.byteLength
      if (bytes <= CEILING_BYTES) continue
      failures.push({
        path,
        reason: `${bytes.toLocaleString("en-US")} bytes, over the ${CEILING_SAID} ceiling`,
      })
    }
    return failures
  },
}

export default fileLength
