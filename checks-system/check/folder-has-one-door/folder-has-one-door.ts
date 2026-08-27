import { resolve } from "node:path"
import { type Held, foldersHere, named } from "../../../file-structure/folder/folder.ts"
import type { Check, CheckFailure } from "../check-shape.ts"

export const folderHasOneDoor = {
  slug: "folder-has-one-door",
  needs: "tree",
  cached: false,
  run: ({ root }) => {
    const { held, enters } = foldersHere()
    const failures: CheckFailure[] = []
    for (const folder of [...held.keys()].sort()) {
      const one = held.get(folder) as Held
      const doors = one.code.filter((key) => enters(folder, key))
      if (doors.length > 1) {
        failures.push({
          path: resolve(root, folder),
          reason: `is entered at ${doors.length} files: ${named(folder, doors)}`,
        })
      }
    }
    return failures
  },
} satisfies Check

export default folderHasOneDoor
