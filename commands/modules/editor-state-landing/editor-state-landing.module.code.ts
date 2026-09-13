import { createRequire } from "node:module"
import { join } from "node:path"
import { whyOf } from "akasha/commands/modules/fault-saying/fault-saying.module.code.ts"
import {
  type Linking,
  NOTHING_LINKED,
} from "akasha/commands/modules/folder-linking/folder-linking.module.code.ts"
import { fileOf } from "akasha/pages/indexes/modules/property-file/property-file.module.code.ts"
import {
  indexThere,
  listedAt,
  readingIn,
  valuedAt,
} from "akasha/pages/indexes/modules/reading/index-reading.module.code.ts"

const MODULE = "module"

const WRITING = "state-writing"

const CODE = "code"

const ANSWERS = "statesLanded"

const loadFrom = createRequire(import.meta.url)

type Writing = (root: string) => undefined

function writingAt(root: string): string | null {
  const reading = readingIn(root)
  if (!indexThere(reading)) return null
  if (listedAt(reading, MODULE, WRITING).length === 0) return null
  return fileOf(reading, valuedAt(reading, MODULE, WRITING), MODULE, CODE)
}

function writingLoaded(root: string, at: string): Writing {
  const held = loadFrom(join(root, at)) as Record<string, unknown>
  const named = held[ANSWERS]
  if (typeof named !== "function") {
    throw new Error(`${at} answers to no \`${ANSWERS}\` the editor's pictures are written by`)
  }
  return named as Writing
}

export function editorStateLanded(root: string): Linking {
  try {
    const at = writingAt(root)
    if (at === null) return NOTHING_LINKED
    writingLoaded(root, at)(root)
    return NOTHING_LINKED
  } catch (thrown) {
    return {
      said: [],
      wrong: [`the editor's pictures of the pages were not written — ${whyOf(thrown)}`],
    }
  }
}
