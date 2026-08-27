import { resolve } from "node:path"
import { type Held, foldersHere, named } from "../../../file-structure/folder/folder.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

export const folderHasOneCodeFileBesideSubfolders = {
  slug: "folder-has-one-code-file-beside-subfolders",
  needs: "tree",
  cached: false,
  run: ({ root }) => {
    const { held } = foldersHere()
    const failures: CheckFailure[] = []
    for (const folder of [...held.keys()].sort()) {
      const one = held.get(folder) as Held
      if (one.subs.size > 0 && one.code.length > 1) {
        failures.push({
          path: resolve(root, folder),
          reason: `holds ${one.code.length} code files beside its ${one.subs.size} subfolders: ${named(folder, one.code)}`,
        })
      }
    }
    return failures
  },
} satisfies Check

export default folderHasOneCodeFileBesideSubfolders
