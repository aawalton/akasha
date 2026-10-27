import { existsSync, readFileSync } from "node:fs"
import { join } from "node:path"
import { told } from "akasha/git/modules/running/git-running.module.code.ts"
import {
  textAt,
  type Value,
} from "akasha/page/modules/value-reading/page-value-reading.module.code.ts"
import { inLowerCamelCase } from "akasha/page/name-format/pages/lower-camel-case/lower-camel-case.name-format.code.ts"

export const TEST_WORLD = "story/world/pages/test-world/"

const PLAYED = "stories/played/"

const LEFT_DIRS: readonly string[] = ["turns/", "chapters/"]

const LEFT_ENDINGS: readonly string[] = [
  ".referenced-by.jsonl",
  ".uncommitted.jsonl",
  ".history.jsonl",
  ".chat.jsonl",
  ".types.ts",
  ".schema.jsonl",
  ".shapes.jsonl",
  ".lock",
]

const CODE_ENDINGS: readonly string[] = [".code.ts", ".test.ts", ".test-fixtures.ts"]

const GENERATED = /^ {2}(id|createdAt|updatedAt): .*,\n/gm

const HISTORY = /^ {2}history: "jsonl",\n/gm

const CHAT = /^ {2}chat: "jsonl",\n/gm

const MASTER = /^ {2}coordinatorAgent: .*,\n/m

const OPENS = /^ {2}opensAt: .*,\n/m

const SLUG_LINE = /^ {2}slug: .*,\n/m

const SPECIAL = /[.*+?^${}()|[\]\\]/g

const GAME_MASTER = "game-master"

const TYPE = "type"

const SLUG = "slug"

const BREAK = "\n"

const PAGE_FILE = ".ts"

const REFERENCED = ".referenced-by.jsonl"

const UTF8 = "utf8"

function escaped(said: string): string {
  return said.replace(SPECIAL, "\\$&")
}

function pascal(slug: string): string {
  const said = inLowerCamelCase(slug)
  return `${said.slice(0, 1).toUpperCase()}${said.slice(1)}`
}

export function inTestWorld(path: string): boolean {
  return path.startsWith(TEST_WORLD) && path.includes(`/${PLAYED}`)
}

export function folderOf(storyPath: string): string {
  const at = storyPath.lastIndexOf("/")
  return at < 0 ? "" : storyPath.slice(0, at + 1)
}

export function cloneFolderOf(folder: string, from: string, to: string): string {
  const tail = `${PLAYED}${from}/`
  if (!folder.endsWith(tail)) return folder
  return `${folder.slice(0, -tail.length)}${PLAYED}${to}/`
}

export function copied(folder: string, path: string): boolean {
  if (!path.startsWith(folder)) return false
  const within = path.slice(folder.length)
  if (LEFT_DIRS.some((one) => within.startsWith(one))) return false
  return !LEFT_ENDINGS.some((one) => within.endsWith(one))
}

export function isCode(path: string): boolean {
  return CODE_ENDINGS.some((one) => path.endsWith(one))
}

export function slugsRenamed(text: string, from: string, to: string): string {
  const slug = new RegExp(`(?<![A-Za-z0-9-])${escaped(from)}(?![A-Za-z0-9])`, "g")
  const camel = new RegExp(`(?<![A-Za-z0-9_$])${inLowerCamelCase(from)}(?![a-z0-9])`, "g")
  const typed = new RegExp(`(?<![A-Za-z0-9_$])${pascal(from)}(?![a-z0-9])`, "g")
  return text.replace(slug, to).replace(camel, inLowerCamelCase(to)).replace(typed, pascal(to))
}

export function clonedPath(path: string, folder: string, from: string, to: string): string {
  const within = path.slice(folder.length)
  return `${cloneFolderOf(folder, from, to)}${slugsRenamed(within, from, to)}`
}

export function masterOf(master: string, from: string, to: string): string | null {
  const tail = `-${GAME_MASTER}-${from}`
  if (!master.endsWith(tail) || master.length === tail.length) return null
  return `${master.slice(0, -tail.length)}-${GAME_MASTER}-${to}`
}

export type Story = {
  readonly from: string
  readonly to: string
  readonly master: string
  readonly opensAt: string | null
}

export function storyBody(text: string, story: Story): string {
  const lines = [
    `  coordinatorAgent: ${JSON.stringify(story.master)},\n`,
    `  clonedFrom: ${JSON.stringify(`story-played/${story.from}`)},\n`,
    ...(story.opensAt === null ? [] : [`  opensAt: ${JSON.stringify(story.opensAt)},\n`]),
  ]
  const left = text.replace(CHAT, "").replace(MASTER, "")
  const opened = story.opensAt === null ? left : left.replace(OPENS, "")
  return opened.replace(SLUG_LINE, (held) => `${held}${lines.join("")}`)
}

export function pageBody(text: string): string {
  return text.replace(GENERATED, "").replace(HISTORY, "")
}

export type Source = { readonly path: string; readonly text: string }

export type Copy = { readonly at: string; readonly body: string }

export type Cloning = {
  readonly folder: string
  readonly storyPath: string
  readonly story: Story
}

export function copiesOf(sources: readonly Source[], cloning: Cloning): readonly Copy[] {
  const { folder, storyPath, story } = cloning
  const made: Copy[] = []
  for (const one of sources) {
    if (!copied(folder, one.path)) continue
    const at = clonedPath(one.path, folder, story.from, story.to)
    const renamed = slugsRenamed(one.text, story.from, story.to)
    if (isCode(one.path)) {
      made.push({ at, body: renamed })
      continue
    }
    const body = pageBody(renamed)
    made.push({ at, body: one.path === storyPath ? storyBody(body, story) : body })
  }
  return made.toSorted((one, two) => (one.at < two.at ? -1 : one.at > two.at ? 1 : 0))
}

export function committedUnder(root: string, folder: string): readonly string[] {
  const said = told(root, ["ls-files", "--", folder])
  if (said === null) return []
  return said.split(BREAK).filter((one) => one.trim() !== "")
}

export type Referrer = { readonly propertySlug: string; readonly path: string }

export function referrersOf(root: string, path: string): readonly Referrer[] {
  const at = join(root, `${path.slice(0, -PAGE_FILE.length)}${REFERENCED}`)
  if (!existsSync(at)) return []
  const found: Referrer[] = []
  for (const line of readFileSync(at, UTF8).split(BREAK)) {
    if (line.trim() === "") continue
    const one = JSON.parse(line) as Record<string, unknown>
    const propertySlug = one["propertySlug"]
    const from = one["path"]
    if (typeof propertySlug === "string" && typeof from === "string") {
      found.push({ propertySlug, path: from })
    }
  }
  return found
}

export function addressOf(value: Value): string | null {
  const type = textAt(value, TYPE)
  const slug = textAt(value, SLUG)
  if (type === null || slug === null) return null
  return `${type.slice(type.indexOf("/") + 1)}/${slug}`
}

export function latestOf(instants: readonly (string | null)[]): string | null {
  const held = instants.filter((one): one is string => one !== null).toSorted()
  return held.at(-1) ?? null
}
