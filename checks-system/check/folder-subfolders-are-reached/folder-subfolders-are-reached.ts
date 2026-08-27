import { resolve } from "node:path"
import { type Held, foldersHere, named } from "../../../file-structure/folder/folder.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

export const folderSubfoldersAreReached = {
  slug: "folder-subfolders-are-reached",
  needs: "tree",
  cached: false,
  run: ({ root }) => {
    const { held, enters } = foldersHere()
    const failures: CheckFailure[] = []
    for (const folder of [...held.keys()].sort()) {
      const one = held.get(folder) as Held
      if (one.deep.length > 0 && !one.deep.some((key) => enters(folder, key))) {
        failures.push({
          path: resolve(root, folder),
          reason: `nothing outside enters any of the ${one.deep.length} code files under its ${one.subs.size} subfolders: ${named(folder, one.subs)}`,
        })
      }
    }
    return failures
  },
} satisfies Check

export default folderSubfoldersAreReached
