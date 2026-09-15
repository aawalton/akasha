import { join } from "node:path"
import { whyOf } from "akasha/command/modules/fault-saying/fault-saying.module.code.ts"
import {
  type Linking,
  NOTHING_LINKED,
} from "akasha/command/modules/folder-linking/folder-linking.module.code.ts"
import { fileOf } from "akasha/pages/index/modules/property-file/property-file.module.code.ts"
import {
  indexThere,
  listedAt,
  readingIn,
  valuedAt,
} from "akasha/pages/index/modules/reading/index-reading.module.code.ts"

const MODULE = "module"

const WRITING = "state-writing"

const CODE = "code"

const ANSWERS = "statesLanded"

const NOT_WRITTEN = "the editor's pictures of the pages were not written —"

function loadFrom(at: string): Promise<Record<string, unknown>> {
  return import(at) as Promise<Record<string, unknown>>
}

type Writing = (root: string) => undefined

export type Drawing = { readonly writing: Writing | null; readonly broken: string | null }

export const NOTHING_DRAWN: Drawing = { writing: null, broken: null }

function writingAt(root: string): string | null {
  const reading = readingIn(root)
  if (!indexThere(reading)) return null
  if (listedAt(reading, MODULE, WRITING).length === 0) return null
  return fileOf(reading, valuedAt(reading, MODULE, WRITING), MODULE, CODE)
}

async function writingLoaded(root: string, at: string): Promise<Writing> {
  const held = await loadFrom(join(root, at))
  const named = held[ANSWERS]
  if (typeof named !== "function") {
    throw new Error(`${at} answers to no \`${ANSWERS}\` the editor's pictures are written by`)
  }
  return named as Writing
}

export async function editorStateLoading(root: string): Promise<Drawing> {
  try {
    const at = writingAt(root)
    if (at === null) return NOTHING_DRAWN
    return { writing: await writingLoaded(root, at), broken: null }
  } catch (thrown) {
    return { writing: null, broken: whyOf(thrown) }
  }
}

export function editorStateLanded(root: string, drawing: Drawing): Linking {
  if (drawing.broken !== null) return { said: [], wrong: [`${NOT_WRITTEN} ${drawing.broken}`] }
  if (drawing.writing === null) return NOTHING_LINKED
  try {
    drawing.writing(root)
    return NOTHING_LINKED
  } catch (thrown) {
    return { said: [], wrong: [`${NOT_WRITTEN} ${whyOf(thrown)}`] }
  }
}
