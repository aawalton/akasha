import { writeSync } from "node:fs"

const NOT_YET = "EAGAIN"

export function writtenWhole(fd: number, bytes: Uint8Array): undefined {
  let gone = 0
  while (gone < bytes.length) {
    try {
      gone += writeSync(fd, bytes, gone)
    } catch (thrown) {
      if ((thrown as { code?: string }).code !== NOT_YET) throw thrown
    }
  }
}
