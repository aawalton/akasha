import { readFileSync } from "node:fs"
import { join } from "node:path"
import type { StarPoints } from "akasha/command/pages/temper/build-show/modules/build-show-fields/build-show-fields.module.code.ts"
import {
  type ReadingLine,
  readingLinesIn,
  shortIdOf,
} from "akasha/command/pages/temper/modules/stat-reading-lines/stat-reading-lines.module.code.ts"
import {
  everyOfType,
  listedAt,
  listedById,
  valueByPath,
} from "akasha/page/index/modules/reading/index-reading.module.code.ts"
import { besideAt } from "akasha/page/modules/file-name/page-file-name.module.code.ts"
import { characterBuild } from "akasha/temper/player/character/character-build/character-build.page-type.ts"
import { companionBuild } from "akasha/temper/player/character/companion-build/companion-build.page-type.ts"
import { readings } from "akasha/temper/player/character/temper-account-character/properties/readings.file-property.ts"
import { temperAccountCharacter } from "akasha/temper/player/character/temper-account-character/temper-account-character.page-type.ts"

export type Named = {
  readonly said: string
  readonly source: string
  readonly hash: string
  readonly stars: readonly StarPoints[] | null
}

type Naming = { readonly named: Named } | { readonly refused: string }

export const AS_HASH = "build hash"

const READING_ID = /^[0-9a-f]{8}(-[0-9a-f-]*)?$/

function hashAt(root: string, path: string): string | null {
  const hash = valueByPath(root, path)?.buildHash
  return typeof hash === "string" ? hash : null
}

function buildPageNamed(root: string, said: string): Naming | null {
  for (const type of [characterBuild.slug, companionBuild.slug]) {
    const found = listedAt(root, type, said)[0]
    if (found === undefined) continue
    const hash = hashAt(root, found.path)
    if (hash === null) return { refused: `the ${type} \`${said}\` holds no build hash` }
    return { named: { said, source: `${type} ${said}`, hash, stars: null } }
  }
  return null
}

function bodyOf(root: string, path: string): string | null {
  const at = besideAt(path, readings.propertySlug, "jsonl")
  if (at === null) return null
  try {
    return readFileSync(join(root, at), "utf8")
  } catch {
    return null
  }
}

function linesOf(root: string, path: string): readonly ReadingLine[] {
  const body = bodyOf(root, path)
  return body === null ? [] : readingLinesIn(body).lines
}

function startingIn(root: string, path: string, said: string): readonly ReadingLine[] {
  const body = bodyOf(root, path)
  if (body === null) return []
  const key = `"id":"${said}`
  const kept = body.split("\n").filter((one) => one.includes(key))
  return readingLinesIn(kept.join("\n")).lines.filter((line) => line.id.startsWith(said))
}

function fromReading(said: string, line: ReadingLine, how: string): Named {
  const when = new Date(line.reading.capturedAt * 1000).toISOString().replace(".000Z", "Z")
  return {
    said,
    source: `${how} ${shortIdOf(line.id)} of ${line.character}, captured ${when}`,
    hash: line.buildHash,
    stars: line.reading.championPoints ?? [],
  }
}

function characterNamed(root: string, said: string): Naming | null {
  const found = listedAt(root, temperAccountCharacter.slug, said)[0]
  if (found === undefined) return null
  const live = valueByPath(root, found.path)?.liveBuildId
  if (typeof live === "string") {
    const build = listedById(root, live)
    const hash = build === null ? null : hashAt(root, build.path)
    if (build !== null && hash !== null) {
      return { named: { said, source: `live build of ${said}, ${build.path}`, hash, stars: null } }
    }
  }
  const newest = linesOf(root, found.path).at(-1)
  if (newest === undefined) {
    return { refused: `the character \`${said}\` states no live build and holds no reading` }
  }
  return { named: fromReading(said, newest, "newest reading") }
}

function readingNamed(root: string, said: string): Naming | null {
  if (!READING_ID.test(said)) return null
  const found = everyOfType(root, temperAccountCharacter.slug).flatMap((one) =>
    startingIn(root, one.path, said)
  )
  const only = found[0]
  if (only === undefined) return null
  if (found.length > 1) {
    const named = found.map((line) => shortIdOf(line.id)).join(", ")
    return { refused: `\`${said}\` starts ${String(found.length)} readings' ids: ${named}` }
  }
  return { named: fromReading(said, only, "reading") }
}

export function namedIn(root: string, said: string): Naming {
  return (
    buildPageNamed(root, said) ??
    characterNamed(root, said) ??
    readingNamed(root, said) ?? { named: { said, source: AS_HASH, hash: said, stars: null } }
  )
}
